#!/usr/bin/env node
/**
 * Validates static/registry.json products against static/schemas/product.schema.json
 */

import fs from 'node:fs';
import path from 'node:path';

import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const ROOT = path.resolve(import.meta.dirname, '..');
const registryPath = path.join(ROOT, 'static', 'registry.json');
const schemaPath = path.join(ROOT, 'static', 'schemas', 'product.schema.json');

const registryRaw = fs.readFileSync(registryPath, 'utf8');
const registry = JSON.parse(registryRaw);

const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));

const ajv = new Ajv2020({
  strict: false,
  allErrors: true,
});

addFormats(ajv);
const validate = ajv.compile(schema);

const errors = [];

if (!registry || typeof registry !== 'object') {
  errors.push('registry.json: root must be an object.');
} else {
  if (registry.version !== '1.0.0') {
    errors.push(`registry.json: unexpected version '${registry.version}' (expected 1.0.0)`);
  }
  if (
    registry.canonical_url !== 'https://build.trilemma.foundation/registry.json'
  ) {
    errors.push('registry.json: canonical_url mismatch (expected canonical build URL).');
  }
  if (
    registry.description !==
    'Machine-readable registry of Trilemma and external microproducts.'
  ) {
    errors.push('registry.json: description must match canonical copy.');
  }
  if (!Array.isArray(registry.products)) {
    errors.push('registry.json: products must be an array.');
  } else {
    for (const [i, product] of registry.products.entries()) {
      if (!validate(product)) {
        const msg = validate.errors
          ?.map((e) => `${e.instancePath || '/'} ${e.message}`)
          .join('; ');
        errors.push(`registry.json: products[${i}] failed schema: ${msg}`);
      }
    }
  }
}

if (errors.length > 0) {
  console.error('Registry validation failed:\n');
  for (const e of errors) {
    console.error(`- ${e}`);
  }
  process.exit(1);
}

console.log('Registry validation passed.');
