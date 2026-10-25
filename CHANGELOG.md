# Changelog

All notable changes to this project are documented in this file.

## [1.1.0] - 2026-10-25

### Added
- Follow the OS color scheme (`prefers-color-scheme`) by default when the
  visitor has not picked a theme, and keep following it live until they do (#95).
- GitHub Actions CI that builds the site on every push and pull request.
- `webrick` as a runtime dependency so the theme works out of the box on
  Ruby 3+ (#69).
- `package.json` pinning Node.js to `24.x` for Vercel (its build image no
  longer supports the previously detected Node 16.x).

### Removed
- Legacy `now.json`, migrated to `vercel.json`.

### Changed
- Bump Jekyll `~> 4.1` → `~> 4.4` and `jekyll-feed` `~> 0.13` → `~> 0.18`.
- Tags page is now sorted alphabetically (#37).

### Fixed
- Tag anchors on the tags page are slugified so links from a post
  (`/tags/#{slug}`) land on the correct section.
- Removed a duplicate `id="results-container"` emitted inside a loop on the
  tags page (invalid HTML).

[1.1.0]: https://github.com/piharpi/jekyll-klise/releases/tag/v1.1.0
