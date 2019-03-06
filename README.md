# Bangsring 
​	Adalah tema jekyll minimalis, ringan dan responsive, sempurna untuk Personal site juga blog anda, membuat diri anda seperti orang  professional,  bisa dijankan melalui [Github Pages](https://pages.github.com/), [Netlify](https://www.netlify.com/), maupun server sendiri,  anda juga bisa menyesuaikan tema ini dengan mengedit kode sumber, cukup untuk perkenalanya, klik untuk [demo](https://piharpi.github.io/bangsring).



GAMBAR RESPONSIVE(DESKTOP, TAB, MOBILE) DISINI



## Fitur Penting

- Tentu responsive dialat apapun.

- Tampilan yang nyaman dibaca, tidak merusak matamu. 
- Compatible dengan browser tua i.e: Internet Explorer.
- Compatible dengan Github Pages and Netlify. 
- Dibuat dengan Sass/SCSS preprocessor dan data lainya mudah untuk disesuaikan.
- Google Analystics support.
- Commenting support powered by Disqus(optional).
- Optimized for search engines with support for [Twitter Cards](https://dev.twitter.com/cards/overview) and [Open Graph](http://ogp.me/) data



## Installation

Ada tiga cara penginstallan tema melalui Ruby gem, 

Directory Structure 

```
bangsring
├── _data                      # data files for customizing the theme
|  ├── menus.yml          	   # navigation links
|  └── projects.yml            # list projects
├── _includes
|  ├── analytics-providers     # snippets for analytics (Google and custom)
|  ├── comments-providers      # snippets for comments
|  ├── toc                     # table of contents helper
|  └── ...
├── _layouts
|  ├── page.html   # tag/category archive for Jekyll Archives plugin
|  ├── blog.html            # archive base
|  ├── tags.html               # archive listing posts grouped by tags
|  └── category.html             # splash page
├── _sass                      # SCSS partials
├── assets
|  ├── css
|  |  └── style.scss           # main stylesheet, loads SCSS partials from _sass
|  ├── image                   # image assets for posts/pages/collections/etc.
|  |  ├── posts				   #
|  |  ├── logo.jpg	
|  ├── js
|  |  ├── plugins              # jQuery plugins
|  |  ├── vendor               # vendor scripts
|  |  ├── _main.js             # plugin settings and other scripts to load after jQuery
|  |  └── main.min.js          # optimized and concatenated script file loaded before 
├── _config.yml                # site configuration
├── Gemfile                    # gem file dependencies
├── index.html                 # paginated home page showing recent posts
└── package.json               # NPM build scripts
```



## Berkontribusi

Having trouble working with the theme? Found a typo in the documentation? Interested in adding a feature or [fixing a bug](https://github.com/mmistakes/minimal-mistakes/issues)? Then by all means [submit an issue](https://github.com/mmistakes/minimal-mistakes/issues/new) or [pull request](https://help.github.com/articles/using-pull-requests/). If this is your first pull request, it may be helpful to read up on the [GitHub Flow](https://guides.github.com/introduction/flow/) first.

Minimal Mistakes has been designed as a base for you to customize and fit your site's unique needs. Please keep this in mind when requesting features and/or submitting pull requests. If it's not something that most people will use, I probably won't consider it. When in doubt ask.

This goes for author sidebar links and "share button" additions -- I have no intention of merging in every possibly option, the essentials are there to get you started.

#### Pull Requests

When submitting a pull request:

1. Clone the repo.
2. Create a branch off of `master` and give it a meaningful name (e.g. `my-awesome-new-feature`).
3. Open a pull request on GitHub and describe the feature or fix.

Theme documentation and demo pages can be found in the [`/docs`](https://github.com/piharpi/minimal-mistakes/blob/master/docs) if submitting improvements, typo corrections, etc.



## License

MIT License

Copyright (c) 2019 Mahendrata Harpi

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.