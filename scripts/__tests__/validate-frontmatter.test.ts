import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const validatorScript = path.resolve(process.cwd(), 'scripts/validate-frontmatter.mjs');

function writeFile(root: string, filePath: string, content: string) {
  const fullPath = path.join(root, filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content, 'utf8');
}

function baseTemplate(frontmatterBody: string) {
  return `---\n${frontmatterBody}\n---\n\nBody\n`;
}

function setupFixture(missionFrontmatter: string) {
  const fixtureDir = fs.mkdtempSync(path.join(os.tmpdir(), 'frontmatter-validator-'));

  writeFile(
    fixtureDir,
    'docs/core/intro/mission.md',
    baseTemplate(missionFrontmatter),
  );

  writeFile(
    fixtureDir,
    'docs/showcase/microproducts.md',
    `${baseTemplate(
      [
        'title: Microproducts Showcase',
        'description: Community-maintained table of microproducts being built.',
        'slug: /',
        'last_reviewed: 2026-03-04',
      ].join('\n'),
    )}\n| Name | Description | Team | Link |\n| --- | --- | --- | --- |\n`,
  );

  writeFile(
    fixtureDir,
    'templates/playbook-module.md',
    baseTemplate(
      [
        'title: Playbook Module',
        'description: Template entry',
        'last_reviewed: 2026-03-05',
      ].join('\n'),
    ),
  );

  return fixtureDir;
}

function runValidator(cwd: string) {
  return spawnSync('node', [validatorScript], {
    cwd,
    encoding: 'utf8',
  });
}

describe('validate-frontmatter tags handling', () => {
  it('passes when tags are missing', () => {
    const fixtureDir = setupFixture(
      [
        'title: Mission',
        'description: Why this open knowledge hub exists and what success looks like.',
        'last_reviewed: 2026-03-04',
      ].join('\n'),
    );

    const result = runValidator(fixtureDir);
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('Frontmatter validation passed.');
    fs.rmSync(fixtureDir, { recursive: true, force: true });
  });

  it('passes with inline tags list', () => {
    const fixtureDir = setupFixture(
      [
        'title: Mission',
        'description: Why this open knowledge hub exists and what success looks like.',
        'tags: [intro, mission]',
        'last_reviewed: 2026-03-04',
      ].join('\n'),
    );

    const result = runValidator(fixtureDir);
    expect(result.status).toBe(0);
    fs.rmSync(fixtureDir, { recursive: true, force: true });
  });

  it('passes with block-list tags', () => {
    const fixtureDir = setupFixture(
      [
        'title: Mission',
        'description: Why this open knowledge hub exists and what success looks like.',
        'tags:',
        '  - intro',
        '  - mission',
        'last_reviewed: 2026-03-04',
      ].join('\n'),
    );

    const result = runValidator(fixtureDir);
    expect(result.status).toBe(0);
    fs.rmSync(fixtureDir, { recursive: true, force: true });
  });

  it('fails when tags are not a list', () => {
    const fixtureDir = setupFixture(
      [
        'title: Mission',
        'description: Why this open knowledge hub exists and what success looks like.',
        'tags: mission',
        'last_reviewed: 2026-03-04',
      ].join('\n'),
    );

    const result = runValidator(fixtureDir);
    expect(result.status).toBe(1);
    expect(result.stderr).toContain('tags must be a YAML list of strings');
    fs.rmSync(fixtureDir, { recursive: true, force: true });
  });

  it('fails when tags list contains non-string values', () => {
    const fixtureDir = setupFixture(
      [
        'title: Mission',
        'description: Why this open knowledge hub exists and what success looks like.',
        'tags: [intro, 123]',
        'last_reviewed: 2026-03-04',
      ].join('\n'),
    );

    const result = runValidator(fixtureDir);
    expect(result.status).toBe(1);
    expect(result.stderr).toContain('tags must contain only string values');
    fs.rmSync(fixtureDir, { recursive: true, force: true });
  });
});
