import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';

export default function BuildPage() {
  return (
    <Layout
      title="Build workspace"
      description="Guided scaffolding path for shipping a microproduct via Build Trilemma."
    >
      <main className="container margin-vert--lg markdown">
        <Heading as="h1">Build workspace (MVP)</Heading>
        <p>
          Full interactive wizard is roadmap; today this page routes you through the same sequence
          humans and agents follow in the handbook.
        </p>
        <ol>
          <li>
            Anchor the problem statement and user in{' '}
            <Link to="/standards/folder-contract">folder contract</Link> documents.
          </li>
          <li>
            Pick the closest <Link to="/archetypes">archetype pattern</Link>.
          </li>
          <li>
            Clone one of the starters from <Link to="/templates">templates</Link> (`product-templates/` in
            GitHub).
          </li>
          <li>
            Validate metadata against <Link to="/schemas">JSON schema</Link>, then register outcomes in{' '}
            <Link to="/registry">Registry</Link>.
          </li>
        </ol>
        <Heading as="h2">Need agent instructions?</Heading>
        <p>
          Jump to <Link to="/agents">Agents hub</Link> for `/AGENTS.md`, `llms-full.txt`, and schema
          shortcuts.
        </p>
      </main>
    </Layout>
  );
}
