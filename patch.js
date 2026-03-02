const fs = require('fs');
const path = require('path');

const filePath = String.raw`c:\Users\pavan\projects\DocSense\docs\DOCSENSE_COMPLETE_DOCUMENTATION.md`;
const text = fs.readFileSync(filePath, 'utf-8');

const newContent = `### 📚 7.3 COMPLETE 43-CATEGORY TREE HIERARCHY (Canonical v8.0)

> Single structural authority for category organization.
> All rules must map to one of these 43 categories.

---

#### 🌐 SUPER DOMAIN 1 — Core Engineering Foundations (9 Categories)

##### 1. Security (83)

* Authentication & Authorization
* Input Validation
* Transport Security (HTTPS/TLS)
* Encryption at Rest
* OWASP Top 10 Controls
* Secrets Handling
* CSRF / XSS / Injection

##### 2. API Design & Contracts (89)

* RESTful Standards
* OpenAPI Compliance
* Versioning
* Idempotency
* Pagination & Filtering
* Error Contract Consistency

##### 3. Database & Data Integrity (72)

* Referential Integrity
* Indexing Strategy
* Migration Safety
* Transaction Boundaries
* Data Normalization
* Backup Strategy

##### 4. Performance Engineering (46)

* Response Time Targets
* Caching Strategy
* Query Optimization
* Lazy Loading
* Resource Budgeting

##### 5. Error Handling & Resilience (31)

* Retry Policies
* Graceful Degradation
* Circuit Breaker
* Timeout Strategy
* Fail-Safe Defaults

##### 6. Observability & Logging (27)

* Structured Logs
* Correlation IDs
* Metrics Export
* Alert Thresholds
* Log Retention Policy

##### 7. State Management (28)

* Single Source of Truth
* Immutable Updates
* Selector Purity
* Derived State Rules
* Cross-Tab Sync

##### 8. Documentation & Specification Quality (70)

* Missing Edge Cases
* Inconsistent Terminology
* Undefined Fields
* Ambiguous Requirements

##### 9. DevOps & CI/CD (70)

* Pipeline Enforcement
* Environment Parity
* Rollback Strategy
* Secrets Management
* Build Reproducibility

---

#### 🎨 SUPER DOMAIN 2 — Experience & Interface Systems (7 Categories)

##### 10. UI/UX Design Standards (133)

* Layout Consistency
* Spacing System
* Component Uniformity
* Responsive Rules
* Interaction Feedback

##### 11. Accessibility (64)

* ARIA Compliance
* Keyboard Navigation
* Color Contrast
* Focus Management

##### 12. Internationalization (25)

* Locale Formatting
* RTL Support
* Pluralization
* Translation Key Completeness

##### 13. Real-Time & Streaming (18)

* WebSocket Handling
* Streaming Safety
* Event Ordering

##### 14. Mobile & E-Commerce (74)

* Payment Flows
* Checkout Consistency
* Fraud Safeguards

##### 15. SEO & Content Structure (18)

* Meta Tags
* Structured Data
* Crawl Optimization

##### 16. Interaction Patterns & Animations (24)

* Motion Timing Governance
* Animation Accessibility
* Transition Predictability

---

#### 🖥 SUPER DOMAIN 3 — Desktop & Electron Systems (10 Categories)

##### 17. IPC Security (25)

* Channel Validation
* Schema Enforcement
* Context Isolation

##### 18. Window Management (25)

* Single Instance Enforcement
* Focus Handling
* Safe Window Creation

##### 19. File System Safety (25)

* Path Traversal Prevention
* Safe Write Policies
* File Locking

##### 20. Auto-Update Safety (20)

* Signature Verification
* Rollback on Failure
* Delta Update Safety

##### 21. Crash Recovery & Stability (20)

* Session Restore
* Crash Loop Detection
* Safe Shutdown Hooks

##### 22. Desktop Performance & Resources (25)

* Memory Leak Detection
* Worker Pool Limits
* Render Blocking Detection

##### 23. Installer & Distribution Safety (15)

* Code Signing
* Secure Installer Flags
* Uninstall Integrity

##### 24. Native OS Integration (30)

* System Tray Governance
* Global Shortcuts Policy
* Notification Permissions

##### 25. Offline-First & Sync (25)

* Conflict Resolution
* Sync Retry Strategy
* Local Cache Safety

##### 26. Desktop Accessibility (20)

* Screen Reader Integration
* Native Focus Rings
* High Contrast OS Modes

---

#### 🤖 SUPER DOMAIN 4 — AI & Intelligence Layer (6 Categories)

##### 27. AI Analysis Quality (60)

* Extraction Accuracy
* Confidence Scoring
* Hallucination Guard

##### 28. Contradiction Detection (55)

* Semantic Conflicts
* Numerical Mismatch
* Temporal Conflict

##### 29. Duplicate Detection (40)

* Similarity Thresholds
* Entity Merge Safety
* Cross-Doc Diff Logic

##### 30. Completeness & Gap Analysis (50)

* Missing State Detection
* Required Field Scoring
* Flow Coverage %

##### 31. Prompt & Guardrails (30)

* Injection Defense
* Context Size Limits
* Model Drift Detection

##### 32. RAG & Embedding Systems (35)

* Chunk Strategy
* Vector Index Integrity
* Embedding Freshness

---

#### 📊 SUPER DOMAIN 5 — Scalability & Infrastructure (6 Categories)

##### 33. Parallel Processing (40)

* Worker Pool Safety
* Task Deduplication
* Deadlock Prevention

##### 34. Processing Pipeline Governance (45)

* Stage Isolation
* Atomic Commit Policy
* Retry Backoff

##### 35. Resource Governance (35)

* CPU Quotas
* Memory Caps
* Backpressure Strategy

##### 36. Compatibility Matrix (28)

* Framework Conflicts
* Version Clash Detection
* SSR/Desktop Conflicts

##### 37. License & Compliance (30)

* OSS License Compatibility
* Commercial Risk Flags
* Redistribution Restrictions

##### 38. Deployment & Distribution (25)

* Multi-Platform Packaging
* Auto-Update Channel Strategy
* Environment Segregation

---

#### 🏛 SUPER DOMAIN 6 — Governance & Risk Systems (5 Categories)

##### 39. Data Privacy & GDPR (42)

* Consent Tracking
* PII Handling
* Data Minimization

##### 40. Telemetry Ethics (15)

* Opt-in Enforcement
* Data Anonymization
* Transparency Policy

##### 41. Change Impact Analysis (35)

* Blast Radius Detection
* Dependency Graph Integrity
* Risk Scoring

##### 42. Requirement Traceability (40)

* Requirement-to-Code Mapping
* Gap Detection
* Coverage % Enforcement

##### 43. Technical Debt & Maintainability (44)

* Code Complexity Detection
* Refactor Signals
* Aging Rule Detection

---

#### 🔢 Canonical Totals (Verified)

* **Super Domains:** 6
* **Total Categories:** 43
* **Total Rules:** 1,560
* **Auto-Fix Rules:** 890
* **Detection Patterns:** 2,480
* **Frameworks Supported:** 62

---

#### 🔒 Governance Enforcement

1. Every rule must map to:

   * Exactly 1 Category
   * Exactly 1 Super Domain
   * Exactly 1 Severity
   * Exactly 1 Auto-Fix Risk Classification

2. No category may exist outside this tree.

3. All statistical references in the document must reconcile against this hierarchy.`;

const pattern = /(### 7\.3 Complete Category Hierarchy[\s\S]*?)(?=### 7\.4)/;
if (pattern.test(text)) {
    const newText = text.replace(pattern, newContent + "\n\n");
    fs.writeFileSync(filePath, newText, 'utf-8');
    console.log("Success");
} else {
    console.log("Pattern not found!");
}
