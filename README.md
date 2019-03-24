# Bangsring Jekyll Theme
Adalah tema jekyll minimalis, ringan dan responsive, sempurna untuk Personal site juga blog anda, membuat diri anda seperti orang  professional,  bisa dijankan melalui [Github Pages](https://pages.github.com/), [Netlify](https://www.netlify.com/), maupun server sendiri,  anda juga bisa menyesuaikan tema ini dengan mengedit kode sumber, cukup untuk perkenalanya.



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

## Demo



## Installation

Ada tiga cara penginstallan tema melalui Ruby gem, 

Directory Structure 

```
bangsring
├── _data                      # data files for customizing the theme
|  ├── menus.yml          	   # navigation links
|  └── projects.yml            # list your projects
├── _drafts                    # drafts folder
├── _includes
|  ├── blog.html               # snippets for analytics (Google and custom)
|  ├── cover.html              # snippets for comments
|  ├── disqus_comment.html     # snippets for comments
|  ├── footer.html             # snippets for comments
|  ├── head.html               # snippets for comments
|  ├── header.html             # snippets for comments
|  ├── pagination.html         # snippets for comments
|  ├── post-nav.html           # snippets for comments
|  ├── tags.html               # snippets for comments
|  └── tips.html               # snippet o
├── _layouts
|  ├── 404.html                # tag/category archive for Jekyll Archives plugin
|  ├── compress.html           # archive base
|  ├── default.html            # archive base
|  ├── home.html               # archive base
|  ├── page.html               # archive base
|  └── post.html               # splash page
├── _sass                      # SCSS partials
├── assets
|  ├── css
|  |  └── style.scss           # main stylesheet, loads SCSS partials from _sass
|  ├── image                   # image assets for posts/pages/collections/etc.
|  |  ├── posts				         
|  |  |  ├── blog	
|  |  |  └── tips              # main stylesheet, loads SCSS partials from _sass
|  |  └── avatar.png           # main stylesheet, loads SCSS partials from _sass
|  ├── js
|  |  ├── disqus.js            # plugin settings and other scripts to load after jQuery
|  |  └── galite.js            # optimized and concatenated script file loaded before 
├── _config.yml                # site configuration
├── Gemfile                    # gem file dependencies
├── 404.md                     # paginated home page showing recent posts
├── about.md                   # paginated home page showing recent posts
├── blog.md                    # paginated home page showing recent posts
├── index.md                   # paginated home page showing recent posts
├── tags.md                    # paginated home page showing recent posts
├── tips.md                    # paginated home page showing recent posts
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