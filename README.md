# Klisé

Klisé is minimalist Jekyll theme for running a personal site and blog running on Jekyll.<br>
For demo <a href="https://klise.now.sh" target="_blank" rel="noopener">klise.now.sh</a>

## Features

- [x] Light & Dark Mode support, follows OS preference by default :waxing_crescent_moon:
- [x] Customizable (using `.scss`)
- [x] Responsive (desktop, tab and mobile)
- [x] Mobile First Design
- [x] SEO Optimized
- [x] Images of post Organized ([`jekyll-postfiles`](https://github.com/nhoizey/jekyll-postfiles))
- [x] Generate Sitemap ([`jekyll-sitemap`](https://github.com/jekyll/jekyll-sitemap))
- [x] RSS Feed ([`jekyll-feed`](https://github.com/jekyll/jekyll-feed))
- [x] Syntax Highlighter ([`rouge`](https://github.com/rouge-ruby/rouge))
- [x] Table of contents, opt-in per post with `toc: true`
- [x] Next & Previous Post
- [x] Comment layout, enable in frontmatter if you wish
- [x] Google analytics
- [x] HTML Minify ([`jekyll-compress-html`](https://github.com/penibelst/jekyll-compress-html))
- [x] W3C **Validated**
- [x] Lighthouse and PageSpeed **Passed**

![Lighthouse Result](./lighthouse.png)

## Backlogs

- [ ] Intergrated with PhotoSwipe.
- [x] Add schema.org meta information.
- [ ] Transform class selector to BEM metodology.

## Installation

Requires **Ruby >= 3.0** and **Jekyll ~> 4.4**.

Run local server:

```bash
$ git clone https://github.com/piharpi/jekyll-klise.git
$ cd jekyll-klise
$ bundle install
$ bundle exec jekyll serve
```

Navigate to `localhost:4000`. You're Welcome, Fork and be Stargazer.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/piharpi/jekyll-klise) [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/piharpi/jekyll-klise) [![Deploy to Azure button](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/?feature.customportal=false&WT.mc_id=javascript-0000-jopapa#create/Microsoft.StaticApp)

## Table of contents

Add `toc: true` to a post's front matter to render an automatic table of
contents (built from its `h2`/`h3` headings) above the article:

```yaml
---
title: My post
toc: true
---
```

## Limitation

- Since [`jekyll-postfiles`](https://github.com/nhoizey/jekyll-postfiles#compatibility) plugin isn't supported by github pages, this cause will make your site problems, path broken or post images won't show up, you can host alternatively using likes [netlify.com](https://netlify.com), [vercel.com](https://vercel.com), [azure.com](https://docs.microsoft.com/azure/static-web-apps/publish-jekyll) or [surge.sh](https://surge.sh) services, which support 3rd party.

## Contributing

If you see any typos or formatting errors in a post, or want to helping reduce backlogs or any other issue that needs to be addressed, please do not hesitate to open a pull request and fix it!, please read [contributing](./CONTRIBUTING.md) before PR.

Yeaaa feel free to open a pull request.
## Support

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/W7W7MJ4X) [![saweria.co](./assets/img/saweria-button.png)](https://saweria.co/piharpi)
## License

This project is open source and available under the [MIT License](LICENSE).
