export const getWrappedIndex = (current: number, delta: number, length: number) =>
  length > 0 ? (current + delta + length) % length : 0;

export const getCarouselPreloadIndexes = (current: number, length: number) => {
  if (length <= 1) return [];

  const adjacent = [
    getWrappedIndex(current, 1, length),
    getWrappedIndex(current, -1, length),
  ];
  const remaining = Array.from({ length }, (_, offset) =>
    getWrappedIndex(current, offset + 2, length)
  );

  return [...new Set([...adjacent, ...remaining])].filter((index) => index !== current);
};

export const getCarouselPreloadBatches = (current: number, length: number) => {
  const orderedIndexes = getCarouselPreloadIndexes(current, length);

  return {
    priority: orderedIndexes.slice(0, Math.min(2, length - 1)),
    background: orderedIndexes.slice(Math.min(2, length - 1)),
  };
};
