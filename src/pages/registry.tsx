import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import { SITE_URL } from '@site/siteUrl';
import { useMemo, useState } from 'react';
import registryManifest from '@site/static/registry.json';
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

const manifest = registryManifest as RegistryManifest;

export default function RegistryPage() {
  const [status, setStatus] = useState<ProductStatus | 'all'>('all');
  const [query, setQuery] = useState('');
  const filtered = useMemo(
    () => filterProducts(manifest.products, status, query),
    [status, query],
  );
  const tagBank = useMemo(() => collectTags(manifest.products), []);
  const machineArtifactSummary = `registry: ${SITE_URL}/registry.json\nschema: ${SITE_URL}/schemas/product.schema.json`;

  return (
    <Layout title="Registry" description={manifest.description}>
      <main className="bt-shell">
        <div className="bt-page">
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
                      Narrow results by status or search across name, tags, archetype, scope, and problem statement.
                    </p>
                  </div>
                  <MetadataPill tone="accent">{filtered.length} result{filtered.length === 1 ? '' : 's'}</MetadataPill>
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
        </div>
      </main>
    </Layout>
  );
}
