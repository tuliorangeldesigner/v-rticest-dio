export type ConversionEvent = 'whatsapp_click' | 'form_submit' | 'diagnosis_complete';

export const trackConversion = (name: ConversionEvent) => {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('tr-conversion', { detail: { name } }));
};
