import logo01 from '/imagens/Logos e-sport/Logos1 (1).webp?url';
import logo02 from '/imagens/Logos e-sport/Logos1 (2).webp?url';
import logo03 from '/imagens/Logos e-sport/Logos1 (3).webp?url';
import logo04 from '/imagens/Logos e-sport/Logos1 (4).webp?url';
import logo05 from '/imagens/Logos e-sport/Logos1 (5).webp?url';
import logo06 from '/imagens/Logos e-sport/Logos1 (6).webp?url';
import logo07 from '/imagens/Logos e-sport/Logos1 (7).webp?url';
import logo08 from '/imagens/Logos e-sport/Logos1 (8).webp?url';
import logo09 from '/imagens/Logos e-sport/Logos1 (9).webp?url';
import logo10 from '/imagens/Logos e-sport/Logos1 (10).webp?url';
import logo11 from '/imagens/Logos e-sport/Logos1 (11).webp?url';
import logo12 from '/imagens/Logos e-sport/Logos1e-(12) copiar.webp?url';
import logo13 from '/imagens/Logos e-sport/Logos1 (13).webp?url';
import logo14 from '/imagens/Logos e-sport/YHGY copiar.webp?url';
import logo15 from '/imagens/Logos e-sport/Logos1 (15).webp?url';

const logoFiles = [
  [1, 'Logos1 (1).webp', logo01],
  [2, 'Logos1 (2).webp', logo02],
  [3, 'Logos1 (3).webp', logo03],
  [4, 'Logos1 (4).webp', logo04],
  [5, 'Logos1 (5).webp', logo05],
  [6, 'Logos1 (6).webp', logo06],
  [7, 'Logos1 (7).webp', logo07],
  [8, 'Logos1 (8).webp', logo08],
  [9, 'Logos1 (9).webp', logo09],
  [10, 'Logos1 (10).webp', logo10],
  [11, 'Logos1 (11).webp', logo11],
  [12, 'Logos1e-(12) copiar.webp', logo12],
  [13, 'Logos1 (13).webp', logo13],
  [14, 'YHGY copiar.webp', logo14],
  [15, 'Logos1 (15).webp', logo15],
] as const;

export const esportLogos = logoFiles.map(([number, fileName, src]) => ({
  id: `esport-logo-${number}`,
  title: `Logo E-sport ${String(number).padStart(2, '0')}`,
  src,
  fileName,
}));
