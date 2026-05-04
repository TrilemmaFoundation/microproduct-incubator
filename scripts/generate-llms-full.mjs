#!/usr/bin/env node
/**
 * Concatenates key site sources into static/llms-full.txt deterministically (no timestamps).
 */

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUTPUT = path.join(ROOT, 'static', 'llms-full.txt');

function stripYamlFrontmatter(text) {
  if (!text.startsWith('---\n')) {
    return text.trim();
  }

  const end = text.indexOf('\n---\n', 4);
  if (end === -1) {
    return text.trim();
  }

  return text.slice(end + 5).trim();
}

/** @param {string} rel relative to ROOT */
function readRel(rel, label, transform = stripYamlFrontmatter) {
  const fp = path.join(ROOT, rel);
  const body = transform(fs.readFileSync(fp, 'utf8'));

  const header = `\n\n===== ${label} (${rel}) =====\n\n`;
  return `${header}${body}`;
}

const sources = [
  ['static/AGENTS.md', 'Agent instructions', stripYamlFrontmatter],
  ['static/llms.txt', 'Discovery file'],
  ['static/registry.json', 'Machine-readable registry'],
  ['static/schemas/product.schema.json', 'Product schema'],

  ['docs/core/intro/what-is-a-microproduct.md', 'Microproduct definition', stripYamlFrontmatter],
  ['docs/core/intro/mission.md', 'Mission', stripYamlFrontmatter],
  ['docs/templates/index.md', 'Templates overview', stripYamlFrontmatter],
  ['docs/agents/index.md', 'Agents hub', stripYamlFrontmatter],

  ['docs/archetypes/index.md', 'Archetypes overview', stripYamlFrontmatter],

  ['docs/contribute/how-to-contribute.md', 'Contribution workflow', stripYamlFrontmatter],

  ['docs/showcase/microproducts.md', 'Showcase summaries', stripYamlFrontmatter],

  ['docs/standards/folder-contract.md', 'Standard folder contract', stripYamlFrontmatter],
  ['docs/standards/maturity-model.md', 'Maturity model', stripYamlFrontmatter],
  ['docs/standards/what-counts-as-good.md', 'What counts as a good microproduct', stripYamlFrontmatter],
];

const archetypeIds = [
  'data-to-decision-tool',
  'ranking-recommendation-engine',
  'forecasting-product',
  'risk-scoring-product',
  'alerting-monitoring-product',
  'search-discovery-product',
  'benchmark-evaluation-product',
  'simulation-backtesting-product',
  'workflow-automation-product',
  'agentic-research-product',
];

for (const id of archetypeIds) {
  const rel = path.join('docs/archetypes', `${id}.md`);
  sources.push([rel, `Archetype: ${id}`, stripYamlFrontmatter]);
}

sources.sort(([a], [b]) => a.localeCompare(b, 'en'));

let out = `# Build Trilemma — llms-full compressed context\n\n`;
out += `# Canonical URL: https://build.trilemma.foundation\n`;
out +=
  '# Sources are concatenated in deterministic order.\nDo not rely on headings alone for citations—verify against the canonical site URLs.\n';

for (const [rel, label, transform] of sources) {
  out += readRel(rel, label, transform);
}

fs.writeFileSync(OUTPUT, `${out}\n`, 'utf8');
console.warn(`generate-llms-full: wrote ${path.relative(process.cwd(), OUTPUT)}`);
