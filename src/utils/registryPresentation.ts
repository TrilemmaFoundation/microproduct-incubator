import type { ProductStatus, RegistryProduct } from '../types/registry';

export const PRODUCT_STATUSES: ProductStatus[] = [
  'idea',
  'spec',
  'prototype',
  'mvp',
  'showcase',
  'active',
  'archived',
];

/** Level → label aligned with [/standards/maturity-model](/standards/maturity-model). */
export function maturityLevelLabel(level: number): string {
  const labels: Record<number, string> = {
    0: 'Idea',
    1: 'Spec',
    2: 'Prototype',
    3: 'MVP',
    4: 'Showcase',
    5: 'Maintained product',
  };

  return labels[level] ?? `Level ${level}`;
}

export function filterProducts(
  products: RegistryProduct[],
  status: ProductStatus | 'all',
  query: string,
): RegistryProduct[] {
  const normalizedQuery = query.trim().toLowerCase();

  return products.filter((product) => {
    if (status !== 'all' && product.status !== status) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    const searchableFields = [
      product.id,
      product.name,
      product.archetype,
      product.scope,
      product.problem,
      product.primary_decision,
      ...product.tags,
    ];

    return searchableFields.some((field) =>
      field.toLowerCase().includes(normalizedQuery),
    );
  });
}

export function collectTags(products: RegistryProduct[]): string[] {
  const tagSet = new Set<string>();

  for (const product of products) {
    for (const tag of product.tags) {
      tagSet.add(tag);
    }
  }

  return [...tagSet].sort((a, b) => a.localeCompare(b, 'en'));
}
