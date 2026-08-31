import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getCarouselPreloadBatches,
  getCarouselPreloadIndexes,
  getWrappedIndex,
} from './carouselIndex.ts';

test('moves to the next and previous carousel index', () => {
  assert.equal(getWrappedIndex(2, 1, 6), 3);
  assert.equal(getWrappedIndex(2, -1, 6), 1);
});

test('wraps at both ends of the carousel', () => {
  assert.equal(getWrappedIndex(5, 1, 6), 0);
  assert.equal(getWrappedIndex(0, -1, 6), 5);
});

test('prioritizes adjacent carousel images before the remaining gallery', () => {
  assert.deepEqual(getCarouselPreloadIndexes(2, 6), [3, 1, 4, 5, 0]);
  assert.deepEqual(getCarouselPreloadIndexes(0, 3), [1, 2]);
});

test('separates adjacent images from background carousel preloading', () => {
  assert.deepEqual(getCarouselPreloadBatches(2, 6), {
    priority: [3, 1],
    background: [4, 5, 0],
  });
  assert.deepEqual(getCarouselPreloadBatches(0, 1), {
    priority: [],
    background: [],
  });
});
