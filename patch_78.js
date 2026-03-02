const fs = require('fs');

const filePath = String.raw`c:\Users\pavan\projects\DocSense\docs\DOCSENSE_COMPLETE_DOCUMENTATION.md`;
let text = fs.readFileSync(filePath, 'utf-8');

const newSection = `---

# 📌 Section 7.8 — Deterministic Rule ID Namespace Specification

## 7.8.1 Objective

To guarantee:

* Zero rule ID collision
* Stable referential integrity across versions
* O(1) rule lookup
* Deterministic mapping to:

  * Super Domain
  * Canonical Category
  * Execution Tier
  * Auto-Fix binding
  * Pattern Registry index

All 1,560 rules must conform to this namespace contract.

---

## 7.8.2 Canonical Rule ID Format

\`\`\`
DS-{SD}-{CAT}-{SEQ}-{TIER}
\`\`\`

### Components

| Segment | Meaning                       | Format   | Example |
| ------- | ----------------------------- | -------- | ------- |
| \`DS\`    | System prefix                 | Constant | DS      |
| \`SD\`    | Super Domain (1–6)            | 2-digit  | SD01    |
| \`CAT\`   | Canonical Category (1–43)     | 2-digit  | CAT17   |
| \`SEQ\`   | Rule sequence inside category | 3-digit  | 004     |
| \`TIER\`  | Execution cost tier           | L/M/H/X  | M       |

---

### Example

\`\`\`
DS-SD03-CAT17-004-M
\`\`\`

Meaning:

* Super Domain 3
* Category 17
* Rule #4 inside that category
* Medium execution cost

---

## 7.8.3 Super Domain Encoding

| SD Code | Super Domain               |
| ------- | -------------------------- |
| SD01    | Core Engineering           |
| SD02    | Security & Compliance      |
| SD03    | Platform & Desktop         |
| SD04    | Performance & Scale        |
| SD05    | AI & Reasoning             |
| SD06    | Governance & Observability |

All 43 categories are nested under exactly one SD.

---

## 7.8.4 Category Binding Constraint

Every rule must statically declare:

\`\`\`typescript
interface CanonicalRule {
  ruleId: string;          // Must match namespace format
  superDomain: number;     // 1-6
  category: number;        // 1-43
  sequence: number;        // 1-n inside category
  executionTier: 'L' | 'M' | 'H' | 'X';
}
\`\`\`

### VALIDATION RULE

At rule registration time:

\`\`\`
if (parse(ruleId) !== declared superDomain/category/sequence)
    throw NamespaceIntegrityError
\`\`\`

This guarantees namespace determinism.

---

## 7.8.5 Tier Classification Model

Execution tier defines evaluation cost envelope:

| Tier | Meaning                | Expected Latency |
| ---- | ---------------------- | ---------------- |
| L    | Lightweight            | <1ms             |
| M    | Moderate               | <5ms             |
| H    | Heavy (cross-doc scan) | <20ms            |
| X    | Deep semantic/AI bound | async            |

Tier is part of ID to allow:

* DAG scheduling
* Parallel grouping
* Cost-aware execution graph

---

## 7.8.6 Pattern Registry Binding

Each rule must bind to at least one detection pattern:

\`\`\`typescript
interface RulePatternBinding {
  ruleId: string;
  patternIds: string[]; // 1..n
}
\`\`\`

Pattern ID format:

\`\`\`
PAT-{SD}-{CAT}-{SEQ}
\`\`\`

Example:

\`\`\`
PAT-SD02-CAT08-014
\`\`\`

Rules may not reference patterns outside their SD without declaring:

\`\`\`typescript
crossDomainDependency: true
\`\`\`

---

## 7.8.7 Auto-Fix Binding Specification

Auto-fixable rules must append deterministic suffix metadata:

\`\`\`
DS-SD03-CAT21-012-M-AF
\`\`\`

Where:

* \`AF\` indicates auto-fix available
* Non-auto-fix rules omit this suffix

Binding:

\`\`\`typescript
interface AutoFixBinding {
  ruleId: string;
  risk: 'Safe' | 'Moderate' | 'Risky';
  reversible: boolean;
  requiresPreview: true;
}
\`\`\`

---

## 7.8.8 Version Migration Policy

Rule IDs are immutable.

Allowed:

* New rules append new SEQ numbers
* Deprecated rules marked:

\`\`\`typescript
deprecated: true;
replacedBy?: string;
\`\`\`

Prohibited:

* Renumbering
* Reusing deleted sequence numbers
* Reassigning category bindings

---

## 7.8.9 O(1) Lookup Index Strategy

At runtime, rule registry builds:

\`\`\`typescript
const ruleMap: Record<string, CanonicalRule>
const categoryIndex: Record<number, string[]>
const superDomainIndex: Record<number, string[]>
const tierIndex: Record<'L'|'M'|'H'|'X', string[]>
\`\`\`

Lookup paths:

* Rule by ID → O(1)
* Category scan → O(k)
* Tier-batched execution → O(n/tier)

---

## 7.8.10 Integrity Enforcement Tests

Mandatory startup validation:

1. Total rule count = 1,560 (Ref: 7.0)
2. No duplicate ruleId
3. All category totals match 7.3
4. All pattern bindings exist (2,480 total)
5. All auto-fix references match 890
6. No orphaned patterns
7. No cross-domain undeclared references

Failure → Application refuses to boot in production mode.

---
`;

const insertTarget = '### 7.5 Expanded Rule Interface';
if (text.includes(insertTarget)) {
    text = text.replace(insertTarget, newSection + '\n' + insertTarget);

    // Update TOC
    const tocRegex = /(\s*- \[7\.X Super-Domain Cross-Dependency Matrix\][^\n]*\n)/;
    const tocRepl = `$1    - [7.8 Deterministic Rule ID Namespace Specification](#78-deterministic-rule-id-namespace-specification)\n`;
    text = text.replace(tocRegex, tocRepl);

    fs.writeFileSync(filePath, text, 'utf-8');
    console.log("Success inserting 7.8");
} else {
    console.log("Could not find insertion target.");
}
