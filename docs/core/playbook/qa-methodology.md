---
title: QA Methodology
description: Phase 2 QA track for validating agent-assisted builds and controlling repository entropy.
tags: [playbook, qa]
last_reviewed: 2026-03-05
---

## QA Track in Implementation Phase

QA is a dedicated track inside Phase 2, not a post-build afterthought. Its purpose is to ensure fast execution still produces reliable outcomes.

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
