---
title: How to Clear Nunjucks Cache
date: 2019-02-19 11:45:47 +07:00
modified: 2019-02-20 11:45:47 +07:00
category: tips
tags: [nonjuck, cache, pug, flores, static-site]
---
I’m building a static site generator (again) named [Flores](). Initially, I use [Pug]() for the templating engine. But then I discovered [Nunjucks](). It has a lot more features and the syntax is quite similar to [Twig]() which I’m familiar with. I also did a quick test and the render time is quite similar when the cache option is activated.

However, I had an issue when Flores is on the “watch” mode (think of Webpack watch mode). When the user edits the template file, the changes won’t be reflected on the generated HTML files. This thing happened because of Nunjucks cached the compiled template. The thing is there’s no mention in Nunjucks documentation on how to manually clear the cache.

I dug into the [Nunjucks source code](https://github.com/mozilla/nunjucks) and found out that each Nunjucks loader (the object that responsible for loading the template) uses cache property to store the compiled template. You can check it on [```initCache```](https://github.com/mozilla/nunjucks/blob/v3.1.7/nunjucks/src/environment.js#L98-L108) method on ```Environment``` class.

    // src/environment.js
    initCache() {
      // Caching and cache busting
      this.loaders.forEach((loader) => {
        loader.cache = {};
        if (typeof loader.on === 'function') {
          loader.on('update', (template) => {
            loader.cache[template] = null;
          });
        }
      });
    }

So in order to clear all the caches, all I have to do is simply set this ```cache``` property to an empty object again.

    const nunjucks = require("nunjucks");

    const env = nunjucks.configure("./path/to/templates");

    for (let i = 0; i < env.loaders.length; i += 1) {
      env.loaders[i].cache = {};
    }

**For demo purpose**, Originally published at <https://bagja.net>.