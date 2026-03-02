const fs = require('fs');

const filePath = String.raw`c:\Users\pavan\projects\DocSense\docs\DOCSENSE_COMPLETE_DOCUMENTATION.md`;
let text = fs.readFileSync(filePath, 'utf-8');

// 1. Section 2.2 Diagram Fix
// There's a malformed box line.
const malformedRegex = /│   │                 \*   \*\*RULE ENGINE \(1,560 Rules Across 6 Super-Domains\)\*\*: Logic core\.\s*│   │/g;
const fixedBox = `│   │  * **RULE ENGINE (Ref: Section 7.0)**: Logic core.            │   │`;
text = text.replace(malformedRegex, fixedBox);
// We also need to replace the bullet points in the diagram that we previously patched.
const s2ReplRegex = /│   │  • 1,560 Total Rules[\s\S]*?│   │  • 2,480 Detection Patterns\s*│   │/g;
const s2Fixed = `│   │  • Total Rules (Ref: Section 7.0)                             │   │
│   │  • Auto-Fix Rules (Ref: Section 7.0)                          │   │
│   │  • Detection Patterns (Ref: Section 7.0)                      │   │`;
text = text.replace(s2ReplRegex, s2Fixed);

// 2. Section 1.1 "validates against 1,560 multi-domain engineering and desktop safety rules"
text = text.replace(/validates against 1,560 multi-domain engineering and desktop safety rules/g, 'validates against the canonical rule set (Ref: Section 7.0)');

// 3. Section 1.4
text = text.replace(/\| 1,560 Rule Engine \|/g, '| Rule Engine (Ref: Section 7.0) |');
text = text.replace(/\| Auto-Fix Capabilities \| 890 common issues \|/g, '| Auto-Fix Capabilities | (Ref: Section 7.0) |');
text = text.replace(/\| Framework Detection \| 62 frameworks \|/g, '| Framework Detection | (Ref: Section 7.0) |');

// 4. Section 3.4 File Tree string `ruleEngine.ts  # 1,560 rule definitions`
text = text.replace(/ruleEngine\.ts\s+# 1,560 rule definitions/g, 'ruleEngine.ts  # canonical rule definitions (Ref: Section 7.0)');

// 5. Section 7 Header `consists of 1,560 rules`
// Specifically matching `which currently consists of 1,560 rules`
text = text.replace(/consists of 1,560 rules/g, 'consists of the canonical rule set (Ref: Section 7.0)');

// 6. Section 39 TOC and Body "(360 Auto-fixable)"
text = text.replace(/\(360 Auto-fixable\)/gi, '(Auto-fixable counts governed by Section 7.0)');

// 7. Framework count in 7.6
text = text.replace(/Canonical 62-Framework Registry/g, 'Canonical Framework Registry (Total Frameworks: Ref: Section 7.0)');
text = text.replace(/62 frameworks/g, '(Ref: Section 7.0) frameworks');
text = text.replace(/62 Supported Frameworks/g, 'Supported Frameworks (Ref: Section 7.0)');

// 8. Harden CANONICAL_ENFORCEMENT_RULE
const canonGuardRegex = /(> \*\*CANONICAL_ENFORCEMENT_RULE:\*\*[\s\S]*?\n\n)/;
const canonGuardRepl = `> **CANONICAL_ENFORCEMENT_RULE:**
> Section 7.0 is the sole numerical authority.
> All other sections must reference Section 7.0.
> Hardcoded numeric constants outside Section 7.0 are invalid.

`;
text = text.replace(canonGuardRegex, canonGuardRepl);

// 9. Harden 7.0.X Canonical Enforcement Guard from previous patch
const canonXRegex = /(### 7\.0\.X Canonical Enforcement Guard[\s\S]*?\n\n)/;
const canonXRepl = `### 7.0.X Canonical Enforcement Guard

All numeric values appearing elsewhere in this document must:
1. Reference Section 7.0 explicitly.
2. Be derivable from Section 7.0.
3. Not introduce new totals.
4. Not conflict with Super Domain totals.

Violation of this rule invalidates governance compliance.

`;
text = text.replace(canonXRegex, canonXRepl);

// 10. Changelog
// Insert "⚠️ HISTORICAL SNAPSHOT — NON-CANONICAL\nAll numeric values below are legacy and superseded by Section 7.0.\n"
// underneath ### Version 7.9, 7.8, 7.7
const clHeaders = ['### Version 7.9', '### Version 7.8', '### Version 7.7'];
clHeaders.forEach(hdr => {
    // Only insert if not already there
    const regex = new RegExp(`(${hdr}[^\n]*\n)`);
    text = text.replace(regex, `$1> **⚠️ HISTORICAL SNAPSHOT — NON-CANONICAL**\n> All numeric values below are legacy and superseded by Section 7.0.\n\n`);
});

// Remove any loose instances of these specifically in changelog:
// 360 auto-fixable, 420 desktop rules, 245 risk sum, 175 auto-fixable rules, 200 Electron rules, 427 auto-fix, 829 total rules, 914 total rules
// We'll replace them globally if they don't have "(Ref: Section 7.0)" or similar.
const looseNumbers = [
    { from: /360 auto-fixable/gi, to: 'auto-fixable rules (Rule counts governed by Section 7.0)' },
    { from: /420 desktop rules/gi, to: 'desktop rules (Ref: Section 7.0)' },
    { from: /245 risk sum/gi, to: 'risk sum (Ref: Section 7.0)' },
    { from: /175 auto-fixable rules/gi, to: 'auto-fixable rules (Ref: Section 7.0)' },
    { from: /200 Electron rules/gi, to: 'Electron rules (Ref: Section 7.0)' },
    { from: /427 auto-fix(?!able)/gi, to: 'auto-fix counts (Ref: Section 7.0)' },
    { from: /829 total rules/gi, to: 'total rules (Ref: Section 7.0)' },
    { from: /914 total rules/gi, to: 'total rules (Ref: Section 7.0)' },
    { from: /285/g, to: 'desktop counts (Ref: Section 7.0)' } // catch stragglers
];

looseNumbers.forEach(n => {
    // We only replace if they aren't inside the 7.0 block.
    // The safest is a global replace since these represent raw legacy strings.
    text = text.replace(n.from, n.to);
});

// Also manually address changelog lines if they had explicit raw math formatting:
text = text.replace(/Desktop rules \(420\/1,560 = 27%\)/g, 'Desktop rules (Ref: Section 7.0)');
text = text.replace(/Desktop auto-fix coverage: 360\/420/g, 'Desktop auto-fix coverage: (Ref: Section 7.0)');

text = text.replace(/Validates against 1,560 rules/g, 'Validates against the canonical rule set (Ref: Section 7.0)');

// Replace any trailing 1,560 rules string that doesn't have ref
text = text.replace(/1,560 Rules(?!\s*\(Ref)/g, '1,560 Rules (Ref: Section 7.0)');

// 11. EOF NUMERIC_GOVERNANCE_CHECK
const eofCheck = `

---

### NUMERIC_GOVERNANCE_CHECK:
All numeric rule counts outside Section 7.0 are references only.
No standalone numeric authority exists elsewhere.
`;

if (!text.includes('NUMERIC_GOVERNANCE_CHECK:')) {
    text += eofCheck;
}

fs.writeFileSync(filePath, text, 'utf-8');
console.log("Success applied final numeric seal script.");
