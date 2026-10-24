import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One Markdown file per project in src/content/projects/.
// The file name becomes the page URL: braiding-rage.md → /braiding-rage.html
const projects = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/projects',
    // Keep the file name as-is (e.g. AAG.md → /AAG.html) instead of lowercasing it
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    // Shown under the title on the project page, e.g. "2023, ongoing"
    year: z.string().optional(),
    // Homepage card
    cardTitle: z.string().optional(), // only if the card should show a different title
    category: z.string().optional(),
    thumbnail: z.string().optional(),
    // Position on the homepage: lower numbers come first
    order: z.number().default(999),
    // true = not shown on the homepage (the project page still exists)
    hidden: z.boolean().default(false),
    // Card links to this URL instead of a project page (no page is built)
    link: z.string().url().optional(),
  }),
});

export const collections = { projects };
