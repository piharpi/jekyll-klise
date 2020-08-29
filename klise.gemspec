# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name     = "klise"
  spec.version  = "1.0.1"
  spec.authors  = ["Mahendrata Harpi"]
  spec.email    = ["justharpi@gmail.com"]

  spec.summary  = "🏖 Klisé is a minimalist Jekyll theme for running a personal site or blog, light & dark mode support."
  spec.homepage = "https://github.com/piharpi/jekyll-klise"
  spec.license  = "MIT"

  spec.metadata["plugin_type"] = "theme"
  spec.files = `git ls-files -z`.split("\x0").select do |f|
    f.match(%r{^(_(includes|layouts|sass)/|(assets|LICENSE|README)((\.(txt|md|markdown|yml)|$)))}i)
  end

  spec.add_runtime_dependency "jekyll", "~> 4.1"
  spec.add_runtime_dependency 'jekyll-feed', '~> 0.13'
  spec.add_runtime_dependency 'jekyll-sitemap', '~> 1.4'
  spec.add_runtime_dependency 'jekyll-compose', '~> 0.12.0'
  spec.add_runtime_dependency 'jekyll-postfiles', '~> 3.1'

  spec.add_development_dependency "bundler", "~> 2.1"
end
