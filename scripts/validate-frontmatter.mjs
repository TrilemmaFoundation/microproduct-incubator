import fs from 'node:fs';
import path from 'node:path';

const docsRoot = path.resolve('docs');
const requiredFields = ['title', 'description', 'tags', 'last_reviewed'];
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

const errors = [];

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }
    if (entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.mdx'))) {
      validateFile(fullPath);
    }
  }
}

function extractFrontmatter(content) {
  if (!content.startsWith('---\n')) {
    return null;
  }
  const endIndex = content.indexOf('\n---\n', 4);
  if (endIndex === -1) {
    return null;
  }
  return content.slice(4, endIndex);
}

function hasField(frontmatter, field) {
  const pattern = new RegExp(`^${field}:`, 'm');
  return pattern.test(frontmatter);
}

function validateFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const frontmatter = extractFrontmatter(raw);

  if (!frontmatter) {
    errors.push(`${filePath}: missing frontmatter block`);
    return;
  }

  for (const field of requiredFields) {
    if (!hasField(frontmatter, field)) {
      errors.push(`${filePath}: missing required frontmatter field '${field}'`);
    }
  }

  const dateMatch = frontmatter.match(/^last_reviewed:\s*(.+)$/m);
  if (!dateMatch) {
    errors.push(`${filePath}: missing last_reviewed value`);
  } else {
    const value = dateMatch[1].trim().replace(/^['"]|['"]$/g, '');
    if (!dateRegex.test(value)) {
      errors.push(`${filePath}: invalid last_reviewed format '${value}', expected YYYY-MM-DD`);
    }
  }
}

function validateShowcaseTable() {
  const showcasePath = path.resolve('docs/showcase/microproducts.md');
  if (!fs.existsSync(showcasePath)) {
    errors.push('docs/showcase/microproducts.md: file is missing');
    return;
  }

  const content = fs.readFileSync(showcasePath, 'utf8');
  const expected = '| Name | Problem | Solution | Stage | Link | Maintainer |';

  if (!content.includes(expected)) {
    errors.push(
      `${showcasePath}: table header must be exactly '${expected}'`,
    );
  }
}

if (!fs.existsSync(docsRoot)) {
  errors.push('docs directory does not exist');
} else {
  walk(docsRoot);
}

validateShowcaseTable();

if (errors.length > 0) {
  console.error('Frontmatter validation failed:\n');
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log('Frontmatter validation passed.');
