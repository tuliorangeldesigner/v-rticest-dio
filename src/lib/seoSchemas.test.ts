import assert from 'node:assert/strict';
import test from 'node:test';
import { createFaqPageSchema } from './seoSchemas.ts';

test('creates a valid FAQPage schema from visible questions and answers', () => {
  const schema = createFaqPageSchema([
    {
      question: 'Quanto tempo leva para criar um site?',
      answer: 'O prazo depende do escopo e começa com um diagnóstico.',
    },
  ]);

  assert.equal(schema['@context'], 'https://schema.org');
  assert.equal(schema['@type'], 'FAQPage');
  assert.deepEqual(schema.mainEntity, [
    {
      '@type': 'Question',
      name: 'Quanto tempo leva para criar um site?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O prazo depende do escopo e começa com um diagnóstico.',
      },
    },
  ]);
});
