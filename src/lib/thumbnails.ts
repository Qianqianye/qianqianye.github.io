import type { ImageMetadata } from 'astro';

// Every file in src/assets/thumbnails/, keyed by file name.
// A project's `thumbnail:` field is just the file name, e.g. "dmdm-logo.gif".
const files = import.meta.glob<{ default: ImageMetadata }>('/src/assets/thumbnails/*', {
  eager: true,
});

const thumbnails = new Map(
  Object.entries(files).map(([path, mod]) => [path.split('/').pop()!, mod.default]),
);

export function getThumbnail(name: string): ImageMetadata {
  const image = thumbnails.get(name);
  if (!image) {
    throw new Error(`Thumbnail "${name}" not found. Put the file in src/assets/thumbnails/.`);
  }
  return image;
}
