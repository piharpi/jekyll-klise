# Changelog

All notable changes to this project are documented in this file.

## [1.1.0] - 2026-10-25

First release since 1.0.1 (2020). Modernises the toolchain and adds several
content features, while keeping the theme dependency-light.

### Added
- Follow the OS color scheme (`prefers-color-scheme`) by default when the
  visitor has not picked a theme, and keep following it live until they do (#95).
- Table of contents, opt-in per post with `toc: true` (#82).
- schema.org structured data (JSON-LD): `BlogPosting` for posts, `WebSite`
  for other pages.
- RTL / LTR text direction support via a `direction` config option and
  per-page front matter, with per-block auto direction for post content and
  an Arabic/Farsi font subset (#94).
- Image lightbox: click an image in a post to view it full screen (vanilla
  JS, no dependency) — supersedes the PhotoSwipe backlog item.
- Image gallery: wrap images in `<div class="gallery">` for a neat,
  responsive, equal-height row.
- Tidy thumbnails for images placed inside list items.
- GitHub Actions CI that builds the site on every push and pull request.
- `webrick` as a runtime dependency so the theme works out of the box on
  Ruby 3+ (#69).
- `package.json` pinning Node.js to `24.x` for Vercel builds.

### Changed
- Bump Jekyll `~> 4.1` → `~> 4.4` and `jekyll-feed` `~> 0.13` → `~> 0.18`.
- Tags page is now sorted alphabetically (#37).
- Replace the default Open Graph image with a neutral placeholder (removes the
  bundled personal photo).

### Fixed
- Tag anchors on the tags page are slugified so links from a post
  (`/tags/#{slug}`) land on the correct section.
- Removed a duplicate `id="results-container"` emitted inside a loop on the
  tags page (invalid HTML).
- Give the `html` canvas a background so Safari no longer leaves the area
  below short pages blank (#45).

### Removed
- Legacy `now.json`, migrated to `vercel.json`.

[1.1.0]: https://github.com/piharpi/jekyll-klise/releases/tag/v1.1.0
[1.0.1]: https://github.com/piharpi/jekyll-klise/releases/tag/1.0.1
