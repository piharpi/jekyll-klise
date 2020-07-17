---
title: All Posts
permalink: /posts/
layout: page
excerpt: All posts I've made.
comments: false
---

{% for post in site.posts%}
<article class="post-item">
  <span class="post-item-date">{{ post.date | date: "%b %d, %Y" }}</span>
  <h3 class="post-item-title">
    <a href="{{ post.url }}">{{ post.title | escape }}</a>
  </h3>
</article>
{% endfor %}
