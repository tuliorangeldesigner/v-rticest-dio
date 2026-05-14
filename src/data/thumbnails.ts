const thumbnailModules = import.meta.glob('/imagens/thumbs/*.webp', {
  eager: true,
  import: 'default',
  query: '?url',
});

const getThumbNumber = (path: string) => {
  const match = path.match(/\((\d+)\)/);
  return match ? Number(match[1]) : 0;
};

const getThumbGroup = (path: string) => {
  const fileName = path.split('/').pop() || path;
  const match = fileName.match(/^([a-zA-Z]+\d*)/);
  return match ? match[1] : 'thumb';
};

export const thumbnails = Object.entries(thumbnailModules)
  .map(([path, src]) => ({
    id: `${getThumbGroup(path)}-${getThumbNumber(path)}`,
    title: `Thumbnail ${getThumbGroup(path).replace('thumb', '') || '1'}-${String(getThumbNumber(path)).padStart(2, '0')}`,
    src: src as string,
    fileName: path.split('/').pop() || path,
  }))
  .sort((a, b) =>
    getThumbGroup(a.fileName).localeCompare(getThumbGroup(b.fileName), 'pt-BR', { numeric: true }) ||
    getThumbNumber(a.fileName) - getThumbNumber(b.fileName)
  );
