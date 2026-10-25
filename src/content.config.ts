import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { parse as parseYaml } from 'yaml';

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

// Everyday coding experiments, listed in src/content/experiments.yaml.
// Each sketch still lives in the Everyday repo; this list drives the Experiment page.
const experiments = defineCollection({
  loader: file('src/content/experiments.yaml', {
    // ID from the Everyday day number, or the title for newer sketches.
    // `position` keeps the order of the file on the page.
    parser: (text) =>
      parseYaml(text).map((entry: { day?: number; title: string }, position: number) => ({
        id: entry.day ? `day-${entry.day}` : entry.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        position,
        ...entry,
      })),
  }),
  schema: z.object({
    day: z.number().optional(), // Everyday sketch number (2016–2018 only)
    position: z.number(),
    year: z.number(),
    title: z.string(),
    tools: z.string(),
    thumbnail: z.string(), // file name in src/assets/experiments/
    url: z.string().url(),
  }),
});

export const collections = { projects, experiments };
