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

<a href="http://www.youtube.com/watch?v=tc4ROCJYbm0&t=70" target="_blank" rel="noopener">Dulu</a> Sebelum adanya <abbr title="Graphical User Interface">GUI</abbr> cara user berinteraksi dengan komputer menggunakan <abbr title="Command Line Interface">CLI</abbr> yaitu mengetik baris perintah pada sebuah antarmuka dalam bentuk baris teks seperti 👇.

<figure>
<figcaption>Fig 1. Terminal emulator, instalasi package dan check service.</figcaption>
</figure>

Jika kamu pernah menggunakan unix/linux mungkin pernah menggunakan program diatas, bahkan mungkin setiap hari menggunakannya untuk mengeksekusi suatu perintah melalui <a href="http://en.wikipedia.org/wiki/List_of_terminal_emulators" target="_blank" rel="noopener">terminal emulator</a>.

User<sup id="user">[[1]](#user-ref)</sup> tidak bisa secara langsung berkomunikasi dengan sebuah hardware komputer, maka dari itu kita membutuhkan sebuah sistem operasi; **Kernel** adalah program yang merupakan inti utama dari sistem operasi komputer.

<figure>
<figcaption>Fig 2. bagan kernel.</figcaption>
</figure>

Kernel memfasilitasi interaksi antara komponen perangkat keras dan perangkat lunak, berperan untuk menangani permintaan input/ouput dari perangkat lunak, selanjutnya menerjemahkannya ke dalam pemrosesan data untuk diintruksikan ke CPU, sehingga Hardware(cpu, memory, devices) mengerti perintah yang dimaksud dari pengguna.

Ketika kita menginputkan suatu perintah pada terminal emulator, kernel tidak langsung mengerti perintah yang kita ketik, kita membutuhkan suatu interface sebagai perantara menuju kernel yaitu **Shell**.

<figure>
<figcaption>Fig 3. bagan komunikasi shell.</figcaption>
</figure>

<mark>Shell adalah sebuah command-line interpreter; program yang berperan sebagai penerjemah perintah yang diinputkan oleh User yang melalui terminal</mark>, sehingga perintah tersebut bisa dimengerti oleh si Kernel.

Login shell biasanya ditetapkan oleh local System Administrator ketika pada saat pertama user kamu dibuat, kamu bisa lihat login shell yang sedang kamu gunakan dengan perintah dibawah ini.

```bash
$ echo $SHELL
# atau
$ echo $0
```

Setiap shell mempunyai default prompt. beberapa shell yang paling umum:

```bash
$ (dollar sign)   # sh, ksh, bash
% (percent sign)  # csh, tcsh
```

##### Terminologi pada shell prompt

Shell prompt adalah tempat dimana kita menuliskan suatu perintah, berikut adalah terminologinya ini membantu, jika kamu ingin mengetahui bagian-bagianya.

<figure>
<figcaption>Fig 4. bagian-bagin dari shell prompt.</figcaption>
</figure>

Dibawah ini salah satu contoh perintah sederhana untuk menampilkan sebuah arsitektur CPU komputer yang sedang saya gunakan.

<figure>
<figcaption>Fig 5. menampilkan informasi tentang arsitektur CPU.</figcaption>
</figure>

Dari perintah yang contohkan, ketika user mengetikan suatu inputan perintah di terminal dan menekan <kbd>ENTER</kbd>, maka shell akan mengubah perintah user menjadi bahasa yang bisa dipahami oleh kernel, dan Kernel menerjemahkannya ke dalam pemrosesan data untuk diintruksikan ke Hardware sehingga menghasilkan output yg sesuai dengan perintah user.

Shell mempunyai beberapa macam dan turunan, berikut yang paling umum.

<figure>
<figcaption>Fig 6. evaluasi shell dari tahun ke tahun.</figcaption>
</figure>

Sedikit penjelasan dari gambar diatas.

- Bourne shell `sh`
  Dikembangkan oleh Stephen Bourne di Bell Labs, yang kala itu sebagai pengganti Thompson shell(diciptakan Ken Thompson), banyak sistem unix-like tetap memiliki `/bin/sh`—yang mana menjadi symbolic link atau hard link, bahkan ketika shell lain yang digunakan tetap `sh` adalah sebagai dasarnya, sebagai kompatibilitas perintah.
- Korn shell `ksh` Unix shell yang dikembangkan oleh David Korn di Bell Labs,
  inisialiasi pengembangan ini berdasar pada source code Bourne shell, namun juga memiliki fitur `csh` dan `sh`, pengembanganya pun pada saat saya menulis ini pun terus <a href="http://github.com/att/ast" target="_blank" rel="noopener">terawat</a>.
- Bourne again shell `bash`
  adalah proyek ini open source <a href="http://gnu.org/software/bash/" target="_blank" rel="noopener">GNU project</a> memilki kompatibel dengan `sh` yang menggabungkan fitur penting dari `ksh` dan `csh`, dan menjadi salah satu shell yang paling umum digunakan (umumnya menjadi default shell login Linux dan Apple's macOS Mojave).
- Z shell `zsh` ini mempunyai wadah komunitasnya disebutnya <a href="http://ohmyz.sh/"  target="_blank" rel="noopener">"Oh My Zsh"</a>, plug-in dan theme `zsh` bisa kita temukan di komunitas ini, saya saat ini menggunakan `zsh`, shell ini juga menjadi default dari sistem operasi macOS Catalina, yang menggantikan bash.
- friendly interactive shell `fish`
  yah sesuai dengan <a href="http://fishshell.com/" target="_blank" rel="noopener">deskripsi</a> di web nya, menurut saya shell ini fun banget, fitur yang saya sukai dari shell ini autosuggestions, dan konfigurasi yang mudah melalui web based.

Masih banyak yang belum dijelaskan pada tulisan ini jika masih tertarik, baca lebih <a href="http://en.wikipedia.org/wiki/List_of_command-line_interpreters#Operating_system_shells" target="_blank" rel="noopener">banyak</a> dan juga <a href="http://en.wikipedia.org/wiki/Comparison_of_command_shells" target="_blank" rel="noopener">komparasinya</a> masing-masing shell.

Jika kamu tertarik untuk mengubah default shell login pada sistem operasi, kamu bisa menginstall dengan cara mengikuti didokumentasi/cara penginstallan dimasing-masing shell disini saya tidak membahas karena distro yang kita pakai mungkin berbeda-beda.

Untuk menjadikan default shell login pada OS bisa menggunakan perintah ini.

```bash
# command
$ sudo chsh [options] [LOGIN]

# contoh penggunaan
$ sudo chsh -s /user/bin/zsh harpi
# mengubah default shell user harpi menjadi zsh shell.
$ reboot

# atau kamu juga bisa mengubah file /etc/passwd dan edit secara manual user shellnya.
# jika masih bingung manfaatkan perintah man untuk melihat manual page.
$ man chsh
```

Terakhir untuk tulisan ini, shell memilki berbagai macam, pilihlah shell yang sesuai dengan keinginanmu untuk menunjang produktivitas dan sesuaikan dengan kebutuhan, terlalu banyak plugin dan kebingungan memilih tema itu buruk 😁.

Terimakasih sudah baca, _penulis menerima kritik dan saran._

##### Notes

<small id="user-ref"><sup>[[1]](#user)</sup> Manusia yang mengoperasikan dan mengendalikan sistem komputer.</small>

##### Resources

- [Evolution shells in Linux](http://developer.ibm.com/tutorials/l-linux-shells/)
- [Kernel Defintion](http://www.linfo.org/kernel.html)
- [The Shell](http://www.cis.rit.edu/class/simg211/unixintro/Shell.html)


- Integral Types: signed and unsigned integer types, floating point types, boolean, pointer types.
- Trivial and Non-Trivial Types