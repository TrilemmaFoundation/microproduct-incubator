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

const manifest = registryManifest as RegistryManifest;

export default function RegistryPage() {
  const [status, setStatus] = useState<ProductStatus | 'all'>('all');
  const [tag, setTag] = useState('');
  const filtered = useMemo(
    () => filterProducts(manifest.products, status, tag),
    [status, tag],
  );
  const tagBank = useMemo(() => collectTags(manifest.products), []);

  return (
    <Layout title="Registry" description={manifest.description}>
      <main className="container margin-vert--lg markdown">
        <Heading as="h1">Microproduct registry</Heading>
        <p>{manifest.description}</p>
        <p>
          Machine-readable source:{' '}
          <a href={`${SITE_URL}/registry.json`}>registry.json</a>
          {' · '}
          Schema reference:{' '}
          <a href={`${SITE_URL}/schemas/product.schema.json`}>product.schema.json</a>
        </p>

        <div className="margin-bottom--md" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          <label>
            Status&nbsp;
            <select
              aria-label="Filter by status"
              className="margin-left--xs"
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
          <label>
            Tag contains&nbsp;
            <input
              aria-label="Filter by tag substring"
              className="margin-left--xs"
              placeholder="e.g. bitcoin"
              value={tag}
              onChange={(event) => setTag(event.target.value)}
            />
          </label>
        </div>

        {tagBank.length > 0 && (
          <p className="text--secondary">
            Quick tag bank:{' '}
            {tagBank.map((value) => (
              <button
                type="button"
                key={value}
                className="badge badge--secondary margin-right--xs"
                onClick={() => setTag(value)}
              >
                {value}
              </button>
            ))}
          </p>
        )}

        <div className="margin-top--lg">
          {filtered.map((product) => (
            <article key={product.id} className="card margin-bottom--md">
              <div className="card__body">
                <Heading as="h2" id={product.id}>
                  {product.name}
                </Heading>
                <p className="text--muted text--italic">
                  {product.id} · {product.archetype} · {product.scope}
                </p>
                <p>
                  <strong>Problem:</strong> {product.problem}
                </p>
                <p>
                  <strong>Primary decision:</strong> {product.primary_decision}
                </p>
                <p>
                  <strong>Status:</strong> {product.status} ·{' '}
                  <strong>Maturity:</strong> {product.maturity} (
                  {maturityLevelLabel(product.maturity)}
                  {product.maturity_label ? ` · ${product.maturity_label}` : ''})
                </p>
                <p>
                  <strong>Target users:</strong> {product.target_users.join(', ')}
                </p>
                <p>
                  <strong>Inputs:</strong> {product.inputs.join(', ')}
                </p>
                <p>
                  <strong>Outputs:</strong> {product.outputs.join(', ')}
                </p>
                <p>
                  <strong>Tags:</strong>{' '}
                  {product.tags.map((token) => (
                    <span key={token} className="badge badge--primary margin-right--xs">
                      {token}
                    </span>
                  ))}
                </p>
                <ul>
                  {product.repo && (
                    <li>
                      Repo:{' '}
                      <Link href={product.repo} rel="noreferrer noopener">
                        {product.repo}
                      </Link>
                    </li>
                  )}
                  {product.site && (
                    <li>
                      Site:{' '}
                      <Link href={product.site} rel="noreferrer noopener">
                        {product.site}
                      </Link>
                    </li>
                  )}
                  {product.docs && (
                    <li>
                      Docs:{' '}
                      <Link href={product.docs} rel="noreferrer noopener">
                        {product.docs}
                      </Link>
                    </li>
                  )}
                  {product.agent_entrypoint && (
                    <li>
                      Agent instructions:{' '}
                      <Link href={product.agent_entrypoint}>{product.agent_entrypoint}</Link>
                    </li>
                  )}
                </ul>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="alert alert--warning">No entries match those filters.</p>
        )}
      </main>
    </Layout>
  );
}
