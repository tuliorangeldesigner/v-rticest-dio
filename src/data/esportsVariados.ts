const esportsVariadosModules = import.meta.glob('/imagens/e-sports variados/*.webp', {
  eager: true,
  import: 'default',
  query: '?url',
}) as Record<string, string>;

const getSortParts = (fileName: string) =>
  fileName
    .replace('.webp', '')
    .match(/\d+/g)
    ?.map(Number) ?? [0];

export const esportsVariados = Object.entries(esportsVariadosModules)
  .map(([path, src]) => {
    const fileName = path.split('/').pop() ?? 'e-sports.webp';
    return {
      path,
      src,
      fileName,
      sortParts: getSortParts(fileName),
    };
  })
  .sort((a, b) => {
    const [aGroup = 0, aIndex = 0] = a.sortParts;
    const [bGroup = 0, bIndex = 0] = b.sortParts;
    return aGroup - bGroup || aIndex - bIndex || a.fileName.localeCompare(b.fileName);
  })
  .map(({ src, fileName }, index) => ({
    id: `esports-variados-${index + 1}`,
    title: `Projeto E-sports Variados ${String(index + 1).padStart(2, '0')}`,
    src,
    fileName,
  }));
