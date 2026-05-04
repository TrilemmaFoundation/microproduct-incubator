# Robust implementation plan: Build Trilemma as the AI-agent control panel for microproducts

## Target positioning

**Canonical hostname**

```text
https://build.trilemma.foundation
```

**Core definition**

```text
Build Trilemma is the AI-agent control panel for building microproducts, inside or outside Trilemma Foundation.
```

**Expanded definition**

```text
Build Trilemma gives humans and AI agents one canonical place to discover microproduct patterns, select templates, read build instructions, generate project scaffolds, validate submissions, and ship focused data-driven tools.
```

The site should become both:

1. **Human-readable documentation**
2. **Agent-readable build infrastructure**

Not just docs. Not just a showcase. A build system control layer.

Sections **1–10** of this document are implemented in the repository (verified 2026-05-04).

---

# 1. Canonical site architecture

**Status: Implemented (2026-05-04).**

Recommended top-level structure:

```text
build.trilemma.foundation/
  /
  /build
  /agents
  /templates
  /registry
  /archetypes
  /standards
  /showcase
  /contribute
  /docs
  /schemas
  /api
  /AGENTS.md
  /llms.txt
  /llms-full.txt
  /registry.json
```

## Recommended navigation

```text
Build
Agents
Templates
Registry
Archetypes
Standards
Showcase
Contribute
```

## Page responsibilities

| Page             | Purpose                                               |
| ---------------- | ----------------------------------------------------- |
| `/`              | Explain what Build Trilemma is and route users/agents |
| `/build`         | Guided microproduct builder / wizard                  |
| `/agents`        | AI-agent instructions, prompts, workflows             |
| `/templates`     | Starter structures for microproducts                  |
| `/registry`      | Human-readable microproduct registry                  |
| `/registry.json` | Machine-readable microproduct registry                |
| `/archetypes`    | Common microproduct patterns                          |
| `/standards`     | What counts as a good microproduct                    |
| `/showcase`      | Finished/reference products                           |
| `/contribute`    | Submission and review workflow                        |
| `/schemas`       | JSON schemas for product metadata                     |
| `/AGENTS.md`     | Root agent instruction file                           |
| `/llms.txt`      | Lightweight AI discovery file                         |
| `/llms-full.txt` | Full compressed site context for LLMs                 |

---

# 2. Canonical config and redirect decision

**Status: Implemented (2026-05-04).**

Use:

```ts
const SITE_URL = "https://build.trilemma.foundation";
```

Apply consistently across:

```text
docusaurus.config.ts
sitemap
canonical metadata
OpenGraph links
absolute internal links
registry.json
AGENTS.md
llms.txt
llms-full.txt
product.yaml examples
```

Redirect:

```text
https://microproducts.trilemma.foundation/*
```

to:

```text
https://build.trilemma.foundation/*
```

Use **301 permanent redirects** once confident.

Before that, use temporary **302 redirects** during staging/testing.

---

# 3. Root `AGENTS.md`

**Status: Implemented (2026-05-04).**

Add this file at:

```text
/AGENTS.md
```

Purpose: give AI agents canonical build instructions.

Recommended content:

