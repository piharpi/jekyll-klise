---
title: Image lightbox showcase
date: 2026-10-25 10:00:00 +07:00
modified: 2026-10-25 10:00:00 +07:00
tags: [demo, images]
toc: true
description: A demo post exercising the built-in image lightbox across every case — plain images, figures with captions, linked images, missing alt text, inline images, raw HTML, and images inside lists.
image: "/image-lightbox-showcase/square.svg"
---

This post exercises the built-in **image lightbox** in every situation, using
plain grey placeholder images. Click any image in the post body to open it full
screen, then click anywhere or press <kbd>Esc</kbd> to close. Images that are
wrapped in a link are intentionally left alone so the link still works.

## 1. Standard Markdown image

A plain Markdown image. It should be **zoomable**, and its `alt` text becomes the
dialog label.

![A plain grey placeholder](/image-lightbox-showcase/square.svg)

## 2. Image in a figure with a caption

Wrapped in `<figure>` with a `<figcaption>`. The image is zoomable; the caption
stays put.

<figure>
  <img src="/image-lightbox-showcase/wide.svg" alt="A wide grey placeholder">
  <figcaption>Fig 1. An image with a caption below it.</figcaption>
</figure>

## 3. Linked image (must stay a link)

This image is wrapped in a link. Clicking it should **follow the link**, not open
the lightbox.

[![Click me — I open the repository](/image-lightbox-showcase/square.svg)](https://github.com/piharpi/jekyll-klise)

## 4. Image without alt text

No `alt` attribute. Still zoomable; the dialog falls back to a generic label.

![](/image-lightbox-showcase/wide.svg)

## 5. Small image

Images smaller than the viewport are centered and shown at their natural size.

![A small grey placeholder](/image-lightbox-showcase/small.svg)

## 6. Several images in a row

Each one opens independently.

![First](/image-lightbox-showcase/small.svg)
![Second](/image-lightbox-showcase/wide.svg)
![Third](/image-lightbox-showcase/square.svg)

## 7. Inline image inside a paragraph

An image can also sit inline in a sentence like this one ![tiny placeholder](/image-lightbox-showcase/small.svg) and it stays zoomable without breaking the text flow.

## 8. Raw HTML `<img>` tag

Authored directly as HTML rather than Markdown — behaves the same.

<img src="/image-lightbox-showcase/wide.svg" alt="A grey placeholder rendered from raw HTML">

## 9. Image inside a list

- A list item with an image: ![placeholder in a list](/image-lightbox-showcase/small.svg)
- A plain list item for comparison.

## 10. A linked image inside a figure

Combines cases 2 and 3: the figure is decorative, but the image links out, so the
link wins over the lightbox.

<figure>
  <a href="https://github.com/piharpi/jekyll-klise">
    <img src="/image-lightbox-showcase/square.svg" alt="Figure image that is also a link">
  </a>
  <figcaption>Fig 2. A captioned image that links to the repository.</figcaption>
</figure>

That covers every case the lightbox needs to handle: plain, captioned, linked,
alt-less, small, repeated, inline, raw HTML, and list-embedded images.
