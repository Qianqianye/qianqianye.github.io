import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://qianqian-ye.com',
  // Output about.html instead of about/index.html so existing URLs keep working
  build: { format: 'file' },
  trailingSlash: 'never',
  // Keep whitespace as written: minifying drops spaces between words and inline links
  compressHTML: false,
  // Generates sitemap-index.xml on every build, with the same .html URLs the pages use
  integrations: [
    sitemap({
      serialize(item) {
        const url = new URL(item.url);
        if (url.pathname !== '/' && !url.pathname.endsWith('.html')) url.pathname += '.html';
        return { ...item, url: url.href };
      },
    }),
  ],
});
