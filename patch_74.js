const fs = require('fs');

const filePath = String.raw`c:\Users\pavan\projects\DocSense\docs\DOCSENSE_COMPLETE_DOCUMENTATION.md`;
const text = fs.readFileSync(filePath, 'utf-8');

const newContent = `### 7.4 High-Performance 1,500+ Rule Evaluation Architecture

> Applies to: 1,560 rules · 43 categories · 6 super-domains · 2,480 detection patterns
> Objective: Deterministic, horizontally scalable, low-latency evaluation with incremental re-execution support.

---

#### 7.4.1 Architectural Principles

1. **Deterministic Execution**

   * Same input → identical violation output.
   * No rule may depend on mutable global state.

2. **Single-Pass Model Read**

   * The extracted \`SystemModel\` is read-only during evaluation.
   * Rules cannot mutate model state.

3. **Execution Graph, Not Flat Loop**

   * Rules are organized into a dependency-aware DAG.
   * Category grouping enables parallel execution.

4. **Pattern-Indexed Dispatch**

   * Rules are pre-indexed by trigger patterns.
   * Non-relevant rules are never evaluated.

5. **Incremental Re-Evaluation**

   * On model delta, only affected rule clusters re-run.

---

#### 7.4.2 Execution Graph Model

The Rule Engine compiles rules into an **Execution DAG (Directed Acyclic Graph)**.

\`\`\`typescript
interface RuleNode {
  ruleId: string;
  category: string;
  superDomain: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  triggers: string[];          // Pattern keys
  dependencies: string[];      // Rule IDs
  executionCost: number;       // Estimated complexity weight
}

interface RuleExecutionGraph {
  nodes: Record<string, RuleNode>;
  adjacencyList: Record<string, string[]>;
  rootClusters: string[];      // Independent parallel roots
}
\`\`\`

##### Execution Flow

\`\`\`
SystemModel (Immutable Snapshot)
        ↓
Pattern Index Pre-Scan
        ↓
Cluster Activation Map
        ↓
Parallel Rule Evaluation (Worker Pool)
        ↓
Violation Aggregation
        ↓
Atomic Commit to StandardsState
\`\`\`

---

#### 7.4.3 Category-Based Clustering

Rules are grouped by **Category → Super Domain**.

\`\`\`
6 Super Domains
   ├── 43 Categories
         ├── 1,560 Rules
\`\`\`

Each category forms a **parallelizable cluster**.

\`\`\`typescript
interface RuleCluster {
  categoryId: string;
  rules: string[];
  parallelizable: boolean;
  estimatedCost: number;
}
\`\`\`

##### Parallelization Policy

| Cluster Type             | Execution Mode     |
| ------------------------ | ------------------ |
| Independent Category     | Parallel           |
| Cross-Document Rules     | Sequential Barrier |
| Dependency-Chained Rules | Topological Order  |

---

#### 7.4.4 Pattern Indexing Strategy (2,480 Patterns)

To avoid O(N) rule scans, rules are pre-indexed by detection triggers.

##### 7.4.4.1 Trigger Map

\`\`\`typescript
interface PatternIndex {
  triggerKey: string;
  ruleIds: string[];
}
\`\`\`

Example:

\`\`\`
"ipc" → [DESKTOP_IPC_001, DESKTOP_IPC_002]
"jwt" → [SEC_AUTH_014, API_AUTH_009]
"retry" → [PERF_RETRY_004]
\`\`\`

##### Pre-Scan Phase

1. Extraction engine produces:

   * Entity keys
   * API endpoints
   * Keywords
   * Frameworks
2. PatternIndex maps keys → relevant rule subsets.
3. Only matched rule clusters activate.

**Result:**
From 1,560 rules → typically 350–600 activated per project.

---

#### 7.4.5 High-Performance Evaluation Pipeline

##### 7.4.5.1 Worker Pool Model

\`\`\`typescript
interface RuleWorker {
  id: string;
  active: boolean;
  assignedCluster?: string;
  cpuLoad: number;
}
\`\`\`

* Default pool size: \`min(8, logicalCPUCount)\`
* Work stealing enabled.
* Category clusters distributed by cost weight.

---

##### 7.4.5.2 Execution Phases

| Phase | Operation             | Parallel    |
| ----- | --------------------- | ----------- |
| 1     | Pattern Activation    | Yes         |
| 2     | Cluster Scheduling    | Yes         |
| 3     | Rule Execution        | Yes         |
| 4     | Dependency Resolution | Conditional |
| 5     | Violation Aggregation | Barrier     |
| 6     | Atomic Commit         | No          |

---

#### 7.4.6 Caching Strategy

##### 7.4.6.1 Model Hashing

\`\`\`typescript
interface ModelFingerprint {
  structuralHash: string;
  entityHash: string;
  documentHash: string;
}
\`\`\`

If fingerprint unchanged → skip full evaluation.

---

##### 7.4.6.2 Rule Result Cache

\`\`\`typescript
interface RuleCacheEntry {
  ruleId: string;
  modelHash: string;
  resultHash: string;
  violations: Violation[];
  computedAt: number;
}
\`\`\`

Cache hit condition:

\`\`\`
if (rule.modelDependencies ⊆ unchangedSlices)
  reuse cached result
\`\`\`

---

##### 7.4.6.3 Category-Level Cache

Each category maintains a composite hash.

\`\`\`
CategoryHash = hash(ruleHashes + relevantModelSliceHash)
\`\`\`

If unchanged → entire cluster skipped.

---

#### 7.4.7 Incremental Re-Evaluation

When a delta occurs (e.g., auto-fix, new document):

1. Identify affected model slices.
2. Map slices → impacted categories.
3. Invalidate only related rule clusters.
4. Re-run those clusters only.

##### Example

\`\`\`
Auto-fix in Security domain
→ Invalidate: Security + Cross-Reference
→ Preserve: Performance, UX, AI domains
\`\`\`

---

#### 7.4.8 Performance Guarantees

| Metric                   | Target         |
| ------------------------ | -------------- |
| Cold Run (1,560 rules)   | < 2.5s         |
| Warm Run (cache hit 60%) | < 1.2s         |
| Incremental Run          | < 800ms        |
| Memory Footprint         | < 180MB        |
| Parallel Worker Overhead | < 5% CPU waste |

---

#### 7.4.9 Memory Governance

* Model snapshot is immutable.
* Violations stored as compressed structs.
* Pattern index stored as static map (frozen).
* Worker pool destroyed after finalization.

---

#### 7.4.10 Execution Safety Invariants

1. **RULE_IMMUTABILITY**: Rule definitions frozen at startup.
2. **NO_RUNTIME_REGISTRATION** in production mode.
3. **NO_MODEL_MUTATION** during evaluation.
4. **ATOMIC_COMMIT_ONLY** to \`StandardsState\`.
5. **SINGLE_EVALUATION_LOCK** enforced by Main Process.

---

#### 7.4.11 Failure Isolation

If a rule throws:

* Captured by rule sandbox wrapper.
* Marked as \`executionError\`.
* Does not stop cluster execution.
* Logged to \`EngineDeepDiveState\`.

---

#### 7.4.12 Evaluation Architecture Summary

The Rule Engine is:

* DAG-driven
* Pattern-indexed
* Cluster-parallelized
* Cache-aware
* Incremental
* Deterministic
* IPC-lock protected

This enables sustainable scaling from:

* 914 rules (legacy)
* → 1,560 rules (v8.0)
* → Future 2,500+ rule expansion without O(N²) degradation.

---`;

// Look for Section 7.4 and the next section 7.5 to replace everything in between.
const pattern = /(### 7\.4 Super-Domain to Parent Group Mapping Table[\s\S]*?)(?=### 7\.5 Expanded Rule Interface)/;

if (pattern.test(text)) {
    const newText = text.replace(pattern, newContent + "\n\n");
    fs.writeFileSync(filePath, newText, 'utf-8');
    console.log("Success");
} else {
    console.log("Pattern not found!");
}
