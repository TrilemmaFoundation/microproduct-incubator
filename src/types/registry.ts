export type ProductStatus =
  | 'idea'
  | 'spec'
  | 'prototype'
  | 'mvp'
  | 'showcase'
  | 'active'
  | 'archived';

export type ProductScope = 'trilemma' | 'external' | 'community';

export interface RegistryProduct {
  id: string;
  name: string;
  status: ProductStatus;
  maturity: number;
  maturity_label?: string;
  scope: ProductScope;
  archetype: string;
  category?: string;
  problem: string;
  target_users: string[];
  primary_decision: string;
  inputs: string[];
  outputs: string[];
  repo?: string;
  site?: string;
  docs?: string;
  agent_entrypoint?: string;
  tags: string[];
}

export interface RegistryManifest {
  version: string;
  canonical_url: string;
  description: string;
  products: RegistryProduct[];
}
