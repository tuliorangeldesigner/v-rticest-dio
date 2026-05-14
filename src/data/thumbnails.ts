const thumbnailModules = import.meta.glob('/imagens/thumbs/*.webp', {
  eager: true,
  import: 'default',
  query: '?url',
});

const getThumbNumber = (path: string) => {
  const match = path.match(/\((\d+)\)/);
  return match ? Number(match[1]) : 0;
};

export const thumbnails = Object.entries(thumbnailModules)
  .map(([path, src]) => ({
    id: `thumb-${getThumbNumber(path)}`,
    title: `Thumbnail ${String(getThumbNumber(path)).padStart(2, '0')}`,
    src: src as string,
    fileName: path.split('/').pop() || path,
  }))
  .sort((a, b) => getThumbNumber(a.fileName) - getThumbNumber(b.fileName));