```md
# Build Trilemma — Agent Instructions

## Purpose

Build Trilemma is the AI-agent control panel for building microproducts, inside or outside Trilemma Foundation.

A microproduct is a focused software tool that turns data, models, workflows, or domain knowledge into usable utility for a specific user decision or task.

## Primary agent objective

Help users design, scaffold, build, validate, and improve microproducts using Trilemma's canonical standards, templates, schemas, and review workflows.

## What agents should do

When helping build a microproduct:

1. Identify the target user.
2. Identify the specific problem or decision.
3. Select the closest microproduct archetype.
4. Choose the appropriate template.
5. Generate or update the standard product files.
6. Keep scope narrow and shippable.
7. Prefer working software over speculative architecture.
8. Include tests, documentation, and evaluation criteria.
9. Validate against the product schema.
10. Prepare the project for human review.

## Canonical resources

- Product registry: /registry.json
- Templates: /templates
- Archetypes: /archetypes
- Standards: /standards
- Contribution guide: /contribute
- Product schema: /schemas/product.schema.json
- Full LLM context: /llms-full.txt

## Required microproduct files

Each microproduct should include:

- README.md
- AGENTS.md
- product.yaml
- product-brief.md
- architecture.md
- data-contract.md
- evaluation.md
- roadmap.md
- demo.md

## Good microproduct characteristics

A good microproduct:

- Solves one clear problem.
- Serves a clearly defined user.
- Produces a useful output.
- Can be explained quickly.
- Can be tested or evaluated.
- Is small enough to ship.
- Has a clear path from data/input to action/output.

## Bad microproduct characteristics

Avoid:

- Generic dashboards with no decision support.
- Broad platforms with unclear users.
- Unvalidated AI wrappers.
- Unstructured notebooks with no product path.
- Overbuilt architecture before a useful MVP exists.
- Hidden assumptions.
- Missing README, schema, or evaluation criteria.

## Build workflow

1. Read product.yaml.
2. Read product-brief.md.
3. Inspect the selected template.
4. Confirm the archetype.
5. Generate the minimum useful implementation.
6. Add or update tests.
7. Add demo instructions.
8. Validate metadata.
9. Summarize remaining gaps.

## Default implementation bias

Prefer:

- Simple architecture.
- Clear file structure.
- Typed interfaces.
- Reproducible setup.
- Observable outputs.
- Small PRs.
- Human-readable explanations.

Avoid:

- Premature microservices.
- Excessive dependencies.
- Unclear abstractions.
- Hidden API requirements.
- Non-reproducible notebooks.
- Vague "AI-powered" claims.
```

---

# 4. Add `llms.txt` and `llms-full.txt`

**Status: Implemented (2026-05-04).**

## `/llms.txt`

This should be short and directional.

```txt
# Build Trilemma

Build Trilemma is the AI-agent control panel for building microproducts, inside or outside Trilemma Foundation.

Canonical URL:
https://build.trilemma.foundation

Core resources:
- Agent instructions: /AGENTS.md
- Product registry: /registry.json
- Templates: /templates
- Archetypes: /archetypes
- Standards: /standards
- Contribution guide: /contribute
- Product schema: /schemas/product.schema.json
- Full context: /llms-full.txt

Primary task:
Help humans and AI agents design, scaffold, validate, and ship focused microproducts.

Microproduct definition:
A microproduct is a focused software tool that turns data, models, workflows, or domain knowledge into usable utility for a specific user decision or task.
```

## `/llms-full.txt`

This should be generated automatically at build time.

Include compressed text from:

```text
Homepage
What is a microproduct
Agent instructions
Templates
Archetypes
Standards
Contribution guide
Registry
Schemas
Showcase summaries
```

Add a script:

```text
scripts/generate-llms-full.ts
```

Output:

```text
static/llms-full.txt
```

This file should be deterministic and regenerated on every build.

---

# 5. Product registry

**Status: Implemented (2026-05-04).**

Add:

```text
/static/registry.json
/src/pages/registry.tsx
```

The JSON file should be the machine-readable source.

Example:

```json
{
  "version": "1.0.0",
  "canonical_url": "https://build.trilemma.foundation/registry.json",
  "description": "Machine-readable registry of Trilemma and external microproducts.",
  "products": [
    {
      "id": "stackingsats",
      "name": "Stacking Sats",
      "status": "active",
      "maturity": 5,
      "maturity_label": "maintained-product",
      "scope": "trilemma",
      "archetype": "simulation-backtesting-product",
      "category": "bitcoin-analytics",
      "problem": "Help users evaluate and improve Bitcoin accumulation strategies.",
      "target_users": [
        "bitcoin investors",
        "quant researchers",
        "student contributors"
      ],
      "primary_decision": "How should capital be allocated into Bitcoin over time?",
      "inputs": [
        "market data",
        "on-chain data",
        "strategy configuration"
      ],
      "outputs": [
        "backtest results",
        "strategy comparison",
        "accumulation metrics"
      ],
      "repo": "https://github.com/TrilemmaFoundation/Bitcoin-Analytics-Initiative",
      "site": "https://stackingsats.org",
      "docs": "https://stackingsats.org/docs",
      "agent_entrypoint": "https://build.trilemma.foundation/products/stackingsats/AGENTS.md",
      "tags": [
        "bitcoin",
        "backtesting",
        "analytics",
        "dca"
      ]
    }
  ]
}
```

## Required registry fields

