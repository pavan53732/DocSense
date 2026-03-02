const fs = require('fs');

const filePath = String.raw`c:\Users\pavan\projects\DocSense\docs\DOCSENSE_COMPLETE_DOCUMENTATION.md`;
let text = fs.readFileSync(filePath, 'utf-8');

// 1. Section 1.1
text = text.replace(/\*\*1,560 multi-domain engineering and desktop safety rules\*\*/g, '**(Ref: Section 7.0) multi-domain engineering and desktop safety rules**');

// 2. Section 1.4
text = text.replace(/\| \*\*1,560 Rule Engine\*\* \|/g, '| **Rule Engine (Ref: Section 7.0)** | Comprehensive validation across canonical categories |');
text = text.replace(/\| \*\*Auto-Fix Capabilities\*\* \| Automatic corrections for 890 common issues \|/g, '| **Auto-Fix Capabilities** | Automatic corrections for (Ref: Section 7.0) common issues |');
text = text.replace(/\| \*\*Framework Detection\*\* \| Auto-detects 62 frameworks \|/g, '| **Framework Detection** | Auto-detects frameworks (Ref: Section 7.0) |');

// 3. Section 5.3 interface DashboardMetrics
text = text.replace(/totalRules: 1560;/g, `totalRules: number; // Must be sourced from Section 7.0 canonical block\n\n// CANONICAL_BINDING:\n// totalRules must be dynamically sourced from Section 7.0.\n// Hardcoding canonical constants outside Section 7.0 is prohibited.`);

// 4. Section 7 Introduction
text = text.replace(/consists of \*\*1,560 rules\*\*/g, 'consists of rules governed by the Canonical Statistics Block (Ref: Section 7.0).');

// 5. Section 28.5 TOC Anchor
text = text.replace(/#desktop counts \(Ref: Section 7\.0\)-animation-heuristic-patterns/g, '#285-animation-heuristic-patterns');
text = text.replace(/#desktop-counts-ref-section-70-animation-heuristic-patterns/g, '#285-animation-heuristic-patterns');
text = text.replace(/desktop counts \(Ref: Section 7\.0\)\s*Animation Heuristic/g, '285 Animation Heuristic');

// 6. Historical Sections Arithmetic Live Proofs wrap
// Look for lines containing "560+520+610+420+320+70 = 2,480"
if (text.includes("560+520+610+420+320+70 = 2,480")) {
    text = text.replace(/(\*\*\s*New breakdown:[\s\S]*?)(?=191\+39\+15 = 245[\s\S]*?\n\n)/g, match => {
        if (match.includes("⚠️ HISTORICAL NUMERIC BLOCK")) return match;
        return `> ⚠️ HISTORICAL NUMERIC BLOCK — NON-CANONICAL\n> The following arithmetic reflects pre-v8.0 validation and must not be referenced as authoritative.\n\n${match}`;
    });
}

// And more aggressively grab the two arithmetic blocks in 7.9 that the user singled out
const arithMatch1 = /- New breakdown: Core:560 \+ Security:520 \+ Platform:610 \+ Performance:420 \+ AI:320 \+ Governance:70 = 2,480\n/g;
const arithRepl1 = `> ⚠️ HISTORICAL NUMERIC BLOCK — NON-CANONICAL\n> The following arithmetic reflects pre-v8.0 validation and must not be referenced as authoritative.\n> - New breakdown: Core:560 + Security:520 + Platform:610 + Performance:420 + AI:320 + Governance:70 = 2,480\n`;
text = text.replace(arithMatch1, arithRepl1);

const arithMatch2 = /  - 191\+39\+15 = 245 risk sum vs 175 auto-fixable rules\.\n/g;
const arithRepl2 = `> ⚠️ HISTORICAL NUMERIC BLOCK — NON-CANONICAL\n> The following arithmetic reflects pre-v8.0 validation and must not be referenced as authoritative.\n>   - 191+39+15 = 245 risk sum vs 175 auto-fixable rules.\n`;
text = text.replace(arithMatch2, arithRepl2);

// 7. Global regex sweep for stray **1,560, **890, **62, : 1560, : 890, : 62
const lines = text.split('\n');
let inSection70 = false;
for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('## 7.0 Canonical Statistics Block')) inSection70 = true;
    if (lines[i].startsWith('## 7.1') || lines[i].startsWith('### 7.1')) inSection70 = false;

    if (!inSection70 && !lines[i].includes('HISTORICAL') && !lines[i].includes('Historical') && !lines[i].includes('NUMERIC_GOVERNANCE_CHECK')) {
        lines[i] = lines[i].replace(/\*\*1,560\b(?!\s*\(Ref)/gi, '**(Ref: Section 7.0)');
        lines[i] = lines[i].replace(/\*\*890\b(?!\s*\(Ref)/gi, '**(Ref: Section 7.0)');
        lines[i] = lines[i].replace(/\*\*62\b(?!\s*\(Ref)/gi, '**(Ref: Section 7.0)');

        lines[i] = lines[i].replace(/:\s*1560\b(?!\s*\(Ref)/gi, ': (Ref: Section 7.0)');
        lines[i] = lines[i].replace(/:\s*890\b(?!\s*\(Ref)/gi, ': (Ref: Section 7.0)');
        lines[i] = lines[i].replace(/:\s*62\b(?!\s*\(Ref)/gi, ': (Ref: Section 7.0)');
    }
}
text = lines.join('\n');

fs.writeFileSync(filePath, text, 'utf-8');
console.log("True Zero-Drift Enforcement Sweep Complete.");
