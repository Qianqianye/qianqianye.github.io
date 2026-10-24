# Qianqian Ye Website

[qianqian-ye.com](https://qianqian-ye.com/) — built with [Astro](https://astro.build), deployed to GitHub Pages by `.github/workflows/deploy.yml`.

## Develop

```bash
npm install
npm run dev      # local dev server at http://localhost:4321
npm run build    # build to dist/
npm run preview  # serve the built site
```

## Structure

- `src/layouts/BaseLayout.astro` — `<head>`, meta/social tags, header and footer for every page
- `src/components/Header.astro` — name, nav, social links (edit once, applies everywhere)
- `src/pages/` — Astro pages
- `public/` — static files copied as-is (CSS, images, CNAME, and legacy `.html` pages not yet migrated)