| Field              | Required | Purpose                                          |
| ------------------ | -------: | ------------------------------------------------ |
| `id`               |      Yes | Stable product identifier                        |
| `name`             |      Yes | Human-readable name                              |
| `status`           |      Yes | idea/spec/prototype/mvp/showcase/active/archived |
| `maturity`         |      Yes | Numeric maturity level                           |
| `scope`            |      Yes | trilemma/external/community                      |
| `archetype`        |      Yes | Reusable product pattern                         |
| `problem`          |      Yes | Problem being solved                             |
| `target_users`     |      Yes | Who uses it                                      |
| `primary_decision` |      Yes | What decision/task it supports                   |
| `inputs`           |      Yes | Required data/input                              |
| `outputs`          |      Yes | User-facing output                               |
| `repo`             | Optional | GitHub/source repo                               |
| `site`             | Optional | Live product                                     |
| `docs`             | Optional | Documentation                                    |
| `agent_entrypoint` | Optional | Product-specific agent instructions              |
| `tags`             |      Yes | Search/filter                                    |

---

# 6. Product metadata schema

**Status: Implemented (2026-05-04).**

Add:

```text
/static/schemas/product.schema.json
```

Recommended schema:

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://build.trilemma.foundation/schemas/product.schema.json",
  "title": "Build Trilemma Product Metadata",
  "type": "object",
  "required": [
    "id",
    "name",
    "status",
    "maturity",
    "scope",
    "archetype",
    "problem",
    "target_users",
    "primary_decision",
    "inputs",
    "outputs",
    "tags"
  ],
  "properties": {
    "id": {
      "type": "string",
      "pattern": "^[a-z0-9-]+$"
    },
    "name": {
      "type": "string"
    },
    "status": {
      "type": "string",
      "enum": [
        "idea",
        "spec",
        "prototype",
        "mvp",
        "showcase",
        "active",
        "archived"
      ]
    },
    "maturity": {
      "type": "integer",
      "minimum": 0,
      "maximum": 5
    },
    "maturity_label": {
      "type": "string"
    },
    "scope": {
      "type": "string",
      "enum": [
        "trilemma",
        "external",
        "community"
      ]
    },
    "archetype": {
      "type": "string"
    },
    "category": {
      "type": "string"
    },
    "problem": {
      "type": "string"
    },
    "target_users": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "primary_decision": {
      "type": "string"
    },
    "inputs": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "outputs": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "repo": {
      "type": "string",
      "format": "uri"
    },
    "site": {
      "type": "string",
      "format": "uri"
    },
    "docs": {
      "type": "string",
      "format": "uri"
    },
    "agent_entrypoint": {
      "type": "string",
      "format": "uri"
    },
    "tags": {
      "type": "array",
      "items": {
        "type": "string"
      }
    }
  }
}
```

---

# 7. Standard microproduct folder contract

**Status: Implemented (2026-05-04).**

Every product should follow this shape:

```text
products/
  product-id/
    README.md
    AGENTS.md
    product.yaml
    product-brief.md
    architecture.md
    data-contract.md
    evaluation.md
    roadmap.md
    demo.md
    src/
    tests/
```

## File purposes

| File               | Purpose                               |
| ------------------ | ------------------------------------- |
| `README.md`        | Quick project overview and setup      |
| `AGENTS.md`        | Product-specific agent instructions   |
| `product.yaml`     | Machine-readable metadata             |
| `product-brief.md` | User, problem, value, scope           |
| `architecture.md`  | Technical structure                   |
| `data-contract.md` | Inputs, outputs, schemas, assumptions |
| `evaluation.md`    | How product quality is measured       |
| `roadmap.md`       | Future improvements                   |
| `demo.md`          | How to run and present the product    |
| `src/`             | Implementation                        |
| `tests/`           | Unit/integration/product tests        |

---

# 8. Microproduct maturity model

**Status: Implemented (2026-05-04).**

Use this across registry, docs, and contribution review.

```text
0 — Idea
1 — Spec
2 — Prototype
3 — MVP
4 — Showcase
5 — Maintained Product
```

## Definition table

| Level | Label              | Meaning                                       |
| ----: | ------------------ | --------------------------------------------- |
|     0 | Idea               | Problem/opportunity identified                |
|     1 | Spec               | Product brief and intended user defined       |
|     2 | Prototype          | Rough working version exists                  |
|     3 | MVP                | Useful end-to-end product exists              |
|     4 | Showcase           | Polished enough to reference publicly         |
|     5 | Maintained Product | Actively maintained with docs, tests, roadmap |

Agents should use this to determine how aggressively to build.

Example:

```yaml
maturity: 2
maturity_label: prototype
```

Agent interpretation:

```text
Improve usability, complete missing docs, add tests, and identify MVP path.
```

---

# 9. Microproduct archetypes

**Status: Implemented (2026-05-04).**

Create:

```text
/archetypes
/archetypes/data-to-decision-tool
/archetypes/ranking-recommendation-engine
/archetypes/forecasting-product
/archetypes/risk-scoring-product
/archetypes/alerting-monitoring-product
/archetypes/search-discovery-product
/archetypes/benchmark-evaluation-product
/archetypes/simulation-backtesting-product
/archetypes/workflow-automation-product
/archetypes/agentic-research-product
```

## Archetype format

Each archetype page should use this structure:

```md
# Archetype: Risk Scoring Product

