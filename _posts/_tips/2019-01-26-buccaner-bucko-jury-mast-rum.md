---
title: How to name Sass color variables
date: 2018-11-18 11:45:47 +07:00
tags: [css, sass, naming-variables]
layout: post
comment: true
thumbnail: https://source.unsplash.com/FWCUZqXCrUs/800x480
---

When it comes to naming Sass variables, I suck. I think I've found the perfect solution, get half way through a project, and realise what a terrible mistake I'd made.

Variables in any language are often overlooked. They're treated as these things that 'ultimately only developers will see, so who cares'. But having a proper naming convention can really help save time, keep your code DRY, and more importantly make your codebase easier to understand for other developers.

## The bad

So let's start with the bad. Going back a few months, this is pretty much what the variables file in all of my old projects looked like:

    $red: #e03c31;
    $darker-red: #c1271d;
    $blue: #00f;
    $text-color: #1a1a1a;

What's the problem here?
- The variable names provide no clues as to where they sit in the hierarchy, or their relationship       with one another.
- What's the primary color? Red? Blue?
- What happens if our color scheme changes? We suddenly have to change every instance of ```$red```, with      our new color. These defeats the point of having variables in the first place.
- _'Darker Red'_ ? How much darker is darker?


## Better

    $primary-color: #e03c31;
    $secondary-color: #7fff00;
    $text-color: #1a1a1a;

Now we've provided some context, we can better see the relationship between our colors. We have a ```$primary-color``` and ```$secondary-color```, which would be our brand colors, and then provide some other utility variables such as ```$text-color```.


## Even Better

    // Internal variables
    $x-palette-red: #e03c31;
    $x-palette-green: #7fff00;

    // Global variables
    $palette-primary: $x-color-red;
    $palette-secondary: $x-color-green;

    $palette-paragraph: #1a1a1a;

This is a method that I've recently started using in all of my new projects.

First we define our colors at a very high level using internal variables. I like to prefix my internal variables with ```x```. Internal variables have one function, and that's to be assigned to other variables. This allows us to keep our global variables free of any bias, but also informs us and others working on the codebase what the actual palette color is. Because let's face it, hex codes are for machines.

We've also switched around the naming of the actual color variables, to follow a 'property -> level' convention. This is particulary useful when these are surrounded by other variables for typography, grids, etc., as we can instantly scan our variables file by property.

    $palette-primary: $x-color-red;
    $palette-secondary: $x-color-blue;
    $palette-tertiary: $x-color-green;

    $font-family-primary: 'Helvetica Neue', sans-serif;
    $font-family-secondary: 'Georgia', serif;

    $line-height-base: 18px;
    $line-height-paragraph: 16px;

Likewise, we use the word 'palette' to distinguish our variables from the 'color' css property which is exclusively for text color.

**For demo purpose**, Originally published at <https://fahmiirsyd.com>.