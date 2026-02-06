# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal academic portfolio website for Étienne Compérat built with **Quarto**, a scientific and technical publishing framework. The site is deployed to GitHub Pages and showcases research interests, education, coursework, and CV.

## Essential Commands

### Build & Preview
```bash
# Render the entire site (outputs to docs/)
quarto render

# Live preview with auto-reload
quarto preview

# Render a single page
quarto render index.qmd
```

### Deployment
The site deploys to GitHub Pages automatically from the `docs/` directory. After making changes:
1. Run `quarto render` to rebuild
2. Commit both source files (.qmd) and output (docs/)
3. Push to GitHub

## Architecture

### Source Files
- **`.qmd` files** (Quarto Markdown): Source content with YAML front matter
  - [index.qmd](index.qmd) - Home page with profile and affiliations
  - [cv.qmd](cv.qmd) - Curriculum vitae
  - [courses.qmd](courses.qmd) - Graduate coursework listings
  - [coursework.qmd](coursework.qmd) - Past assignments
  - [projects.qmd](projects.qmd) - Project portfolio
  - [contact.qmd](contact.qmd) - Contact page (currently in draft mode)

### Configuration
- [_quarto.yml](_quarto.yml) - Main project configuration
  - Defines navigation structure (navbar with dropdowns)
  - Specifies pages to render
  - Sets theme (`jollia`) and custom CSS
  - Output directory: `docs/`

### Styling System
[styles.css](styles.css) implements a custom design on top of the Quarto theme:
- **Brand color**: `#c45607` (warm orange)
- **Custom CSS classes** for semantic content:
  - `.inst-item`, `.inst-logo`, `.inst-text` - Institution affiliations with logos
  - `.cv-supervisor`, `.cv-details`, `.cv-advisors` - CV formatting
  - `.course-*` classes - Course listing layouts with interactive elements
  - Body classes: `home-compact`, `coursework-compact`, `courses-page` - Page-specific styling

### Assets
- [img/](img/) - Logos and images (copied to docs/img/ on build)
- [pdf/](pdf/) - Academic papers and resume PDFs (copied to docs/pdf/ on build)

### Output
- `docs/` - Generated static HTML site (committed to Git for GitHub Pages)
- `.quarto/` - Build cache (gitignored, auto-generated)

## Content Structure

### Page Anatomy
Each `.qmd` file has:
1. **YAML front matter** (between `---` markers)
   - `title`, `subtitle`, `image` for page metadata
   - `about` configuration for homepage template
   - `format` options (body-classes, toc, page-layout)
2. **Markdown content** with embedded HTML divs for custom styling
3. **Custom div classes** for styled components (e.g., `:::{.inst-item}`)

### Navigation
Defined in [_quarto.yml](_quarto.yml:13-23):
- Home
- Coursework (dropdown)
  - Past Assignments → coursework.qmd
  - Courses → courses.qmd
- CV → cv.qmd

## Common Modifications

### Adding a new page
1. Create `newpage.qmd` with YAML front matter
2. Add to [_quarto.yml](_quarto.yml:4-8) render list
3. Add to [_quarto.yml](_quarto.yml:13-23) navbar
4. Run `quarto render`

### Updating content
1. Edit the relevant `.qmd` file
2. Run `quarto render` to rebuild
3. Check `docs/` for output

### Styling changes
1. Modify [styles.css](styles.css)
2. Run `quarto render` to apply changes
3. Custom classes should follow existing patterns (`.inst-*`, `.course-*`, `.cv-*`)

### Adding assets
- Images: Add to [img/](img/), reference as `img/filename.png` in .qmd files
- PDFs: Add to [pdf/](pdf/), reference as `pdf/filename.pdf` in .qmd files
- Quarto automatically copies these to `docs/` on render

## Technical Notes

- **No build dependencies**: Quarto handles everything (no npm, no package.json)
- **Git tracking**: Both source (.qmd) and output (docs/) are committed
- **Theme**: Built on Quarto's `jollia` theme with extensive CSS overrides
- **Interactive elements**: Some course pages use hover effects and collapsible sections via CSS transitions
- **Responsive**: Quarto handles responsive layouts; custom CSS adjusts for different page types
