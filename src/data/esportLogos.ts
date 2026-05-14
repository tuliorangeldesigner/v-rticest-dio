const esportLogoModules = import.meta.glob('/imagens/Logos e-sport/*.webp', {
  eager: true,
  import: 'default',
  query: '?url',
});

const getLogoNumber = (path: string) => {
  const match = path.match(/\((\d+)\)/);
  return match ? Number(match[1]) : 0;
};

export const esportLogos = Object.entries(esportLogoModules)
  .map(([path, src]) => ({
    id: `esport-logo-${getLogoNumber(path)}`,
    title: `Logo E-sport ${String(getLogoNumber(path)).padStart(2, '0')}`,
    src: src as string,
    fileName: path.split('/').pop() || path,
  }))
  .sort((a, b) => getLogoNumber(a.fileName) - getLogoNumber(b.fileName));

