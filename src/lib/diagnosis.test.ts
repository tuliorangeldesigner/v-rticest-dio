import test from 'node:test';
import assert from 'node:assert/strict';
import { getDiagnosisSignals } from './diagnosis.ts';

test('prioritizes the three strongest diagnosis signals', () => {
  const signals = getDiagnosisSignals({
    challenge: 'posicionamento',
    goal: 'mais-clientes',
    presence: 'visual-inconsistente',
    service: 'identidade-visual',
  });

  assert.deepEqual(signals.map(({ key }) => key), ['posicionamento', 'conversao', 'percepcao']);
});

test('does not return duplicate or more than three signals', () => {
  const signals = getDiagnosisSignals({
    challenge: 'site-nao-converte',
    goal: 'mais-clientes',
    presence: 'site-desatualizado',
    service: 'site',
  });

  assert.equal(signals.length, 3);
  assert.equal(new Set(signals.map(({ key }) => key)).size, signals.length);
});
