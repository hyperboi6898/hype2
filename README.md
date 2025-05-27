# Hyperliquid Vietnam Website

A modern, responsive website for the Hyperliquid Vietnam community built with Jekyll. This site provides information, tutorials, and resources about Hyperliquid for Vietnamese users.

## Project Overview

This project was converted from a static HTML/CSS/JS website to a Jekyll-based static site generator workflow. The site features a clean design, blog functionality, and integration with Sveltia CMS (formerly Netlify CMS) for content management.

## Technology Stack

- **Static Site Generator**: Jekyll 4.3
- **CSS Preprocessor**: Dart Sass (jekyll-sass-converter 2.2)
- **Content Management**: Sveltia CMS (admin interface)
- **Deployment**: Cloudflare Pages
- **Version Control**: Git/GitHub

## Project Structure

```
hype2/
├── _config.yml                # Jekyll configuration
├── Gemfile                    # Ruby dependencies
├── _layouts/                  # Layout templates
│   ├── default.html           # Main site layout
│   └── blog.html              # Blog post layout with comments and view counter
├── _includes/                 # Reusable components
├── _plugins/                  # Custom Jekyll plugins
│   └── referral_filter.rb     # Plugin for Hyperliquid referral links
├── _sass/                     # SCSS partials
│   ├── _base.scss             # Base styles and variables
│   ├── _layout.scss           # Layout styles
│   └── components/            # Component styles
│       ├── _buttons.scss       # Button styles
│       ├── _card.scss          # Card styles
│       └── _blog.scss          # Blog-specific styles
├── assets/                    # Asset files
│   └── css/                   # Compiled CSS
│       └── main.scss           # Main SCSS file that imports all partials
├── cloudflare/                # Cloudflare resources
│   └── worker/                # Cloudflare Worker for view counter
│       ├── index.js             # Worker script
│       └── wrangler.toml        # Worker configuration
├── content/                   # Content collections directory
│   ├── _blog/                 # Blog posts (markdown)
│   └── _news/                 # News articles (markdown)
├── css/                       # Legacy stylesheets (kept for reference)
├── js/                        # JavaScript files
│   └── main.js                # Main site functionality
├── uploads/                   # Uploaded images
├── admin/                     # CMS configuration
│   ├── config.yml             # Sveltia CMS config
│   └── index.html             # CMS admin interface
├── blog/                      # Blog index page
│   └── index.html             # Blog listing template
└── index.html                 # Homepage
```

## Key Features

- Responsive design that works on mobile, tablet, and desktop
- Blog system with categorization and tagging
- Content management through Sveltia CMS
- Fast loading times with static site generation
- SEO-friendly URLs and metadata
- Organized SCSS architecture with partials for better maintainability
- Giscus comments system integrated with GitHub Discussions
- Page view counter using Cloudflare Workers and KV storage
- Automatic referral link generation for Hyperliquid URLs
- Open Graph image generation for better social media sharing
- Sitemap and RSS feed generation for improved SEO

## Issues Fixed

### 1. Jekyll Collection Structure

**Problem**: Jekyll wasn't recognizing content files in the blog directory.

**Solution**: 
- Renamed collection folders to use underscore prefix (`content/blog` → `content/_blog`)
- Added `collections_dir: content` in `_config.yml`
- Updated CMS configuration to point to the new folder paths

### 2. CSS Processing Issues

**Problem**: CSS files were being served with incorrect MIME types (text/html instead of text/css).

**Solution**:
- Converted CSS files to SCSS with proper Jekyll front matter
- Added minimal front matter (`---\n---`) to ensure Jekyll processes them correctly
- This ensures files are served with the correct MIME type

### 3. JavaScript Animation Errors

**Problem**: JavaScript was trying to add CSS rules dynamically but failing due to stylesheet loading issues.

**Solution**:
- Rewrote the animation code to be more robust
- Added proper error handling and stylesheet detection
- Implemented a delay to ensure stylesheets are fully loaded

### 4. Layout and Styling Issues

**Problem**: Content was left-aligned and images weren't displaying correctly.

**Solution**:
- Added proper container structure with centered content
- Improved image styling with appropriate max-width and responsive behavior
- Enhanced blog post card styling for better readability

### 5. Referral Link Integration

**Problem**: Links to Hyperliquid needed to include a referral code.

**Solution**:
- Updated all CTAs and links to use the format `https://app.hyperliquid.xyz/join/VN84`
- Added prominent CTAs in blog posts
- Ensured consistent referral tracking across the site

## Local Development

### Prerequisites

- Ruby 3.0+
- Bundler

### Setup

1. Clone the repository
   ```
   git clone https://github.com/hyperboi6898/hype2.git
   cd hype2
   ```

2. Install dependencies
   ```
   bundle install
   ```

3. Run the development server
   ```
   bundle exec jekyll serve
   ```

4. Visit http://localhost:4000 in your browser

## Deployment

The site is automatically deployed to Cloudflare Pages when changes are pushed to the master branch.

### Cloudflare Pages Settings

- **Build command**: `bundle exec jekyll build`
- **Output directory**: `_site`
- **Environment variables**:
  - `JEKYLL_ENV=production`

## Content Management

Content can be managed through the Sveltia CMS interface at `/admin/`. The CMS is configured to:

- Create and edit blog posts in the `content/_blog` directory
- Handle image uploads to the `uploads` directory
- Properly format filenames and slugs for SEO

## Advanced Features

### SCSS Architecture

The CSS is organized using a modular SCSS architecture with partials:

- `_base.scss`: Contains variables, reset styles, and typography
- `_layout.scss`: Contains header, footer, and page structure styles
- `components/_buttons.scss`: Button styles
- `components/_card.scss`: Card and feature box styles
- `components/_blog.scss`: Blog-specific styles

All partials are imported in `assets/css/main.scss` and compiled by Jekyll with compression enabled.

### Giscus Comments

The blog uses Giscus for comments, which integrates with GitHub Discussions:

- Comments are stored in GitHub Discussions
- Uses the dark theme to match the site design
- Configured with Vietnamese language support
- Automatically maps comments to posts based on pathname

### Page View Counter

Page views are tracked using a Cloudflare Worker and KV storage:

- Worker deployed at `https://view-counter.hyperboi6898.workers.dev`
- Uses KV namespace for persistent storage
- Displays view count on each blog post
- Implements CORS for cross-origin requests

### Referral Link System

A custom Jekyll plugin (`referral_filter.rb`) provides consistent referral links:

- Use `{{ "/trade" | link_to_hl }}` in templates to generate proper referral URLs
- Automatically adds the referral code `VN84` to all Hyperliquid links
- Ensures consistent linking throughout the site

### SEO Optimization

SEO is enhanced with several Jekyll plugins:

- `jekyll-seo-tag`: Adds meta tags for search engines and social media
- `jekyll-sitemap`: Generates a sitemap.xml file
- `jekyll-feed`: Creates an RSS feed
- `jekyll-og-image`: Generates Open Graph images for social sharing

## License

This project is for the Hyperliquid Vietnam community and is not an official Hyperliquid website.
