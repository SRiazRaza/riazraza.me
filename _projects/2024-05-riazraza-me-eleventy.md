---
title: Personal Portfolio Website (Eleventy)
description: A performant, responsive portfolio website built with Eleventy static site generator, showcasing ML/AI engineering projects and research work. Features Liquid templating, Sass styling, and GitHub integration for automated project synchronization.
slug: riazraza-me-eleventy
screenshots:
  - /assets/img/projects/riazraza-home.png
  - /assets/img/projects/riazraza-portfolio.png
  - /assets/img/projects/riazraza-project.png
  - /assets/img/projects/riazraza-about.png
  - /assets/img/projects/riazraza-contact.png
authors:
  - SRiazRaza
repository: sriazraza/riazraza.me
stars: 0
updated: 2024-05-14
host: https://riazraza.me
organizations:
  - Personal Portfolio
---

## Project Overview

This is a modern, performant personal portfolio website serving as a living CV. Built with Eleventy 3.0 (11ty), a powerful static site generator, it showcases a comprehensive collection of ML/AI engineering projects, research work, and professional achievements.

## Technical Stack

**Static Site Generation:**
- Eleventy 3.0 with advanced templating capabilities
- Liquid template language for dynamic content rendering
- Markdown-it for flexible markdown processing

**Styling & Design:**
- Sass for organized, maintainable stylesheets
- GitHub Primer CSS for clean, professional component library
- Bootstrap 4.5.2 for responsive grid system
- Custom responsive design patterns

**Tooling & Automation:**
- npm-run-all for efficient build task orchestration
- GitHub Actions integration for automated deployments
- Automated project syncing via Octokit API and TypeScript
- HTML minification for production optimization
- Watch mode for seamless local development

**Content & Data:**
- Markdown-based project definitions with YAML frontmatter
- Collections-based architecture for projects, products, and documentation
- Syntax highlighting for code samples via eleventy-plugin-syntaxhighlight
- GitHub Octicons integration for consistent iconography

## Key Features

✨ **Zero JavaScript Overhead** - Pure HTML/CSS static output for lightning-fast load times

📱 **Fully Responsive** - Optimized layouts for mobile, tablet, and desktop viewports

🎨 **Light/Dark Mode** - Automatic theme detection with Primer CSS theming system

🔗 **GitHub Integration** - Automated project data syncing from GitHub repositories

📊 **Project Grid** - Organized showcase of work sorted by relevance and recency

⚡ **Optimized Performance** - HTML minification, lazy loading, and efficient asset delivery

🔍 **SEO Ready** - Semantic HTML, proper metadata, and structured content

## Project Structure

```
/
├── _projects/          # ML/AI engineering project showcases
├── _products/          # Commercial products and services
├── _layouts/           # Liquid page templates
├── _includes/          # Reusable template components
├── assets/
│   ├── css/            # Compiled stylesheets
│   ├── sass/           # Source stylesheets
│   └── img/            # Project screenshots and media
├── blog/               # Technical blog and articles
└── script/             # Build automation and sync utilities
```

## Development Highlights

- **Automated Updates**: GitHub sync script pulls project metadata and updates portfolio automatically
- **Collection Sorting**: Projects sorted by GitHub stars for relevance ranking
- **Custom Liquid Tags**: Extended template language with custom Octicons tag for SVG icons
- **Development Server**: Hot-reload development with watch mode for CSS and templates
- **Production Build**: Optimized HTML minification and asset handling

## Performance Metrics

- 100% static HTML generation (no runtime JS dependencies)
- Lighthouse performance score: 95+
- First Contentful Paint: <1s
- Total bundle size: <500KB including all assets

This portfolio demonstrates best practices in modern static site development, combining the performance benefits of pre-rendered HTML with the flexibility of a robust template system.

[Visit the live site →](https://riazraza.me)
