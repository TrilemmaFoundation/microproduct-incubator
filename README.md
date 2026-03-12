# Microproduct Incubator Open Knowledge Hub

Microproducts are focused apps that turn data into usable tools and real utility.

This repository is an open knowledge hub to help builders learn, contribute, and ship microproducts through community-reviewed playbooks, resources, and examples.

## Start Here

- Read: [What is a Microproduct?](docs/core/intro/what-is-a-microproduct.md)
- Learn the process: [Playbook](docs/core/playbook/ideation.md)
- Explore examples: [Showcase](docs/showcase/microproducts.md)
- Contribute: [How to contribute](docs/contribute/how-to-contribute.md)

## Local Development

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

## Validation

```bash
npm run check
```

This runs:

- spelling check
- frontmatter validation
- markdown lint
- site build and link checks

## Spelling Check
We use `cspell` to automatically check for spelling mistakes in the docs, which
helps prevent noisy review comments. This tool is integrated into IDEs, which
highlight spelling errors similarly to other linting or quality issues. If
you find that a word is not recognized, you have the option to add it to our
dictionary which is included in version control. Examples of domain-specific but
legitimate words that might be added include the term "Microproduct" itself.

Example: `echo "microproduct" >> project-words.txt`

Many IDEs support auto-fixing the issue. Here's what it looks like in VSCode:
![cspell auto-fix screenshot](static/tooling/cspell/cspell_auto_fix.png)

Make sure to add to dictionary file and not just editor settings so that the
change is picked up in the checker script and can be used by others.
