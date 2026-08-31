import assert from 'node:assert/strict';
import test from 'node:test';
import { getWhatsAppLink } from './whatsapp.ts';
import { trackConversion } from './conversion.ts';

test('creates a contextual WhatsApp link', () => {
  assert.match(getWhatsAppLink('Quero criar um site'), /Quero%20criar%20um%20site/);
});

test('tracks a conversion without requiring analytics to be installed', () => {
  assert.doesNotThrow(() => trackConversion('whatsapp_click'));
});
