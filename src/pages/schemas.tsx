import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import { SITE_URL } from '@site/siteUrl';

export default function SchemasPage() {
  const schemaUrl = `${SITE_URL}/schemas/product.schema.json`;

  return (
    <Layout
      title="Schemas"
      description="Machine-readable schemas for Build Trilemma registry metadata."
    >
      <main className="container margin-vert--lg markdown">
        <Heading as="h1">Schemas</Heading>
        <p>
          Schemas live inside <code>static/schemas</code> so they are mirrored to the site root on every
          deployment.
        </p>
        <ul>
          <li>
            <a href={schemaUrl}>Product metadata (JSON Schema draft 2020-12)</a>
          </li>
        </ul>
        <Heading as="h2">Usage notes</Heading>
        <p>
          Combine the schema with CI validation (see <code>scripts/validate-registry.mjs</code>) and keep
          YAML + JSON metadata synchronized.
        </p>
      </main>
    </Layout>
  );
}