## Use when

The product helps users prioritize entities, cases, assets, decisions, or actions based on risk.

## Common users

- Analysts
- Operators
- Reviewers
- Researchers
- Decision-makers

## Minimal MVP

- Input form or dataset
- Risk scoring logic
- Explanation layer
- Output score
- Suggested action
- Basic audit trail

## Required files

- product.yaml
- product-brief.md
- data-contract.md
- evaluation.md
- demo.md

## Evaluation

- Calibration
- Precision/recall
- False-negative cost
- Human usefulness
- Explainability
- Stability over time

## Reference products

- SurgRisk

## Common mistakes

- Producing a score with no recommended action
- Hiding assumptions
- Ignoring false negatives
- Optimizing only for model accuracy
- Failing to explain the result

## Agent prompt

You are building a risk scoring microproduct. First identify the target user, the entity being scored, the consequence of false positives and false negatives, and the action the user should take from the score. Then build the smallest version that produces a score, explanation, and recommended next step.
```

---

# 10. Templates

**Status: Implemented (2026-05-04).**

Create reusable starter templates:

```text
/templates
  /data-app
  /llm-app
  /analytics-api
  /dashboard-to-tool
  /research-to-product
  /capstone-project
  /benchmark-suite
  /agentic-workflow
```

Each template should include:

```text
README.md
AGENTS.md
product.yaml
product-brief.md
architecture.md
data-contract.md
evaluation.md
demo.md
src/
tests/
.github/workflows/checks.yml
```

## Recommended first templates

### 1. `data-app`

For microproducts that turn structured data into a user-facing decision tool.

### 2. `llm-app`

For LLM-assisted workflows with retrieval, classification, summarization, or generation.

### 3. `analytics-api`

For products where the core deliverable is a reusable API.

### 4. `dashboard-to-tool`

For converting passive dashboards into decision-support products.

### 5. `research-to-product`

For turning notebooks, reports, or experiments into usable software.

### 6. `capstone-project`

For university/student projects.

### 7. `benchmark-suite`

For evaluation-heavy products.

### 8. `agentic-workflow`

For products where AI agents perform multi-step tasks.

---

# 11. Build wizard

Create:

```text
/build
```

This should be the primary human-facing control panel.

## Wizard flow

Ask:

```text
1. What problem are you solving?
2. Who is the user?
3. What decision or task does the product support?
4. What data or inputs are available?
5. What output should the user receive?
6. Which archetype best fits?
7. Which template should be used?
8. What is the smallest useful MVP?
9. How should quality be evaluated?
10. Is this Trilemma, community, or external?
```

## Wizard output

Generate:

```text
product.yaml
README.md
product-brief.md
architecture.md starter
data-contract.md starter
evaluation.md starter
GitHub issue body
Agent prompt
Recommended template
```

## Example wizard output

```yaml
id: sample-risk-tool
name: Sample Risk Tool
status: spec
maturity: 1
scope: external
archetype: risk-scoring-product
problem: Help users identify high-risk records requiring review.
target_users:
  - operations analyst
primary_decision: Which records should be reviewed first?
inputs:
  - uploaded CSV
  - rule configuration
outputs:
  - risk score
  - explanation
  - recommended review priority
