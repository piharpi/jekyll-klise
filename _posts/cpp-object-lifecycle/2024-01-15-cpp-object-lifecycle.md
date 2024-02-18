---
title: The C++ Object Lifecycle
date: 2023-01-15 12:00:00 +00:00
modified: 2023-01-15 12:00:00 +00:00
tags: [c++]
description: An analysis of the C++ Object Lifecycle 
image: "/cpp-object-lifecycle/omen.jpg"
image_caption: Omen
---

Most Discussions around RAII don't discuss the implicit contracts and relationships with. These contracts help enable RAII.

This is typically required when implementing your container types, working with custom memory allocators, deferred object construction (when implementing types for structured error-handling like `Result<T, E>` and `Option<T>`). These are typically termed as 'unsafe' operations.


**NOTE**: Most projects don't use exceptions, so we will not be discussing about them or the corner cases, unnecessary complexities, code path explosions, and limitations they introduce.


The lifecycle of a C++ Object is illustrated as:

```
  allocate placement memory                        
             ||                           
             ||                       ==============
             \/                       ||          || 
====>  construct object  =====> assign object <=====
||           ||                       ||  
||           \/                       ||  
====== destruct object  <===============          
             ||                           
             \/                           
 deallocate placement memory                        
```

A violation of this lifecycle **WILL** lead to undefined behaviour, typically: memory leak, double-free, uninitialized memory read/write, unaligned read/writes, nullptr dereference, out of bound read/writes, etc.

Object type we will be using for smoke tests is defined as follows:

```cpp
static int g_counter = 0;

struct Obj{ 
  // default-construction
  Obj(){ g_counter++; } 
  // copy-construction             
  Obj(Obj const&) { g_counter++; }
  // move-construction     
  Obj(Obj &&) { g_counter++; } 
  // copy-assignment    
  Obj& operator=(Obj const&) {}     
  // move-assignment    
  Obj& operator=(Obj &&) {}
  // destruction       
  ~Obj(){ g_counter--;  }
  int data = 0; 
};

```


```cpp

struct Animal{
  virtual void react() = 0;
};

struct Cat: public Animal{
  void react() override {
  println("purr");
  }
};

struct Dog: public Animal{
  void react() override {
  println("whimper");
  }
};

```

###### Allocate Memory
Objects' memory **can** be sourced from the stack (i.e. `alloca`, `malloca`) or heap (i.e. `sbrk`, `malloc`, `kalloc`) and have some base requirements for objects to be placed on them:
- On successful allocation, memory returned by allocators **MUST** be valid and not be already in use. *SEE*: GNUC's [`__attribute__((malloc(...)))`](https://gcc.gnu.org/onlinedocs/gcc/Common-Function-Attributes.html) and MSVC's [`__restrict`](https://learn.microsoft.com/en-us/cpp/cpp/restrict?view=msvc-170) return attributes. This enables global aliasing optimizations for the compiler's reachability analysis, and prevents catastrophic failures like double-free (double-object destructor calls).
**NOTE**: `malloc(0)` and `realloc(ptr, 0, 0)` are not required to return `nullptr` and is implementation-defined behavior. An implementation **MIGHT** decide to return the same or different non-null (possibly sentinel) memory address for a 0-sized allocation.
- General-purpose allocators **SHOULD** support at least alignment of `alignof(max_align_t)` where [`max_align_t`](https://en.cppreference.com/w/c/types/max_align_t) is mostly either `double` (4 bytes) or `long double` (8 bytes), as in the case of `malloc`. `max_align_t` is a maximum-aligned integral scalar type. 
**NOTE**: C11 introduced [`aligned_alloc`](https://en.cppreference.com/w/c/memory/aligned_alloc) for over-aligned allocations (beyond `alignof(max_align_t)`) which is typically required for SIMD vector operations (SSE/AVX's 128-bit, 256-bit, and 512-bit extensions) as the SIMD's wide registers operate on over-aligned memory addresses. `MSVC`'s C runtime doesn't support `aligned_alloc` yet but provides [`_aligned_malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-malloc?view=msvc-170) and [`_aligned_free`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-free?view=msvc-170).


##### Construct Object
This is where they lifecycle of an object begins. For trivially constructible objects this implies a placement new of the object on the placement memory and for trivially constructible types, any memory write operation on the object-placement memory.

```cpp
int * x = malloc(4);
(*x)++; // undefined behaviour: uninitialized read
```

```cpp
int * x = malloc(4);
* x = 0;
(*x)++; // ok: initialized
```



```cpp
Obj * obj = (Obj*) malloc(sizeof(Obj));
object->data++; // undefined behaviour: uninitialized
println("{}", g_counter); // 0
```

```cpp
Obj * obj = (Obj*) malloc(sizeof(Obj));
new (obj) Obj{}; // construction of object at the address
object->data++; // ok: object of type Obj exists at address {obj}
println("{}", g_counter); // 1
```

The object's placement memory address **MUST** be sized to *at-least* the object's size and the object placement address within the memory **MUST** be aligned to a multiple of the object's alignment. If an object is constructed at a memory location not sized enough for it, this can lead to Undefined Behaviour (out-of-bound reads). Non-suitably aligned placement memory can lead to unaligned read & writes (undefined behavior, which on some CPU architectures crash your application or just lead to degraded performance).
Reading an uninitialized/non-constructed object is Undefined Behaviour and catastrophic.

Placement-new serves some important purposes:
- initializing virtual function dispatch table for virtual (base and inherited) classes. (reintepret_cast + trivial construction (i.e. memset or memcpy) is not enough). i.e.




###### Example


Object Construction has several categories, namely:
    - construction
    - copy construction
    - move construction
    - trivial construction
    - trivial copy construction
    - trivial move construction

- Non-trivial Construction
For a **non-trivial** object to exist at a memory location it must be 'constructed' by the **placement new** operation.
Placement-new also serves to initialize the virtual function table pointers for the object to be usable in virtual dispatch.
The compiler's reachability analysis **MIGHT** decide an object doesn't exist at a memory address if it is not constructed with placement new and thus invoke undefined behaviour.
- Trivial Construction (`memcpy`, `memset`, `memmove`)
For objects that have no special constructors, virtual functions, or members that have any of those. they are considered `trivially constructible` and can be initialized via a memcpy, memset, memmove, or any trivial memory-write operation.

###### Assign Object
- Copy Assign (`T& operator=(U const&)`)
- Move Assign (`T& operator=(U &&)`)
- Trivial Assign

###### Destruct Object
- Destructor (`~T()`)
- Trivial Destructor


###### Deallocate Memory


### Implications
- RAII double-frees, implementing Option<T> as example
- Strict Aliasing, Dead-store, and Dead-load Optimizations
- Unions
- `no_unique_address`
- `std::launder`
- `std::aligned_storage` (deprecated in C++ 23). Link to paper
    ###### Alternatives
      - `Storage<T>` - Typed Memory Storage
      - `UntypedStorage<Alignment, Size>` - Untyped Memory Storage
- Trivial relocation and the missing allocator realloc


- diagram
- placement new
- construct, move (doesn't delete), copy, destruct
- implementing custom types
- implementing allocators
- unions
- aliasing
- reinterpret_cast and unsafety
- customizing aliasing and dead-store and load optimizations
- aligned_storage and its deprecation
 