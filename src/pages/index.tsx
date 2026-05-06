import Layout from '@theme/Layout';
import Hero from '../components/Hero';

export default function Home() {
  return (
    <Layout
      title="Build Trilemma"
      description="Discover patterns, scaffold microproducts, and validate submissions — for humans and AI agents."
    >
      <Hero
        title="Build Microproducts"
        description="The AI-agent control panel for microproducts: archetypes to lean on, standards to uphold, starters to fork, registries bots can ingest, and playbooks teammates can audit."
        actions={[
          { label: 'Registry', to: '/registry' },
          { label: 'Agents', to: '/agents' },
          { label: 'Build', to: '/build' },
          { label: 'Standards', to: '/standards' },
        ]}
      />
    </Layout>
  );
}