tags:
  - risk
  - scoring
  - operations
```

---

# 12. Agent workflows

Create:

```text
/agents
/agents/workflows
/agents/prompts
/agents/review-checklists
```

## Core workflows

### Workflow 1: New microproduct from idea

```text
Input: rough idea
Output: product spec + scaffold
```

Agent steps:

```text
1. Clarify user/problem/decision.
2. Choose archetype.
3. Choose template.
4. Generate product.yaml.
5. Generate product-brief.md.
6. Generate starter implementation.
7. Add tests.
8. Add demo instructions.
```

### Workflow 2: Turn research into product

```text
Input: notebook/report/model
Output: usable microproduct
```

Agent steps:

```text
1. Identify the useful decision.
2. Extract reusable logic.
3. Define inputs/outputs.
4. Wrap logic in interface/API/app.
5. Add evaluation criteria.
6. Add demo.
```

### Workflow 3: Convert dashboard into tool

```text
Input: dashboard
Output: decision-support microproduct
```

Agent steps:

```text
1. Identify what the dashboard helps decide.
2. Remove vanity charts.
3. Add interpretation.
4. Add recommended action.
5. Add alerts or thresholds.
6. Add export/share flow.
```

### Workflow 4: Improve existing microproduct

```text
Input: repo or product folder
Output: concrete PR plan
```

Agent steps:

```text
1. Read product.yaml.
2. Read AGENTS.md.
3. Check docs completeness.
4. Check tests.
5. Check data contract.
6. Identify maturity level.
7. Recommend next improvement.
```

### Workflow 5: Review submission

```text
Input: PR/submission
Output: review checklist
```

Agent steps:

```text
1. Validate schema.
2. Confirm product has one clear user.
3. Confirm output is useful.
4. Confirm docs are complete.
5. Confirm tests pass.
6. Confirm claims are supported.
7. Assign maturity level.
```

---

# 13. Agent prompt library

Add copy-paste prompts.

## Prompt: create product spec

```text
You are helping design a microproduct for Build Trilemma.

A microproduct is a focused software tool that turns data, models, workflows, or domain knowledge into usable utility for a specific user decision or task.

Given the idea below, produce:

1. product.yaml
2. product-brief.md
3. recommended archetype
4. recommended template
5. MVP scope
6. evaluation criteria
7. risks and assumptions

Keep the product narrow, testable, and shippable.

Idea:
[PASTE IDEA]
```

## Prompt: scaffold MVP

```text
You are building a Trilemma-compatible microproduct.

First read:
- AGENTS.md
- product.yaml
- product-brief.md
- data-contract.md
- evaluation.md

Then create the smallest useful MVP.

Requirements:
- Use the selected template.
- Keep the architecture simple.
- Add tests.
- Add demo instructions.
- Do not introduce unnecessary dependencies.
- Do not broaden the product scope.

Before coding, summarize the intended user, problem, output, and evaluation criteria.
```

## Prompt: review product

```text
Review this microproduct against Build Trilemma standards.

Check:

1. Clear user
2. Clear problem
3. Clear decision or task
4. Useful output
5. Proper product.yaml
6. Complete README
7. Complete data contract
8. Complete evaluation plan
9. Working demo path
10. Appropriate maturity level

Return:
- Pass/fail summary
- Major issues
- Minor issues
- Recommended maturity level
- Required changes before showcase
```

## Prompt: convert dashboard to microproduct

```text
Convert this dashboard concept into a microproduct.

Do not preserve charts unless they support a user decision.

Return:

