import type { RegistryProduct } from '../../types/registry';
import {
  collectTags,
  filterProducts,
  maturityLevelLabel,
} from '../registryPresentation';

const sampleProducts: RegistryProduct[] = [
  {
    id: 'a',
    name: 'A',
    status: 'prototype',
    maturity: 2,
    scope: 'community',
    archetype: 'workflow-automation-product',
    problem: 'p',
    target_users: ['u'],
    primary_decision: 'd',
    inputs: [],
    outputs: [],
    tags: ['alpha', 'beta'],
  },
  {
    id: 'b',
    name: 'B',
    status: 'archived',
    maturity: 8,
    scope: 'external',
    archetype: 'alerting-monitoring-product',
    problem: 'p',
    target_users: ['u'],
    primary_decision: 'd',
    inputs: [],
    outputs: [],
    tags: ['gamma'],
  },
];

describe('registryPresentation helpers', () => {
  it('maps maturity levels', () => {
    expect(maturityLevelLabel(0)).toBe('Idea');
    expect(maturityLevelLabel(9)).toBe('Level 9');
  });

  it('filters by status and broad search queries', () => {
    expect(filterProducts(sampleProducts, 'all', '').length).toBe(2);
    expect(filterProducts(sampleProducts, 'prototype', '').length).toBe(1);
    expect(filterProducts(sampleProducts, 'all', 'beta').length).toBe(1);
    expect(filterProducts(sampleProducts, 'all', 'workflow').length).toBe(1);
    expect(filterProducts(sampleProducts, 'all', '')).toEqual(sampleProducts);
  });

  it('aggregates sorted tags uniquely', () => {
    expect(collectTags(sampleProducts)).toEqual(['alpha', 'beta', 'gamma']);
  });
});
