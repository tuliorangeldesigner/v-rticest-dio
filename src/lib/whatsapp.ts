export const WHATSAPP_PHONE = '5541987448273';

export const DEFAULT_WHATSAPP_MESSAGE =
  'Olá! Vim pelo site da Vértice Studio e quero solicitar um diagnóstico da minha marca.';

export const getWhatsAppLink = (message: string = DEFAULT_WHATSAPP_MESSAGE) =>
  `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;

