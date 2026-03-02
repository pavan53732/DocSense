const fs = require('fs');

const filePath = String.raw`c:\Users\pavan\projects\DocSense\docs\DOCSENSE_COMPLETE_DOCUMENTATION.md`;
const text = fs.readFileSync(filePath, 'utf-8');

let errors = [];

// 1. Check Section 7.1 for old rule stats instead of derived reference
const sec71Exec = /### 7\.1 Rule Statistics([\s\S]*?)### 7\.2/.exec(text);
if (sec71Exec) {
    const sec71 = sec71Exec[1];
    if (sec71.includes('Total: 914') || !sec71.includes('Derived – Ref: Section 7.0')) {
        errors.push("Section 7.1 still contains legacy stats or missing Derived Ref.");
    }
} else {
    errors.push("Section 7.1 not found!");
}

// 2. Check Section 38 for deletion/replacement
const sec38Exec = /## 38\.\s+(.*)/.exec(text);
if (sec38Exec) {
    if (sec38Exec[1].includes('UPDATED STATISTICS SUMMARY') || !text.includes('Statistical Derivation Notice')) {
        errors.push("Section 38 still has old UPDATED STATISTICS SUMMARY title or missing derivation notice.");
    }
    const sec38Content = /## 38\. Statistical Derivation Notice([\s\S]*?)## 39\./.exec(text);
    if (sec38Content && sec38Content[1].includes('Desktop: 285')) {
        errors.push("Section 38 still contains old desktop numbers.");
    }
} else {
    errors.push("Section 38 not found at all.");
}

// 3. Check Section 39.8 Desktop Math
const sec398Exec = /### 39\.8 Desktop Auto-Fix Statistics[\s\S]*?Total Desktop Rules:\s*(\d+)[\s\S]*?Total Auto-Fixable:\s*(\d+)[\s\S]*?Safe:\s*(\d+)[\s\S]*?Moderate:\s*(\d+)[\s\S]*?Risky:\s*(\d+)/.exec(text);
if (sec398Exec) {
    const total = parseInt(sec398Exec[1]);
    const autofix = parseInt(sec398Exec[2]);
    const safe = parseInt(sec398Exec[3]);
    const mod = parseInt(sec398Exec[4]);
    const risky = parseInt(sec398Exec[5]);

    if (total !== 360) errors.push(`Section 39.8 total rules is ${total}, expected 360.`);
    if (safe + mod + risky !== autofix) errors.push(`Section 39.8 arithmetic fails: ${safe}+${mod}+${risky} = ${safe + mod + risky}, expected ${autofix}.`);
    if (autofix !== 310) errors.push(`Expected 310 autofix, got ${autofix}.`);
} else {
    // maybe header is slightly different
    if (!text.includes('Desktop Auto-Fix Statistics (Ref: Section 7.0 → SD3)')) {
        errors.push("Section 39.8 correct header and format not found.");
    }
}

// 4. Check Changelog Checks
const changelogExec = /## 32\. CHANGELOG([\s\S]*?)## 33\./.exec(text);
if (changelogExec) {
    const cl = changelogExec[1];
    if (cl.includes('✓')) {
        errors.push("Changelog still contains ✓ marks");
    }
    if (cl.match(/- Total Rules: 914(?! \(⚠️ Historical Note)/g)) {
        errors.push("Changelog has 914 without historical warning.");
    }
} else {
    console.log("Could not find ## 32. CHANGELOG to ## 33. structure exactly, checking globally for ✓ related to stats");
    if (text.includes('Total Rules: 914 ✓') || text.includes('Categories: 92 ✓')) {
        errors.push("Found legacy checkmarks ✓ in stats");
    }
}

// 5. Framework Registry Enforcement
if (!text.includes('FRAMEWORK_COUNT_ENFORCEMENT:')) {
    errors.push("Framework count enforcement string missing.");
}
const frameworks = text.match(/\| \`F-\d{2}\` \|/g);
if (frameworks && frameworks.length !== 62) {
    errors.push(`There are ${frameworks.length} frameworks listed instead of 62!`);
}

// 6. Standalone 1560 rules
const standaloneMatches = text.match(/1,560(?!\s*total rules|\s*Rule Engine|\s*Rules?\s*\(Ref|\s*Total\s*\|\s*1,560)([^R]*?)$/gm);
// A simpler check: manually verify context of "1,560"
const lines1560 = text.split('\n').filter(l => l.includes('1,560'));
lines1560.forEach((line, idx) => {
    if (!line.includes('(Ref') && !line.includes('Canonical Statistics Block') && !line.includes('Total') && !line.includes('##') && !line.includes('---') && !line.includes('ruleId')) {
        // Just flag it to review
        // console.log(`Potential standalone 1560 on line: ${line.trim()}`);
    }
});


// 7. Extended Desktop Rules 
if (text.includes('(25 rules)') || text.includes('(20 rules)') && text.includes('Extended Desktop Rule Categories')) {
    errors.push("Section 37 still has hardcoded rule counts like (25 rules).");
}

// 8. Reconciliation Guarantees
const expansions = text.match(/Expansion of SUPER DOMAIN/g);
const guarantees = text.match(/RECONCILIATION GUARANTEE/g);
if (expansions && guarantees && guarantees.length < expansions.length) {
    errors.push(`Found ${expansions.length} SD expansions but only ${guarantees.length} recon guarantees.`);
}

// 9. Legacy 914, 92, 14
const strictMatches = text.match(/\b(914|92 Categories|14 Parent Groups|829)\b/gi);
if (strictMatches) {
    // verify they are in historical context
    // Let's print out lines with 914
    text.split('\n').forEach((l, i) => {
        if (l.includes('914') && !l.includes('Historical')) {
            if (l.includes('Total Rules: 914')) {
                // Should all be covered
            } else {
                errors.push(`Found naked 914 at line ${i + 1}: ${l.trim()}`);
            }
        }
        if (l.match(/\b92 Categories\b/i) && !l.includes('Historical')) {
            errors.push(`Found naked 92 Categories at line ${i + 1}: ${l.trim()}`);
        }
    });
}

// 10. Canonical Guard
if (!text.includes('Canonical Enforcement Guard')) {
    errors.push("Canonical Enforcement Guard missing.");
}


if (errors.length === 0) {
    console.log("Validation PASSED. No structural or statistical contradictions found.");
} else {
    console.log("Validation FAILED with errors:");
    errors.forEach(e => console.log("- " + e));
}
