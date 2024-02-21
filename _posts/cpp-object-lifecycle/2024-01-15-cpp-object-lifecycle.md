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

A general rule of thumb for testing lifecycle violations in containers is to ensure the number of constructions is equal to the number of destructions, which is the core idea behind RAII.
The types we will be using for demonstrating some of these concepts is defined as follows:

```cpp

struct Counter {
    uint32_t num_constructs = 0;
    uint32_t num_destructs = 0;

    void log() {
        printf("num_constructs = %" PRIu32 " \nnum_destructs =  %" PRIu32 "\n",
               num_constructs, num_destructs);
    }
};

struct Obj {
    // default-construction
    Obj() { counter.num_constructs++; }
    // copy-construction
    Obj(Obj const& t) : data{t.data} { counter.num_constructs++; }
    // move-construction
    Obj(Obj&& t) : data{t.data} { counter.num_constructs++; }
    // copy-assignment
    Obj& operator=(Obj const& t) {
        data = t.data;
        return *this;
    }
    // move-assignment
    Obj& operator=(Obj&& t) {
        data = t.data;
        return *this;
    }
    // destruction
    ~Obj() { counter.num_destructs++; }
    uint32_t data = 1;
};


```


```cpp

struct Animal {
    virtual void react() = 0;
};

struct Cat : Animal {
    void react() override { printf("purr...\n"); }
};

struct Dog : Animal {
    void react() override { printf("woof!\n"); }
};

```

