import Layout from '@theme/Layout';
import { SITE_URL } from '@site/siteUrl';
import {
  ActionCard,
  CommandBlock,
  MetadataPill,
  PageSection,
} from '../components/ControlSurface';

export default function SchemasPage() {
  const schemaUrl = `${SITE_URL}/schemas/product.schema.json`;
  const registryUrl = `${SITE_URL}/registry.json`;
  const samplePayload = `{
  "id": "stackingsats",
  "name": "StackingSats",
  "status": "active",
  "maturity": 5,
  "scope": "trilemma",
  "archetype": "workflow-automation-product",
  "problem": "Turn recurring bitcoin workflows into reliable operational decisions.",
  "target_users": ["operators"],
  "primary_decision": "Which workflow should run now?",
  "inputs": ["events", "portfolio state"],
  "outputs": ["actions", "alerts"],
  "tags": ["bitcoin", "automation"]
}`;

  return (
    <Layout
      title="Schemas"
      description="Machine-readable schemas for Build Trilemma registry metadata."
    >
      <main className="bt-shell">
        <div className="bt-page">
          <PageSection
            eyebrow="Schemas"
            title="Registry contracts and validation commands"
            description="Schemas live under static/schemas so they are mirrored to the site root on every deployment. Treat this page as the operational reference for agents and maintainers."
            variant="hero"
          >
            <div className="bt-inline-pills">
              <MetadataPill tone="accent">JSON Schema draft 2020-12</MetadataPill>
              <MetadataPill>Static artifact</MetadataPill>
              <MetadataPill>Validation in CI</MetadataPill>
            </div>
            <div className="bt-two-column-grid">
              <ActionCard
                title="Canonical artifacts"
                description="The schema and registry stay available at stable URLs so build tooling can rely on them."
                actions={[
                  {
                    label: 'product.schema.json',
                    href: schemaUrl,
                    description: 'Canonical registry metadata contract.',
                    copyValue: schemaUrl,
                  },
                  {
                    label: 'registry.json',
                    href: registryUrl,
                    description: 'Current published registry manifest.',
                    copyValue: registryUrl,
                  },
                ]}
              />
              <CommandBlock
                label="Validation command"
                value="npm run validate:registry"
                language="bash"
              />
            </div>
          </PageSection>

          <PageSection
            eyebrow="Sample Payload"
            title="Use the schema with realistic metadata"
            description="This example stays intentionally compact so it can be copied into a draft and adapted to a real product."
          >
            <CommandBlock label="Example registry entry" value={samplePayload} language="json" />
          </PageSection>

          <PageSection
            eyebrow="Common Mistakes"
            title="What usually breaks validation"
          >
            <div className="bt-summary-grid">
              <article className="bt-summary-card">
                <h3>Canonical copy drift</h3>
                <p>Do not change the registry root version, canonical URL, or description unless the validation script is updated intentionally.</p>
              </article>
              <article className="bt-summary-card">
                <h3>YAML and JSON mismatch</h3>
                <p>Keep local product metadata aligned with the published JSON entry so reviewers and agents see the same contract.</p>
              </article>
              <article className="bt-summary-card">
                <h3>Weak field completeness</h3>
                <p>Missing decision context, empty arrays, or unclear tags make the product harder to discover even when the file shape passes.</p>
              </article>
            </div>
          </PageSection>
        </div>
      </main>
    </Layout>
  );
}
