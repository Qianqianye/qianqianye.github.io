# Qianqian Ye Website

[qianqian-ye.com](https://qianqian-ye.com/) — built with [Astro](https://astro.build), deployed to GitHub Pages by `.github/workflows/deploy.yml`.

## Develop

```bash
npm install
npm run dev      # local dev server at http://localhost:4321
npm run build    # build to dist/
npm run preview  # serve the built site
```

## Add or edit a project

Each project is one Markdown file in `src/content/projects/`. The file name becomes the URL:
`src/content/projects/braiding-rage.md` → `/braiding-rage.html`.

```md
---
title: "Braiding Rage 怒辫"
year: "2022"                      # shown under the title on the project page
category: "3D"                    # shown on the homepage card
thumbnail: "braiding-rage-logo.jpg"  # file name in src/assets/thumbnails/
order: 170                        # homepage position, lower = earlier
hidden: true                      # optional: hide from homepage (page still exists)
cardTitle: "Short Title"          # optional: different title on the homepage card
link: "https://example.com"       # optional: card links here, no project page is built
---

Project description in the left column. [Links look like this](https://example.com).

#### Info

Time: 2022\
Location: Los Angeles

<!-- media -->

Everything below the media line goes in the right column.

![](/images/art/braiding-rage/braiding-rage-dtla.jpg)

<iframe class="wide" src="https://player.vimeo.com/video/123" frameborder="0" allowfullscreen></iframe>
```

- Each `#### Heading` above the media line becomes its own box in the left column.
- End a line with `\` to force a line break; leave a blank line for a new paragraph.
- Thumbnails go in `src/assets/thumbnails/`. Astro resizes them and converts them to WebP (GIFs stay animated) at build time, so you can drop in the original file.
- Project page images go in `public/images/` and are referenced starting with `/images/`.
- Embedded videos (`<iframe>`) take `class="wide"` (16:9), `"square"` (1:1) or `"vertical"` (portrait) to keep their proportions.

## Add an experiment

Experiments (the Experiment page) are listed in `src/content/experiments.yaml`, in the order they appear on the page. For example, at the top:

```yaml
- year: 2025
  title: "Sketch title"
  tools: "p5.js"
  thumbnail: "my-sketch.gif"   # file name in src/assets/experiments/
  url: "https://editor.p5js.org/..."
```

Tiles appear in the same order as the file. The 2016–2018 sketches live in the [Everyday repo](https://github.com/Qianqianye/Everyday); their `day` field is the sketch number and isn't shown.

## Structure

- `src/content/projects/` — one Markdown file per project
- `src/content/bio.md` — the short bio on the homepage
- `src/content/experiments.yaml` — the list on the Experiment page
- `src/styles/tokens.css` — grid, font, sizes and colors used by every page
- `src/styles/base.css` — base element styles (body, links, images)
- `src/pages/[slug].astro` — template for every project page
- `src/pages/index.astro` — homepage: bio + project grid
- `src/pages/archive.astro` — every project, including hidden ones
- `src/pages/experiment.astro` — Experiment page, built from experiments.yaml
- `src/pages/about.astro`, `teaching.astro` — other pages
- `src/layouts/BaseLayout.astro` — `<head>`, meta/social tags, header and footer for every page
- `src/components/Header.astro` — name, nav, social links (edit once, applies everywhere)
- `public/` — static files copied as-is (images, CNAME, robots.txt)