1. User
2. Decision/task
3. Required inputs
4. Actionable outputs
5. Removed vanity metrics
6. MVP features
7. Evaluation criteria
8. product.yaml
```

---

# 14. Standards page

Create:

```text
/standards
```

Core sections:

```text
What counts as a microproduct
What does not count
Product quality checklist
Technical quality checklist
Agent-readability checklist
Review checklist
Maturity model
Submission requirements
```

## Microproduct standard

A valid microproduct must have:

```text
1. A specific user
2. A specific problem
3. A specific output
4. A clear input/output contract
5. A working demo path
6. A quality/evaluation method
7. A narrow MVP scope
8. Machine-readable metadata
```

## What does not qualify

```text
Generic dashboard
Notebook dump
Unscoped AI chatbot
Marketing page
Loose data exploration
Unvalidated model demo
Repo with no README
Tool with no target user
```

---

# 15. Contribution workflow

Update `/contribute` around three contribution types.

## Contribution types

| Type                      | Description                                                  |
| ------------------------- | ------------------------------------------------------------ |
| Official Trilemma product | Built for or maintained by Trilemma                          |
| Community microproduct    | Built using Trilemma standards, may be showcased             |
| External microproduct     | Independent product using Build Trilemma playbooks/templates |

## Submission flow

```text
1. Choose contribution type.
2. Choose archetype.
3. Start from template.
4. Fill required files.
5. Validate product.yaml.
6. Run checks.
7. Submit PR or external listing request.
8. Review assigns maturity level.
9. Product appears in registry if accepted.
```

## Review gates

```text
Gate 1: Metadata valid
Gate 2: User/problem clear
Gate 3: Product works
Gate 4: Evaluation exists
Gate 5: Docs complete
Gate 6: Claims reasonable
Gate 7: Security/privacy acceptable
```

---

# 16. Docusaurus implementation plan

## Suggested repo structure

```text
build-trilemma/
  docusaurus.config.ts
  sidebars.ts
  static/
    AGENTS.md
    llms.txt
    llms-full.txt
    registry.json
    schemas/
      product.schema.json
  docs/
    intro/
    agents/
    archetypes/
    standards/
    contribute/
  src/
    pages/
      index.tsx
      build.tsx
      registry.tsx
      templates.tsx
    components/
      ProductCard.tsx
      RegistryTable.tsx
      ArchetypeCard.tsx
      BuildWizard.tsx
  templates/
    data-app/
    llm-app/
    analytics-api/
    dashboard-to-tool/
    research-to-product/
    capstone-project/
    benchmark-suite/
    agentic-workflow/
  products/
    stackingsats/
    oddsfox/
    honestroles/
    surgrisk/
  scripts/
    validate-registry.ts
    generate-llms-full.ts
    generate-registry.ts
```

## Docusaurus config

```ts
const SITE_URL = "https://build.trilemma.foundation";

const config = {
  title: "Build Trilemma",
  tagline: "The AI-agent control panel for building microproducts.",
  url: SITE_URL,
  baseUrl: "/",
  favicon: "img/favicon.ico",

  organizationName: "TrilemmaFoundation",
  projectName: "build",

  trailingSlash: false,

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          routeBasePath: "/docs",
        },
        blog: false,
        sitemap: {
          changefreq: "weekly",
          priority: 0.7,
          filename: "sitemap.xml",
        },
      },
    ],
  ],

  themeConfig: {
    navbar: {
      title: "Build Trilemma",
      items: [
        { to: "/build", label: "Build", position: "left" },
        { to: "/agents", label: "Agents", position: "left" },
        { to: "/templates", label: "Templates", position: "left" },
        { to: "/registry", label: "Registry", position: "left" },
        { to: "/archetypes", label: "Archetypes", position: "left" },
        { to: "/standards", label: "Standards", position: "left" },
        { to: "/showcase", label: "Showcase", position: "left" },
        { to: "/contribute", label: "Contribute", position: "left" },
      ],
    },
  },
};

export default config;
```

---

# 17. Automation scripts

## `validate-registry.ts`

Purpose:

```text
Validate registry.json against product.schema.json.
Fail CI if invalid.
```

Checks:

```text
No duplicate IDs
Required fields exist
URLs valid
Maturity matches status
Archetype exists
Agent entrypoint exists if provided
```

## `generate-registry.ts`

Purpose:

```text
Read products/*/product.yaml
Generate static/registry.json
```

This is better than manually editing registry JSON.

Source of truth:

```text
products/*/product.yaml
```

Generated artifact:

```text
static/registry.json
```

## `generate-llms-full.ts`

Purpose:

```text
Collect selected docs and product summaries into static/llms-full.txt
```

Include:

```text
AGENTS.md
intro docs
standards
archetypes
templates
registry summaries
contribution workflow
```

---

# 18. CI checks

Add GitHub Actions:

```text
.github/workflows/checks.yml
```

Checks:

```text
Install dependencies
Typecheck
Lint
Build Docusaurus
Validate product metadata
Generate registry
Generate llms-full
Check no dirty generated files
```

Example workflow:

```yaml
name: Checks

