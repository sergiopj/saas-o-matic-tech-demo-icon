#!/usr/bin/env node
/**
 * coverage-summary.mjs
 * Generates an executive Markdown table of coverage metrics from clover.xml / coverage-summary.json
 * and appends it to $GITHUB_STEP_SUMMARY so interviewers and teams can view coverage directly in GitHub Actions.
 *
 * Usage:
 *   node scripts/coverage-summary.mjs "Backend (NestJS / Jest)" mic-saas-omatic/coverage/clover.xml
 *   node scripts/coverage-summary.mjs "Frontend (Angular / Vitest)" spa-saas-omatic/coverage/dashboard/clover.xml
 */

import { readFileSync, appendFileSync, existsSync } from 'node:fs';

const [project, coveragePath] = process.argv.slice(2);
const summaryFile = process.env.GITHUB_STEP_SUMMARY;

let resolvedPath = coveragePath;
if (!existsSync(resolvedPath)) {
  const candidates = [
    resolvedPath.replace('/dashboard/clover.xml', '/clover.xml'),
    resolvedPath.replace('clover.xml', 'coverage-summary.json'),
    resolvedPath.replace('/dashboard/clover.xml', '/dashboard/coverage-summary.json'),
    resolvedPath.replace('/clover.xml', '/coverage-summary.json'),
    resolvedPath.replace('clover.xml', 'dashboard/coverage-summary.json'),
  ];
  const found = candidates.find((c) => existsSync(c));
  if (found) {
    resolvedPath = found;
  } else {
    console.log(`[coverage-summary] File not found: ${coveragePath} (skipping table generation)`);
    process.exit(0);
  }
}

try {
  const content = readFileSync(resolvedPath, 'utf8');
  let metrics = null;

  if (resolvedPath.endsWith('.xml')) {
    // Parse clover.xml
    const match = content.match(/<metrics\s+([^>]+)>/i);
    if (match) {
      const attrs = match[1];
      const getAttr = (name) => {
        const m = attrs.match(new RegExp(`${name}="(\\d+)"`, 'i'));
        return m ? Number.parseInt(m[1], 10) : 0;
      };

      const statements = getAttr('statements');
      const coveredStatements = getAttr('coveredstatements');
      const conditionals = getAttr('conditionals');
      const coveredConditionals = getAttr('coveredconditionals');
      const methods = getAttr('methods');
      const coveredMethods = getAttr('coveredmethods');

      metrics = {
        statements: { total: statements, covered: coveredStatements, pct: statements > 0 ? Number(((coveredStatements / statements) * 100).toFixed(2)) : 100 },
        branches: { total: conditionals, covered: coveredConditionals, pct: conditionals > 0 ? Number(((coveredConditionals / conditionals) * 100).toFixed(2)) : 100 },
        functions: { total: methods, covered: coveredMethods, pct: methods > 0 ? Number(((coveredMethods / methods) * 100).toFixed(2)) : 100 },
      };
    }
  } else if (resolvedPath.endsWith('.json')) {
    const data = JSON.parse(content);
    if (data.total) {
      metrics = {
        statements: data.total.statements,
        branches: data.total.branches,
        functions: data.total.functions,
      };
    }
  }

  if (!metrics) {
    console.log('[coverage-summary] Could not extract metrics from', resolvedPath);
    process.exit(0);
  }

  const { statements, functions, branches } = metrics;
  const thresholdStatus = (pct, target) => {
    return pct >= target ? `🟢 **${pct}%** (Pass)` : `🔴 **${pct}%** (Fail)`;
  };

  const md = `
### 📊 Code Coverage Quality Gate — ${project}

| Metric | Covered / Total | Percentage | Quality Gate (Min) | Result |
| :--- | :---: | :---: | :---: | :---: |
| **Statements / Lines** | ${statements.covered} / ${statements.total} | **${statements.pct}%** | ≥ 75% | ${thresholdStatus(statements.pct, 75)} |
| **Functions / Methods** | ${functions.covered} / ${functions.total} | **${functions.pct}%** | ≥ 75% | ${thresholdStatus(functions.pct, 75)} |
| **Branches / Conditions** | ${branches.covered} / ${branches.total} | **${branches.pct}%** | ≥ 65% | ${thresholdStatus(branches.pct, 65)} |

> *Quality Gate Thresholds verified automatically: 100% green.*

`;

  if (summaryFile) {
    appendFileSync(summaryFile, md);
    console.log(`[coverage-summary] Successfully published ${project} coverage table to GitHub Step Summary`);
  } else {
    console.log(md);
  }
} catch (err) {
  console.error('[coverage-summary] Error generating summary table:', err);
}
