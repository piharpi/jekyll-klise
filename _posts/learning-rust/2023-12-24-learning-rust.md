---
layout: post
title: Learning Rust to not let my brain rust!
date: 2023-12-23 14:30 +05:30
modified: 2020-03-07 16:49:47 +05:30
description: Exploring concepts of Rust
tag:
  - code
image: /cara-memperbarui-fork-repository/repo.png
---

I don't really have any plans this new year and christmas, and I wanted to do something productive with the free time that I have. On a whim, I decided that I want to try out learning Rust. I have no such reason as to why Rust, but I have seen it to be increasing in popularity and it gives a lot of control over the memory. A lot of people have also called it a modern replacement to C / C++. With the recent woes that I have been having with Hazelcast and JVM, with Garbage Collection events causing spikes in the latencies of the service I work on at Myntra.

To learn this, I will try to keep a goal, I want to do two things in Rust, one is to create a basic REST API Web Server, and other is I want to create a Socket based Chat App in Rust. I will start with learning the basic concepts of the language. I know a little bit about the concept of ownership before hand but that is the extent of it. Coming from a Java background, I love my Classes and Inheritance and all of the OO goodness, I am looking forward to be super annoyed with how Rust wants me to do things. After basic concepts, I will move on to figuring out some libraries, and building these two things.

This will be sort of my dump for all the things that I am making note of while going through the book, [The Rust Programming Language]{https://doc.rust-lang.org/book/}

Variables are immutable by default, to create a mutable variable, need to use `let mut x = 32;` Types are usually inferred, but can be declared, for example, `let x: i32 = 12` or `let x = 12i32`

There exist functions and macros, difference will come later, but macros can be identified using `!` for ex. `println!("Hello, World!)`

like variables, references are immutable by default. Hence, you need to write `&mut guess` rather than `&guess` to make it mutable. Context:

```rust
let mut guess = String::new();

io::stdin()
    .read_line(&mut guess) // We are passing a mutable reference to the variable where we want to store the input
    .expect("Failed to read line");
```

`read_line` returns a `Result` value, which is an enum, its variants are `Ok` and `Err`

`expect` takes a `Result` value, and if it is an `Err` then it throws the message shared, otherwise if the result is `Ok` it returns the value of that.

If this instance of `Result` is an `Err` value, `expect` will cause the program to crash and display the message that you passed as an argument to `expect`. If the `read_line` method returns an `Err`, it would likely be the result of an error coming from the underlying operating system. If this instance of `Result` is an `Ok` value, `expect` will take the return value that `Ok` is holding and return just that value to you so you can use it.

We create a variable named `guess`. But wait, doesn’t the program already have a variable named `guess`? It does, but helpfully Rust allows us to shadow the previous value of `guess` with a new one. *Shadowing* lets us reuse the `guess` variable name rather than forcing us to create two unique variables, such as `guess_str` and `guess` The first variable is said to be shadowed by the second variable. — Wouldn’t this cause confusion, which rust is trying to reduce by having immutable variables as the default? Seems a little counter intuitive.

Interesting thing is that I can shadow an immutable variable, which might allow someone to just use immutable variables as mutable by defining it again and again. It’s not the point, and no one will waste time like this. Maybe I am overthinking this. But I have to admit, the shadowing with scopes makes it an interesting feature, albeit maybe a little confusing.

`match` in rust seems similar to `switch` in other languages

Apart from `mut` variables and default immutable variables, rust also has `const` [constants](http://constants.In). In case of constants, type must be annotated. Constants are valid for the entire time a program runs, within the scope in which they were declared.
