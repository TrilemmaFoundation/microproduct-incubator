import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { SITE_URL } from '@site/siteUrl';
import { useEffect, useMemo, useState } from 'react';
import type { RegistryManifest } from '../types/registry';
import type { ProductStatus } from '../types/registry';
import {
  collectTags,
  filterProducts,
  maturityLevelLabel,
  PRODUCT_STATUSES,
} from '../utils/registryPresentation';
import {
  CommandBlock,
  MetadataPill,
  PageSection,
} from '../components/ControlSurface';

/** Keep in sync with static/registry.json `description` and scripts/registryRootExpectations.mjs */
const REGISTRY_LAYOUT_FALLBACK_DESCRIPTION =
  'Machine-readable registry of Trilemma and external microproducts.';

export default function RegistryPage() {
  const registryJsonUrl = useBaseUrl('/registry.json');
  const [manifest, setManifest] = useState<RegistryManifest | null>(null);
  const [loadError, setLoadError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<ProductStatus | 'all'>('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setLoadError(null);

    void fetch(registryJsonUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load registry (${response.status})`);
        }
        return response.json() as Promise<RegistryManifest>;
      })
      .then((data) => {
        if (!cancelled) {
          setManifest(data);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setLoadError(err instanceof Error ? err : new Error(String(err)));
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [registryJsonUrl]);

  const products = manifest?.products ?? [];

  const filtered = useMemo(
    () => filterProducts(products, status, query),
    [products, status, query],
  );
  const tagBank = useMemo(() => collectTags(products), [products]);
  const machineArtifactSummary = `registry: ${SITE_URL}/registry.json\nschema: ${SITE_URL}/schemas/product.schema.json`;

  const layoutDescription = manifest?.description ?? REGISTRY_LAYOUT_FALLBACK_DESCRIPTION;

  return (
    <Layout title="Registry" description={layoutDescription}>
      <main className="bt-shell">
        <div className="bt-page">
          {loadError ? (
            <p className="alert alert--danger" role="alert">
              Could not load the registry. {loadError.message}
            </p>
          ) : null}

          {loading ? (
            <PageSection
              eyebrow="Registry"
              title="Loading registry"
              description="Fetching the latest machine-readable product list."
              variant="hero"
            >
              <p className="bt-filter-copy">Please wait…</p>
            </PageSection>
          ) : null}

          {!loading && manifest ? (
            <>
              <PageSection
                eyebrow="Registry"
                title="Microproduct registry"
                description={manifest.description}
                variant="hero"
              >
                <div className="bt-registry-header-grid">
                  <div className="bt-filter-panel">
                    <div className="bt-filter-head">
                      <div>
                        <Heading as="h3" className="bt-filter-title">
                          Search and filter
                        </Heading>
                        <p className="bt-filter-copy">
                          Narrow results by status or search across name, tags, archetype, scope, and problem
                          statement.
                        </p>
                      </div>
                      <MetadataPill tone="accent">
                        {filtered.length} result{filtered.length === 1 ? '' : 's'}
                      </MetadataPill>
                    </div>
                    <div className="bt-filter-grid">
                      <label className="bt-field">
                        <span>Status</span>
                        <select
                          aria-label="Filter by status"
                          value={status}
                          onChange={(event) =>
                            setStatus(event.target.value as ProductStatus | 'all')
                          }
                        >
                          <option value="all">All statuses</option>
                          {PRODUCT_STATUSES.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label className="bt-field bt-fieldWide">
                        <span>Search registry</span>
                        <input
                          aria-label="Search registry"
                          placeholder="Search tags, names, archetypes, or problems"
                          value={query}
                          onChange={(event) => setQuery(event.target.value)}
                        />
                      </label>
                    </div>
                    <div className="bt-filter-actions">
                      <button
                        type="button"
                        className="bt-secondary-button"
                        onClick={() => {
                          setStatus('all');
                          setQuery('');
                        }}
                      >
                        Reset filters
                      </button>
                      <p className="bt-filter-state">
                        {status === 'all' && !query
                          ? 'Showing the full registry.'
                          : `Showing ${filtered.length} filtered result${filtered.length === 1 ? '' : 's'}.`}
                      </p>
                    </div>
                    {tagBank.length > 0 && (
                      <div className="bt-tag-bank">
                        {tagBank.map((value) => (
                          <button
                            type="button"
                            key={value}
                            className="bt-chip-button"
                            onClick={() => setQuery(value)}
                          >
                            {value}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <CommandBlock
                    label="Machine-readable endpoints"
                    value={machineArtifactSummary}
                    language="text"
                  />
                </div>
              </PageSection>

              <section className="bt-registry-grid" aria-label="Registry results">
                {filtered.map((product) => (
                  <article key={product.id} className="bt-registry-card">
                    <div className="bt-registry-cardHeader">
                      <div>
                        <Heading as="h2" id={product.id} className="bt-registry-name">
                          {product.name}
                        </Heading>
                        <p className="bt-registry-meta">{product.id}</p>
                      </div>
                      <div className="bt-inline-pills bt-inline-pillsCompact">
                        <MetadataPill tone="accent">{product.status}</MetadataPill>
                        <MetadataPill>{product.scope}</MetadataPill>
                        <MetadataPill>{product.archetype}</MetadataPill>
                      </div>
                    </div>
                    <p className="bt-registry-problem">{product.problem}</p>
                    <div className="bt-registry-detailGrid">
                      <div>
                        <span className="bt-registry-label">Primary decision</span>
                        <p>{product.primary_decision}</p>
                      </div>
                      <div>
                        <span className="bt-registry-label">Maturity</span>
                        <p>
                          {product.maturity} ({maturityLevelLabel(product.maturity)}
                          {product.maturity_label ? ` · ${product.maturity_label}` : ''})
                        </p>
                      </div>
                    </div>
                    <div className="bt-inline-pills bt-inline-pillsCompact">
                      {product.tags.map((token) => (
                        <MetadataPill key={token}>{token}</MetadataPill>
                      ))}
                    </div>
                    <div className="bt-registry-links">
                      {product.repo ? (
                        <Link href={product.repo} rel="noreferrer noopener">
                          Repo
                        </Link>
                      ) : null}
                      {product.site ? (
                        <Link href={product.site} rel="noreferrer noopener">
                          Site
                        </Link>
                      ) : null}
                      {product.docs ? (
                        <Link href={product.docs} rel="noreferrer noopener">
                          Docs
                        </Link>
                      ) : null}
                      {product.agent_entrypoint ? (
                        <Link href={product.agent_entrypoint}>Agent entrypoint</Link>
                      ) : null}
                    </div>
                  </article>
                ))}
              </section>

              {filtered.length === 0 && (
                <p className="alert alert--warning">No entries match those filters.</p>
              )}
            </>
          ) : null}
        </div>
      </main>
    </Layout>
  );
}
