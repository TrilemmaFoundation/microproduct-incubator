/**
 * Canonical registry.json root fields enforced by validate-registry.mjs.
 * When updating static/registry.json marketing copy or URLs, update this module in the same change.
 */
export const EXPECTED_REGISTRY_ROOT = {
  version: '1.0.0',
  canonical_url: 'https://build.trilemma.foundation/registry.json',
  description: 'Machine-readable registry of Trilemma and external microproducts.',
};