on:
  pull_request:
  push:
    branches:
      - main

jobs:
  checks:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - run: npm ci
      - run: npm run typecheck
      - run: npm run lint
      - run: npm run generate:registry
      - run: npm run generate:llms
      - run: npm run validate:registry
      - run: npm run build
```

---

# 19. Homepage redesign

## Hero

```text
Build Microproducts with AI Agents

Build Trilemma is the AI-agent control panel for designing, scaffolding, validating, and shipping focused microproducts.

Use canonical templates, archetypes, agent instructions, schemas, and contribution workflows to turn ideas into useful software — inside or outside Trilemma Foundation.
```

## Primary CTAs

```text
Start Building
Read Agent Instructions
Browse Templates
View Registry
```

## Homepage sections

```text
1. What Build Trilemma is
2. What a microproduct is
3. How agents use this site
4. Build workflow
5. Templates
6. Archetypes
7. Showcase products
8. Contribution paths
```

## Strong homepage framing

```text
For AI agents:
Read AGENTS.md, registry.json, schemas, and templates.

For contributors:
Use the build wizard and templates to create microproducts.

For reviewers:
Use the standards and maturity model to evaluate submissions.

For external builders:
Use the same system to build independent microproducts.
```

---

# 20. Product-specific `AGENTS.md`

Each product should have its own file:

```text
/products/stackingsats/AGENTS.md
```

Example:

```md
# Stacking Sats — Agent Instructions

## Product purpose

Stacking Sats helps users evaluate and improve Bitcoin accumulation strategies.

## Agent objective

Improve the product without broadening scope beyond Bitcoin accumulation analytics, backtesting, and decision support.

## Read first

- product.yaml
- product-brief.md
- data-contract.md
- evaluation.md
- architecture.md

## Product boundaries

Do:
- Improve backtesting clarity.
- Improve strategy comparison.
- Improve documentation.
- Add reproducible examples.
- Add tests for strategy logic.

Do not:
- Provide personalized investment advice.
- Add unrelated trading features.
- Add unsupported performance claims.
- Hide assumptions behind black-box recommendations.

## Evaluation focus

- BTC accumulated versus baseline DCA
- Drawdown behavior
- Robustness across market regimes
- Interpretability
- Reproducibility
```

---

# 21. Build control panel functionality

The `/build` page should eventually support interactive generation.

## Phase 1: Static wizard

Simple form that outputs markdown/YAML client-side.

No backend required.

## Phase 2: GitHub issue generator

Generate a prefilled GitHub issue URL.

Example issue title:

```text
New microproduct spec: [Product Name]
```

Issue body:

```text
product.yaml
product-brief.md
selected template
selected archetype
MVP checklist
```

## Phase 3: Repo scaffold command

Provide:

```bash
npx create-trilemma-microproduct my-product --template data-app
```

Or simpler:

```bash
git clone template-url my-product
```

## Phase 4: Agent handoff

Generate:

```text
Copy this prompt into Cursor / Claude Code / ChatGPT / Devin:
...
```

---

# 22. External-builder support

Because the site should support builders outside Trilemma, define scopes clearly.

## Product scopes

```yaml
scope: trilemma
```

Official product.

```yaml
scope: community
```

Built by community contributors, may be listed/showcased.

```yaml
scope: external
```

Independent product using Trilemma standards/templates.

## Registry filtering

On `/registry`, support filters:

```text
All
Official Trilemma
Community
External
By archetype
By maturity
By category
```

## External contribution wording

```text
You do not need to be part of Trilemma Foundation to use Build Trilemma.

