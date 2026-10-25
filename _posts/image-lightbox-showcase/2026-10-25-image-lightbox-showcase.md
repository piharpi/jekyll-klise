---
title: Image lightbox showcase
date: 2026-10-25 10:00:00 +07:00
modified: 2026-10-25 10:00:00 +07:00
tags: [demo, images]
toc: true
description: A demo post exercising the built-in image lightbox across every case — plain images, figures with captions, linked images, missing alt text, inline images, raw HTML, and images inside lists.
image: "/assets/img/ogp.png"
---

This post exercises the built-in **image lightbox** in every situation. Click
any image in the post body to open it full screen, then click anywhere or press
<kbd>Esc</kbd> to close. Images that are wrapped in a link are intentionally
left alone so the link still works.

## 1. Standard Markdown image

A plain Markdown image. It should be **zoomable**, and its `alt` text becomes the
dialog label.

![A square Open Graph image used by the theme](/assets/img/ogp.png)

## 2. Image in a figure with a caption

Wrapped in `<figure>` with a `<figcaption>`. The image is zoomable; the caption
stays put.

<figure>
  <img src="/assets/img/ogp.png" alt="The same image, inside a figure">
  <figcaption>Fig 1. An image with a caption below it.</figcaption>
</figure>

## 3. Linked image (must stay a link)

This image is wrapped in a link. Clicking it should **follow the link**, not open
the lightbox.

[![Click me — I open the repository](/assets/img/ogp.png)](https://github.com/piharpi/jekyll-klise)

## 4. Image without alt text

No `alt` attribute. Still zoomable; the dialog falls back to a generic label.

![](/assets/img/saweria-button.png)

## 5. Small image

Images smaller than the viewport are centered and shown at their natural size.

![A small avatar](/assets/img/avatar.jpg)

## 6. Several images in a row

Each one opens independently.

![First](/assets/img/avatar.jpg)
![Second](/assets/img/saweria-button.png)
![Third](/assets/img/ogp.png)

## 7. Inline image inside a paragraph

An image can also sit inline in a sentence like this one ![tiny avatar](/assets/img/avatar.jpg) and it stays zoomable without breaking the text flow.

## 8. Raw HTML `<img>` tag

Authored directly as HTML rather than Markdown — behaves the same.

<img src="/assets/img/saweria-button.png" alt="Support button rendered from raw HTML">

## 9. Image inside a list

- A list item with an image: ![avatar in a list](/assets/img/avatar.jpg)
- A plain list item for comparison.

## 10. A linked image inside a figure

Combines cases 2 and 3: the figure is decorative, but the image links out, so the
link wins over the lightbox.

<figure>
  <a href="https://github.com/piharpi/jekyll-klise">
    <img src="/assets/img/ogp.png" alt="Figure image that is also a link">
  </a>
  <figcaption>Fig 2. A captioned image that links to the repository.</figcaption>
</figure>

That covers every case the lightbox needs to handle: plain, captioned, linked,
alt-less, small, repeated, inline, raw HTML, and list-embedded images.
