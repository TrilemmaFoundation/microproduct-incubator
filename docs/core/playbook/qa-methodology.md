---
title: QA Methodology
description: Phase 2 QA track for validating agent-assisted builds and ensuring progress.
tags: [playbook, qa]
last_reviewed: 2026-03-18
---

## QA Track in Implementation Phase
Delivering high-quality microproducts to users requires effort in the ideation,
implementation and operation of the software. Here, we focus on shaping key
aspects and milestones in the implementation phase to enable fast execution while
producing reliable outcomes. QA is a dedicated track inside Phase 2, not a post-
build afterthought. Its purpose is not to introduce friction into the SDLC, but
rather to create effective feedback loops, facilitate progress without regression,
and allow timely delivery of a product that matches or exceeds initial expectations.


## Disclaimer
Like much of the content in this knowledge-base, our guidelines and templates for
QA do not follow or prescribe any one doctrine or set of tools. However, we use
these to consolidate tailored learnings from work on other microproducts and
share opinionated defaults in the form of guiding principles, reference architecture,
and best practices. We consider this a working document, and welcome variants of
the suggested methodology as well as improvements through contributions.

## QA Philosophy
We draw inspiration from some of the most successful tech companies (Google, Amazon)
and incorporate ideas from processes like 'Shift-Left', Continuous Testing and
Behaviour-Driven Development (BDD) while adapting them to meet the needs of
microproduct development in our modern, AI-assisted era.
Our quality assurance methodology has the following characteristics:

1. [Practical Software Design](#practical-software-design)
2. [Automation](#automation)
3. [Thoughtful Quality Gates & Feedback Mechanisms](#thoughtful-quality-gates--feedback-mechanisms)

Which are explored further below.

### Practical Software Design
*Low-coupling, deep vertical slices, and intentional project organization promote effective testing and visibility*

While it may seem like a separate domain, applying software design principles is
critical to making a project testable and allowing it to grow in a way that
avoids regressions and that all stakeholders understand.

Independent components (we like vertical slices, but this is not required) with
clear and minimal dependencies allow humans to reason easily about where certain
business rules or behaviours reside in the system, and makes it easier for agents
to build or extend capabilities without affecting the others.

Furthermore, building small bits of functionality from end-to-end ensures that
we make incremental progress and can test and provide feedback each step of the way.
This does not strictly require UI->DB slices - a helper class with a clear purpose
and suite of tests that express business requirements is equally powerful. Such
classes is treated as a first-class component of the system.

Well-designed systems embrace business domain concepts and terminology, using
these to describe what software does in specifications, tests and documentation.
Dependencies between modules should be apparent to domain experts.

### Automation
*Automated tests, CI/CD pipelines, and other AI-assisted workflows facilitate rapid development with a growing codebase and feature set*

### Thoughtful Quality Gates & Feedback Mechanisms
*Deterministic checks at specific points in the change lifecycle give information to agents and human reviewers, balancing correctness with development friction*

There are a number of key places to hook in an install quality checks, including
but not limited to:
- Agent loop (run on each message or code change)
- Human QA check (feature branch)
- Pre-commit/pre-push hooks
- Pull-request
- CI/CD pipeline
- Release

Using static analysis tools (linters, type-checkers), tests, and automated code
review are invaluable for keeping the quality and 'entropy' of the project in
check. Choosing the right tools and where and when to deploy them is specific to
every team and project, but a key part of growing from prototyping to product.


## Agent-Assisted Testing Guidance

- Prioritize tests for the highest-value workflow and failure modes first.
- Use known sample datasets to validate deterministic expectations.
- Require human review for ambiguous or high-risk agent-generated changes.

## Repository Entropy Controls

- Enforce consistent architecture and naming conventions.
- Gate merges with required checks and explicit reviewer accountability.
- Track defect recurrence and unstable areas to prevent drift.

## Risk-Tiered Checklists and Release Gates

Apply checks by risk tier:

- Low risk: functional path test and basic regression check.
- Medium risk: error-path, integration, and accessibility spot checks.
- High risk: full critical-path validation, rollback readiness, and monitoring checks.

## Release Readiness Checklist

- Critical user path passes in representative conditions.
- Known high-impact defects are resolved or explicitly mitigated.
- Observability is in place for new high-risk code paths.
- Rollback and incident response owner are identified.

## Contributor Expansion Areas

- QA automation patterns for agent-first repositories.
- Risk scoring models for release decisions.
- Post-release quality review templates.

[Propose an improvement](https://github.com/TrilemmaFoundation/microproduct-incubator/pulls)
