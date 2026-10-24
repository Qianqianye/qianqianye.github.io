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
thumbnail: "/images/art/braiding-rage/braiding-rage-logo.jpg"
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

<iframe class="test-test" src="https://player.vimeo.com/video/123" frameborder="0" allowfullscreen></iframe>
```

- Each `#### Heading` above the media line becomes its own box in the left column.
- End a line with `\` to force a line break; leave a blank line for a new paragraph.
- Images go in `public/images/` and are referenced starting with `/images/`.

## Structure

- `src/content/projects/` — one Markdown file per project
- `src/pages/[slug].astro` — template for every project page
- `src/pages/index.astro` — homepage grid, built from the projects
- `src/pages/about.astro`, `teaching.astro`, `archive.astro` — other pages
- `src/layouts/BaseLayout.astro` — `<head>`, meta/social tags, header and footer for every page
- `src/components/Header.astro` — name, nav, social links (edit once, applies everywhere)
- `public/` — static files copied as-is (CSS, images, CNAME)