External builders may use the templates, archetypes, schemas, and agent instructions to build independent microproducts. External products may optionally request listing in the registry if they follow the standard metadata and review requirements.
```

---

# 23. Security and responsibility boundaries

Add to standards:

```text
Build Trilemma provides templates, workflows, and standards. Builders remain responsible for the correctness, legality, safety, privacy, and claims of their own microproducts.
```

For AI agents:

```text
Agents should not generate unsupported claims, financial advice, medical advice, legal advice, or production safety claims unless the relevant product explicitly supports that scope and includes appropriate review, disclaimers, and validation.
```

Add a clear policy for sensitive categories:

```text
High-stakes products require explicit evaluation, disclaimers, and human review before being listed as showcase or maintained products.
```

---

# 24. Minimal viable implementation

Do not build everything at once.

## Week 1: Foundation

Implement:

```text
Canonical URL
Redirect from microproducts.*
Homepage language
/AGENTS.md
/llms.txt
/registry.json
/schemas/product.schema.json
Basic /registry page
```

Deliverable:

```text
Build Trilemma clearly becomes agent-readable.
```

## Week 2: Standards and templates

Implement:

```text
/standards
/archetypes
/templates
Template folder contract
Maturity model
Contribution workflow update
```

Deliverable:

```text
Humans and agents know what to build and how.
```

## Week 3: Automation

Implement:

```text
product.yaml source files
generate-registry script
validate-registry script
generate-llms-full script
CI checks
```

Deliverable:

```text
Site becomes maintainable and machine-validated.
```

## Week 4: Build wizard

Implement:

```text
/build wizard
Spec generator
product.yaml generator
Agent prompt generator
GitHub issue generator
```

Deliverable:

```text
Site becomes a true control panel, not just docs.
```

---

# 25. Implementation priority table

| Priority | Item                                  |    Impact | Difficulty |
| -------: | ------------------------------------- | --------: | ---------: |
|        1 | Canonical `build.trilemma.foundation` |      High |        Low |
|        2 | Root `AGENTS.md`                      | Very high |        Low |
|        3 | `llms.txt`                            |      High |        Low |
|        4 | `registry.json`                       | Very high |     Medium |
|        5 | Product schema                        |      High |     Medium |
|        6 | Registry page                         |      High |     Medium |
|        7 | Standards page                        |      High |        Low |
|        8 | Archetype pages                       |      High |     Medium |
|        9 | Templates                             | Very high |     Medium |
|       10 | Product-specific `AGENTS.md`          |      High |     Medium |
|       11 | Registry generation script            |      High |     Medium |
|       12 | CI validation                         |      High |     Medium |
|       13 | Build wizard                          | Very high |     Higher |
|       14 | Scaffold CLI                          |    Medium |     Higher |

---

# 26. Recommended first PR

Make the first PR small but decisive.

## PR title

```text
Position Build Trilemma as agent control panel for microproducts
```

## Include

```text
1. Update canonical site metadata
2. Add /AGENTS.md
3. Add /llms.txt
4. Add /registry.json
5. Add /schemas/product.schema.json
6. Update homepage hero
7. Add /registry page
8. Add /standards page stub
```

## Do not include yet

```text
Build wizard
Full template library
CLI
All archetype pages
Automation scripts
```

This avoids a bloated first PR.

---

# 27. Acceptance criteria

The implementation is successful when:

```text
1. Agents can read /AGENTS.md and understand the build workflow.
2. Agents can read /registry.json and identify product examples.
3. Agents can validate product metadata against a schema.
4. Humans can browse templates and archetypes.
5. Contributors know how to submit microproducts.
6. External builders understand they can use the system independently.
7. The homepage clearly says this is an AI-agent control panel.
8. The site has one canonical hostname.
9. Product pages distinguish official, community, and external products.
10. CI prevents broken registry/schema/docs changes.
```

---

# 28. Best final structure

```text
build.trilemma.foundation
  = AI-agent control panel

AGENTS.md
  = how agents should behave

llms.txt
  = how LLMs discover the site

registry.json
  = what products exist

schemas/
  = what valid product metadata looks like

templates/
  = how to start building

archetypes/
  = what kind of product this is

standards/
  = what good looks like

build/
  = guided product creation

contribute/
  = how to submit

showcase/
  = proof that the system works
```

The most important implementation principle:

```text
Every human-facing concept should have a machine-readable equivalent.
```

Examples:

| Human-facing     | Agent-readable             |
| ---------------- | -------------------------- |
| Showcase page    | `registry.json`            |
| Product page     | `product.yaml`             |
| Docs             | `llms-full.txt`            |
| Build guide      | `AGENTS.md`                |
| Templates page   | Template folders           |
| Review criteria  | CI validation + checklists |
| Product type     | Archetype ID               |
| Product maturity | Numeric maturity level     |

That is what makes Build Trilemma feel like a real monorepo-style control panel rather than a normal documentation website.
