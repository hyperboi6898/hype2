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
│   └── blog.html              # Blog post layout
├── _includes/                 # Reusable components
├── content/                   # Content collections directory
│   ├── _blog/                 # Blog posts (markdown)
│   └── _news/                 # News articles (markdown)
├── css/                       # Stylesheets
│   ├── blog.scss              # Blog-specific styles
│   └── styles.scss            # Main site styles
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

## License

This project is for the Hyperliquid Vietnam community and is not an official Hyperliquid website.