#### Allocate Memory
An object's memory **can** be sourced from the stack (i.e. `alloca`, `malloca`) or heap (i.e. `sbrk`, `malloc`, `kalloc`) and have some base requirements for objects to be placed on them:
- On successful allocation, memory returned by allocators **MUST** be valid and not be already in use.
This prevents catastrophic failures like double-free (double-object destructor calls).
**SEE**: GNUC's [`__attribute__((malloc(...)))`](https://gcc.gnu.org/onlinedocs/gcc/Common-Function-Attributes.html) and MSVC's [`__restrict`](https://learn.microsoft.com/en-us/cpp/cpp/restrict?view=msvc-170) return attributes which enables global aliasing optimizations for the compiler's reachability analysis.
**NOTE**: `malloc(0)` and `realloc(ptr, 0, 0)` are not required to return `nullptr` and is implementation-defined behavior. An implementation **MIGHT** decide to return the same or different non-null (possibly sentinel) memory address for a 0-sized allocation.
- General-purpose allocators **SHOULD** support at least alignment of `alignof(max_align_t)` where [`max_align_t`](https://en.cppreference.com/w/c/types/max_align_t) is mostly either `double` (8 bytes) or `long double` (16 bytes), as in the case of `malloc`. `max_align_t` is a maximum-aligned integral scalar type.
**NOTE**: C11 introduced [`aligned_alloc`](https://en.cppreference.com/w/c/memory/aligned_alloc) for over-aligned allocations (beyond `alignof(max_align_t)`) which is typically required for SIMD vector operations (SSE/AVX's 128-bit, 256-bit, and 512-bit extensions) as the SIMD's wide registers operate on over-aligned memory addresses. `MSVC`'s C runtime doesn't support `aligned_alloc` yet but provides [`_aligned_malloc`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-malloc?view=msvc-170) and [`_aligned_free`](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-free?view=msvc-170).


### Construct Object
This is where the lifecycle of an object begins. For trivially constructible objects this implies a placement new of the object on the placement memory and for trivially constructible types, any memory write operation on the object's placement memory.

The object's placement memory address **MUST** be sized to *at-least* the object's size and the object placement address within the memory **MUST** be aligned to a multiple of the object's alignment. If an object is constructed at a memory location not sized enough for it, this can lead to Undefined Behaviour (out-of-bound reads). Non-suitably aligned placement memory can lead to unaligned read & writes (undefined behavior, which on some CPU architectures crash your application with a `SIGILL` or just lead to degraded performance).
Reading an uninitialized/non-constructed object is Undefined Behaviour and catastrophic.

Placement-new serves some important purposes:
- initializing virtual function dispatch table for virtual (base and inherited) classes. (`reintepret_cast` + trivial construction i.e. `memset` or `memcpy` is not enough). i.e.
- initializing the class/struct, it's base classes, and its members


Let's look at these in practice:

```cpp
// https://godbolt.org/z/fq9KdP1eo
int * x = (int*) malloc(4);
(*x)++; // undefined behaviour
```
The code above invokes undefined behaviour due to an uninitialized read of an `int` at memory x.
With optimizations enabled, the compiler can aggressively decide to totally ignore the increment operation.

To fix:
```cpp
// https://godbolt.org/z/fq9KdP1eo
int * x = (int*) malloc(4);
* x = 0;
(*x)++;
```

Because `int` is a trivially constructible type (i.e. no special construction semantics) with no invariants, it can be constructed simply by writing to the memory address, and an `int` "object" would implicitly exist at memory address `x`. 
To construct an `int` or trivially constructible object at address `x` You can also use:
- operator new
- `memcpy`/`memmove`
- `memset`/`memset_explicit`

Now, let's take a look at a type with a more complex construction semantic (non-trivially-constructible):

```cpp
// https://godbolt.org/z/Kn3bccore
Obj* obj = (Obj*) malloc(sizeof(Obj));
obj->data++; // undefined behaviour, data is random value
printf("data: %" PRIu32 "\n", obj->data);
counter.log(); // num_constructs = 0, num_destructs = 0
```

From the log above, you can see the Object is never constructed at address `obj`, so, no object of type `Obj` exists at `obj` yet and it is undefined behaviour to use/destroy the object in that state.
This could lead to a number of contract violations/undefined behaviour like double-free, out-of-bounds reads/writes.

To fix:

```cpp
// https://godbolt.org/z/1M58e85Mh
Obj* obj = (Obj*) malloc(sizeof(Obj));
new (obj) Obj{};  // constructs object of type Obj at the address
obj->data++;  // ok: data is increased from default value of 1 to 2
printf("data: %" PRIu32 "\n", obj->data);
counter.log();  // num_constructs = 1, num_destructs = 0
```
The placement new constructs the object of type `Obj` at address `obj`, and now contains valid data.

Placement-new also serves to initialize the virtual function table pointers for the object to be usable in virtual dispatch.
The compiler's reachability analysis **MIGHT** decide an object doesn't exist at a memory address if it is not constructed with placement new and thus invoke undefined behaviour. To illustrate:

```cpp
// https://godbolt.org/z/aMMGe1n8o
Cat * cat = (Cat*) malloc(sizeof(Cat));
memset(cat, 0, sizeof(Cat));
cat->react(); // static dispatches to Cat::react()
Animal * animal = cat;
animal->react(); // undefined behaviour
```

Calling `cat->react()`, correctly calls `Cat::react` via static dispatch. However with dynamic dispatch from its Base class method `Animal::react` via the call `animal->react()`, this would lead to Undefined Behaviour (a segmentation fault if in debug mode or compiler's reachability analysis doesn't see the memset. otherwise, the compiler can simply ignore it).

To examine why this happens, let's implement our virtual classes with our custom dynamic dispatch/v-table:

```cpp
struct Animal{
 void (*react)(void *);
};

struct Cat{
  Animal animal{
    .react = &react
  };
 static void react(void *);
};

```

For virtual dispatch to occur, the function pointer `Animal::react` would need to be called, the function pointer has been initialized to `0` by the `memset` call which is undefined behaviour when invoked.

To fix our previous example, we would need to correctly initialize the implementation-defined virtual function dispatch table via, the operator-new call, i.e:

```cpp
// https://godbolt.org/z/z3rds6hPc
Cat * cat = (Cat*) malloc(sizeof(Cat));
new (cat) Cat{}; // initializes v-table
cat->react(); // static dispatches to Cat::react()
Animal * animal = cat;
animal->react(); // undefined behaviour
```

The virtual function call `animal->react()` now correctly dispatches to `Cat::react`.

**NOTE**: The C++ standard doesn't specify how virtual dispatch/virtual function tables should be implemented, so there's no portable way to reliably manipulate the runtime's virtual function table.

Copy and Move construction implies the source address is already constructed with an object, and the destination address is a scratch memory containing uninitialized object that need to be initialized. Note that Copy and Move construction should not call the destructors of either of the source or destination objects.

Object construction is also split into several categories, namely:
- [non-trivial construction](https://en.cppreference.com/w/cpp/types/is_constructible)
- [non-trivial copy construction](https://en.cppreference.com/w/cpp/types/is_copy_constructible)
- [non-trivial move construction](https://en.cppreference.com/w/cpp/types/is_move_constructible)
- [trivial construction](https://en.cppreference.com/w/cpp/types/is_constructible)
- [trivial copy construction](https://en.cppreference.com/w/cpp/types/is_copy_constructible)
- [trivial move construction](https://en.cppreference.com/w/cpp/types/is_move_constructible)


### Assign Object
Copy and Move assignment requires that an object already exists at a memory address and we would like to assign another object to it. Meaning both the source and dest addresses contain valid intialized objects.
Object Assignment is split into several categories, namely:
- [copy assignment (`T& operator=(U const&)`)](https://en.cppreference.com/w/cpp/types/is_copy_assignable)
- [move assignment (`T& operator=(U &&)`)](https://en.cppreference.com/w/cpp/types/is_move_assignable)
- [trivial copy assignment](https://en.cppreference.com/w/cpp/types/is_copy_assignable)
- [trivial move assignment](https://en.cppreference.com/w/cpp/types/is_move_assignable)
Assignment being trivial means the objects can be assigned to another object without a special operation, this means it can be copied bytewise, i.e. via a `memcpy` or `memmove`.

### Destruct Object
Destruction requires that a valid object exists at a memory location. Unlike trivial constructions and assignments, trivial destruction implies a no-op.
- [non-trivial destruction (`~T()`)](https://en.cppreference.com/w/cpp/types/is_destructible)
- [trivial destruction](https://en.cppreference.com/w/cpp/types/is_destructible)

### Deallocate Memory
Deallocating memory requires that any object on the placement memory has been destroyed. The memory is returned to its allocator and should no longer be referenced nor used.


## Applications

### Unions


### Strict Aliasing, Dead-store, and Dead-load Optimizations

### `std::aligned_storage` (deprecated in C++ 23). Link to paper

### `Option<T>` (`std::optional<T>`)
`Option<T>` implies an object of type `T` may or may not exist, this means the object is either initialized or not initialized at the placement address and its existence is recognized by a discrimating enum/boolean.
Implementing `Option<T>` would require that the lifecycle of the value type `T` is maintained correctly. i.e. number of constructions is same as the number of destructions, the object's constructor is called before being regarded as existing in the `Option`.

### `Result<T, E>` (`std::expected<T, E>`)
`Result<T, E>` implies an object of type `T` or type `E` exists at the placement address of the `Result`, it is discriminated by an enum or boolean value.
Just like `Option<T>`, `Result<T, E>` maintains the lifecycle of the value type `T` and `E`.
 
### Trivial Relocation
### Container Types
