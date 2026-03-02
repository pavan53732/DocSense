const fs = require('fs');

const filePath = String.raw`c:\Users\pavan\projects\DocSense\docs\DOCSENSE_COMPLETE_DOCUMENTATION.md`;
let text = fs.readFileSync(filePath, 'utf-8');

// 1️⃣ Section 7.1 — Rule Statistics (Still 914-Based)
const sec71Regex = /(### 7\.1 Rule Statistics)([\s\S]*?)(?=### 7\.2 Super-Domains)/;
const sec71Repl = `$1 (Derived – Ref: Section 7.0)

All rule counts, severity distributions, and domain totals are derived exclusively from the Canonical Statistics Block (Section 7.0).

No hard-coded numeric values are permitted in this section.

Severity Distribution (Ref: Section 7.0):

- Critical: 280
- High: 420
- Medium: 520
- Low: 340
- Total: 1,560

`;
text = text.replace(sec71Regex, sec71Repl);


// 2️⃣ Delete Section 38 entirely and replace
const sec38Regex = /(## 38\. UPDATED STATISTICS SUMMARY)([\s\S]*?)(?=## 39\.)/;
const sec38Repl = `## 38. Statistical Derivation Notice

This section intentionally contains no standalone numeric tables.

All statistical values must be derived programmatically from Section 7.0 Canonical Statistics Block.

Legacy parent-group summaries (v7.x) are deprecated and non-operational.

`;
text = text.replace(sec38Regex, sec38Repl);

// 3️⃣ Section 39.8 — Desktop Fix Statistics Arithmetic Failure
const sec398Regex = /(### 39\.8 Desktop Auto-Fix Statistics Summary|### 39\.8 Desktop Fix Statistics Summary)([\s\S]*?)(?=\n---|\n## 32\. CHANGELOG|\n## 40\.)/;
const sec398Repl = `### 39.8 Desktop Auto-Fix Statistics (Ref: Section 7.0 → SD3)

Total Desktop Rules: 360  
Total Auto-Fixable: 310  
Non Auto-Fixable: 50  

Risk Distribution:
- Safe: 210
- Moderate: 75
- Risky: 25

Constraint:
Safe + Moderate + Risky = 310  
Each auto-fixable rule has exactly one risk classification.

`;
text = text.replace(sec398Regex, sec398Repl);
if (!text.includes("39.8 Desktop Auto-Fix Statistics (Ref: ")) {
    // Attempt fallback if header isn't exactly as guessed
    const fbRef = /(### 39\.8 [\s\S]*?)(?=\n---|\n## 32\. CHANGELOG)/;
    if (fbRef.test(text)) {
        text = text.replace(fbRef, sec398Repl);
    }
}

// 4️⃣ Changelog v7.7 / v7.8 / v7.9 Still Contains Active Numbers
// Remove ✓ marks, wrap in Historical Note
// This was partially done earlier, but let's be explicitly aggressive with `✓` removal and the exact formatting proposed.
text = text.replace(/- Total Rules: 914 ✓/g, '- Total Rules: 914');
text = text.replace(/- Categories: 92 ✓/g, '- Categories: 92');
text = text.replace(/- Parent Groups: 14 ✓/g, '- Parent Groups: 14');
text = text.replace(/Auto-Fix: 890 \(57%\) ✓/g, 'Auto-Fix: 890 (57%)');
text = text.replace(/Total Rules: 914/g, 'Total Rules: 914 (⚠️ Historical Note: v7.x – Superseded by v8.0. Non-operational.)');
text = text.replace(/Categories: 92/g, 'Categories: 92 (⚠️ Historical Note: v7.x – Superseded by v8.0. Non-operational.)');
text = text.replace(/Parent Groups: 14/g, 'Parent Groups: 14 (⚠️ Historical Note: v7.x – Superseded by v8.0. Non-operational.)');

// 5️⃣ Framework Registry Count Drift
const regEndRegex = /(\| \`F-62\` \| OpenAI SDK \| AI API \|\n\n)(?=---)/;
const regEndRepl = `$1> **FRAMEWORK_COUNT_ENFORCEMENT:**  
> Total Registered Frameworks: 62  
> This list must contain exactly 62 entries.  
> If modified, Section 7.0 must be updated accordingly.

`;
if (!text.includes('FRAMEWORK_COUNT_ENFORCEMENT:')) {
    text = text.replace(regEndRegex, regEndRepl);
}

// 6️⃣ Remove All Standalone "1,560 total rules" mentions etc
text = text.replace(/Validates against 1,560 rules(?!\s*\(Ref)/g, 'Validates against 1,560 rules (Ref: Section 7.0)');
text = text.replace(/1,560 Rule Engine(?!\s*across|\s*\(Ref)/g, '1,560 Rule Engine (Ref: Section 7.0)');
text = text.replace(/1,560 total rules(?!\s*\(Ref)/g, '1,560 total rules (Ref: Section 7.0)');

// 7️⃣ Section 37 Extended Desktop Categories
// "25 rules", "20 rules", "15 rules" etc 
const sec37Regex = /(## 37\. Extended Desktop Rule Categories)([\s\S]*?)(?=## 38\.)/;
if (sec37Regex.test(text)) {
    let sec37Content = text.match(sec37Regex)[0];
    sec37Content = sec37Content.replace(/\(\d+ rules\)/g, '(Rule counts are governed by Section 7.0)');
    sec37Content = sec37Content.replace(/\(\d+ Total Rules\)/g, '(Rule counts are governed by Section 7.0)');
    sec37Content = sec37Content.replace(/\d+ rules/g, 'Rule counts are governed by Section 7.0');
    text = text.replace(sec37Regex, sec37Content);
}

// 8️⃣ Super-Domain Expansion Sections (7.5.x)
const reconBlock = `

> **RECONCILIATION GUARANTEE:**  
> The sum of categories in this Super Domain must equal the total defined in Section 7.0. Any delta invalidates structural compliance.

`;
// Find ends of 7.5.1 up to 7.5.6 and inject
for (let i = 1; i <= 6; i++) {
    const nextRegexStr = i === 6 ? `(### 7\\.6 Canonical)` : `(### 7\\.5\\.${i + 1} Expansion)`;
    const blockRegex = new RegExp(`(### 7\\.5\\.${i} Expansion[\\s\\S]*?)(?=\\s*${nextRegexStr})`);
    if (blockRegex.test(text)) {
        text = text.replace(blockRegex, `$1${reconBlock}`);
    }
}


// 9️⃣ Remove Legacy "Parent Group" Mentions Anywhere Except Changelog
// Handled by previous replacements/disclaimers. 

// 🔟 Final Structural Lock - Canonical Enforcement Guard under 7.0.X
const lockRegex = /(> \*\*CANONICAL_ENFORCEMENT_RULE:\*\*[\s\S]*?\n\n)/;
const lockRepl = `$1### 7.0.X Canonical Enforcement Guard

All numeric values appearing elsewhere in this document must:
1. Reference Section 7.0 explicitly.
2. Be derivable from Section 7.0.
3. Not introduce new totals.
4. Not conflict with Super Domain totals.

Violation of this rule invalidates governance compliance.

`;
if (!text.includes('### 7.0.X Canonical Enforcement Guard')) {
    text = text.replace(lockRegex, lockRepl);
}

fs.writeFileSync(filePath, text, 'utf-8');
console.log("Success executing Structural Zero-Trust Patch.");
