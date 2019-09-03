# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "bangsring"
  spec.version       = "0.1.0"
  spec.authors       = ["piharpi"]
  spec.email         = ["justharpi@gmail.com"]

  spec.summary       = "🏖 Bangsring is minimalist Jekyll theme for running a personal site and blog."
  spec.homepage      = "https://github.com/piharpi/bangsring"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r!^(assets|_layouts|_includes|_sass|LICENSE|README)!i) }

  spec.add_runtime_dependency "jekyll", "~> 3.8"

  spec.add_development_dependency "jekyll-feed", "~> 0.11.0"
  spec.add_development_dependency "jekyll-sitemap"
  
  spec.add_development_dependency "bundler"
end
