export type DiagnosisInput = {
  challenge: string;
  goal: string;
  presence: string;
  service: string;
};

export type DiagnosisSignal = {
  key: 'posicionamento' | 'conversao' | 'percepcao' | 'presenca' | 'clareza';
  title: string;
  description: string;
};

const signals: Record<DiagnosisSignal['key'], Omit<DiagnosisSignal, 'key'>> = {
  posicionamento: {
    title: 'Posicionamento pouco claro',
    description: 'A proposta pode não estar deixando evidente por que escolher sua empresa.',
  },
  conversao: {
    title: 'Caminho de conversão frágil',
    description: 'Há sinais de atrito entre despertar interesse e transformar atenção em contato.',
  },
  percepcao: {
    title: 'Percepção visual abaixo do potencial',
    description: 'A apresentação pode não comunicar o nível de qualidade que sua entrega possui.',
  },
  presenca: {
    title: 'Presença digital desconectada',
    description: 'Os pontos de contato podem estar funcionando sem uma direção única e consistente.',
  },
  clareza: {
    title: 'Oferta difícil de compreender',
    description: 'Serviços, benefícios e próximo passo podem precisar de uma hierarquia mais objetiva.',
  },
};

const priority: DiagnosisSignal['key'][] = ['posicionamento', 'conversao', 'percepcao', 'presenca', 'clareza'];

export const getDiagnosisSignals = (input: DiagnosisInput): DiagnosisSignal[] => {
  const score = new Map<DiagnosisSignal['key'], number>();
  const add = (key: DiagnosisSignal['key'], value: number) => score.set(key, (score.get(key) ?? 0) + value);

  if (input.challenge === 'posicionamento') add('posicionamento', 4);
  if (input.challenge === 'site-nao-converte') add('conversao', 4);
  if (input.challenge === 'visual-amador') add('percepcao', 4);
  if (input.challenge === 'comunicacao-confusa') add('clareza', 4);
  if (input.challenge === 'presenca-desconectada') add('presenca', 4);

  if (input.goal === 'mais-clientes') add('conversao', 3);
  if (input.goal === 'mais-autoridade') add('posicionamento', 3);
  if (input.goal === 'parecer-profissional') add('percepcao', 3);
  if (input.goal === 'organizar-presenca') add('presenca', 3);

  if (input.presence === 'visual-inconsistente') add('percepcao', 2);
  if (input.presence === 'site-desatualizado') add('presenca', 2);
  if (input.presence === 'oferta-confusa') add('clareza', 2);

  if (input.service === 'identidade-visual') add('percepcao', 1);
  if (input.service === 'site') add('presenca', 1);
  if (input.service === 'estrategia') add('posicionamento', 1);

  return priority
    .map((key, index) => ({ key, points: score.get(key) ?? 0, index }))
    .sort((a, b) => b.points - a.points || a.index - b.index)
    .slice(0, 3)
    .map(({ key }) => ({ key, ...signals[key] }));
};

export const formatDiagnosisSignals = (input: DiagnosisInput) =>
  getDiagnosisSignals(input).map((signal, index) => `${index + 1}. ${signal.title}: ${signal.description}`).join('\n');
