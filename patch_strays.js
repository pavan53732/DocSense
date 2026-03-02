const fs = require('fs');
const filePath = String.raw`c:\Users\pavan\projects\DocSense\docs\DOCSENSE_COMPLETE_DOCUMENTATION.md`;
let text = fs.readFileSync(filePath, 'utf-8');

text = text.replace(/- Updated "Validates against 829 rules" to 914/g, '- Updated "Validates against 829 rules" to 1,560 rules (Ref: Section 7.0)');
text = text.replace(/- Updated "Validates against 689 rules" to 914/g, '- Updated "Validates against 689 rules" to 1,560 rules (Ref: Section 7.0)');
text = text.replace(/- Total Rules: 829 → \*\*914\*\* \(\+85 extended desktop rules\)/g, '- Total Rules: 829 → **914** (⚠️ Historical Note: v7.x – Superseded by v8.0. Non-operational.)');
text = text.replace(/> \| 92 Categories \| 43 Categories \|/g, '> | 92 Categories (Legacy) | 43 Categories |');
text = text.replace(/> \| 914 Rules \| 1,560 Rules \|/g, '> | 914 Rules (Legacy) | 1,560 Rules |');

fs.writeFileSync(filePath, text, 'utf-8');
console.log("Cleaned up stray legacy stats.");
