import Layout from '@theme/Layout';
import {
  ActionCard,
  MetadataPill,
  PageSection,
} from '../components/ControlSurface';
import UniversityMarquee from '../components/UniversityMarquee';

export default function Home() {
  return (
    <Layout
      title="Build Trilemma"
      description="Discover patterns, scaffold microproducts, and validate submissions — for humans and AI agents."
    >
      <main className="bt-shell">
        <div className="bt-page">
          <PageSection
            eyebrow="Start"
            title="Agent launchpad for building and auditing microproducts"
            description="Build Trilemma should feel operational the moment an agent or teammate lands here. Start with machine-readable artifacts, move into the build sequence, then branch into live patterns and standards."
            variant="hero"
          >
            <div className="bt-hero-grid">
              <ActionCard
                title="Start an agent"
                description="Use the canonical artifacts that agents need first: instructions, compressed context, registry metadata, and schema contracts."
                actions={[
                  {
                    label: 'AGENTS.md',
                    href: 'pathname:///AGENTS.md',
                    description: 'Root operating instructions for contributor agents.',
                    copyValue: '/AGENTS.md',
                  },
                  {
                    label: 'llms-full.txt',
                    href: 'pathname:///llms-full.txt',
                    description: 'Compressed long-form context bundle for LLM workflows.',
                    copyValue: '/llms-full.txt',
                  },
                  {
                    label: 'registry.json',
                    href: 'pathname:///registry.json',
                    description: 'Machine-readable microproduct index for discovery and tooling.',
                    copyValue: '/registry.json',
                  },
                  {
                    label: 'product.schema.json',
                    href: 'pathname:///schemas/product.schema.json',
                    description: 'Canonical registry contract mirrored from static schemas.',
                    copyValue: '/schemas/product.schema.json',
                  },
                ]}
                aside={
                  <div className="bt-inline-pills">
                    <MetadataPill tone="accent">AI-agent first</MetadataPill>
                    <MetadataPill>Machine-readable</MetadataPill>
                    <MetadataPill>Audit-friendly</MetadataPill>
                  </div>
                }
              />
              <ActionCard
                title="Ship a microproduct"
                description="Follow the same 4-step flow humans and agents use when turning an idea into a registry-ready product."
                actions={[
                  {
                    label: '1. Define the folder contract',
                    to: '/standards/folder-contract',
                    description: 'Anchor the problem statement, artifacts, and local agent instructions.',
                  },
                  {
                    label: '2. Pick an archetype',
                    to: '/archetypes',
                    description: 'Choose the nearest product pattern before implementation starts.',
                  },
                  {
                    label: '3. Clone a starter',
                    to: '/templates',
                    description: 'Fork the closest template from product-templates.',
                  },
                  {
                    label: '4. Validate and register',
                    to: '/build',
                    description: 'Run validation, review outputs, and publish registry metadata.',
                  },
                ]}
              />
              <ActionCard
                title="Browse live patterns"
                description="Jump directly into the most useful examples, references, and operating standards."
                actions={[
                  {
                    label: 'Registry',
                    to: '/registry',
                    description: 'Scan active products, maturity, and agent entrypoints.',
                  },
                  {
                    label: 'Archetypes',
                    to: '/archetypes',
                    description: 'Review recurring product shapes and decision patterns.',
                  },
                  {
                    label: 'Templates',
                    to: '/templates',
                    description: 'Open opinionated starters for common build paths.',
                  },
                ]}
                aside={
                  <div className="bt-secondary-links">
                    <a href="/standards">Standards</a>
                    <a href="/showcase">Showcase</a>
                    <a href="/contribute">Contribute</a>
                    <a href="/agents">Agents hub</a>
                  </div>
                }
              />
            </div>
          </PageSection>

          <PageSection
            eyebrow="Why This Exists"
            title="A control surface, not a thin marketing shell"
            description="The primary path is operational: artifacts to ingest, build steps to execute, and references to audit. Supporting docs still matter, but they should sit behind the work instead of replacing it."
          >
            <div className="bt-summary-grid">
              <article className="bt-summary-card">
                <h3>Operational by default</h3>
                <p>Commands, schemas, and registry endpoints are promoted above prose.</p>
              </article>
              <article className="bt-summary-card">
                <h3>Useful to agents and humans</h3>
                <p>Machine-readable assets stay canonical while pages remain reviewable and scannable.</p>
              </article>
              <article className="bt-summary-card">
                <h3>Built on the current stack</h3>
                <p>Docusaurus remains the frame; the upgrade is information hierarchy and interaction design.</p>
              </article>
            </div>
          </PageSection>
        </div>
        <UniversityMarquee />
      </main>
    </Layout>
  );
}
