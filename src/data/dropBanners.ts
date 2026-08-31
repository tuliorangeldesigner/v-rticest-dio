const dropBannerModules = import.meta.glob('/imagens/drop/*/*.{webp,png,jpg,jpeg,avif}', {
  eager: true,
  import: 'default',
  query: '?url',
}) as Record<string, string>;

const groupDefinitions = [
  { slug: 'homestyle', title: 'Homestyle' },
  { slug: 'nex', title: 'Nex' },
  { slug: 'panda', title: 'Panda' },
  { slug: 'levshop', title: 'Levshop' },
  { slug: 'bebe', title: 'Bebê' },
  { slug: 'streetware', title: 'Streetware' },
  { slug: 'wave', title: 'Wave' },
] as const;

const coverFileByGroup: Partial<Record<(typeof groupDefinitions)[number]['slug'], string>> = {
  homestyle: '5.webp',
  nex: '13.webp',
  bebe: '16.webp',
  streetware: 'SW (2).webp',
};

export const dropBannerGroups = groupDefinitions.map((group) => {
  const images = Object.entries(dropBannerModules)
    .filter(([path]) => path.includes(`/imagens/drop/${group.slug}/`))
    .map(([path, src]) => ({
      src,
      fileName: path.split('/').pop() ?? 'banner',
    }))
    .sort((a, b) => a.fileName.localeCompare(b.fileName, undefined, { numeric: true }));

  const cover = images.find((image) => image.fileName === coverFileByGroup[group.slug]) ?? images[0];

  return { ...group, images, cover: cover ?? images[0] };
});

export const dropBannerCount = dropBannerGroups.reduce((total, group) => total + group.images.length, 0);

// Mantém o contrato usado pela vitrine geral de projetos.
export const dropBanners = dropBannerGroups.flatMap((group) =>
  group.images.map((image, index) => ({
    id: `${group.slug}-${index + 1}`,
    title: `${group.title} ${index + 1}`,
    ...image,
  })),
);
