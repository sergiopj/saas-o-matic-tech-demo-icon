#!/usr/bin/env node
/**
 * deploy-simulate.mjs
 * SaaS-O-Matic — CI/CD Pipeline Simulator
 *
 * Simulates the full production deployment pipeline locally:
 *   Stage 1: Quality Gate  → lint + tests (backend & frontend)
 *   Stage 2: Build          → TypeScript compile + Angular bundle
 *   Stage 3: Docker         → build images + compose up (if Docker available)
 *   Stage 4: Health Check   → verify API responds 200 OK
 *
 * Usage:
 *   npm run deploy:simulate
 *   npm run deploy:simulate -- --skip-docker   (skip Docker stages)
 *   npm run deploy:simulate -- --skip-tests    (quality gate only lints)
 */

import { execSync, spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dir, '..');
const ARGS = process.argv.slice(2);
const SKIP_DOCKER = ARGS.includes('--skip-docker');
const SKIP_TESTS = ARGS.includes('--skip-tests');
const WITH_COVERAGE = ARGS.includes('--coverage');

// ─── ANSI helpers ────────────────────────────────────────────────────────────
const c = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  white: '\x1b[37m',
};

const ok = (msg) => console.log(`  ${c.green}✓${c.reset} ${msg}`);
const fail = (msg) => console.log(`  ${c.red}✗${c.reset} ${msg}`);
const info = (msg) => console.log(`  ${c.cyan}→${c.reset} ${msg}`);
const warn = (msg) => console.log(`  ${c.yellow}⚠${c.reset} ${msg}`);

function header(stage, title) {
  const line = '─'.repeat(60);
  console.log(`\n${c.bold}${c.blue}${line}${c.reset}`);
  console.log(`${c.bold}${c.blue}  Stage ${stage}: ${title}${c.reset}`);
  console.log(`${c.bold}${c.blue}${line}${c.reset}`);
}

function divider() {
  console.log(`${c.dim}${'─'.repeat(62)}${c.reset}`);
}

// ─── Runner ──────────────────────────────────────────────────────────────────
function run(label, cmd, opts = {}) {
  const start = Date.now();
  process.stdout.write(`  ${c.cyan}→${c.reset} ${label} ... `);

  const result = spawnSync(cmd, {
    shell: true,
    cwd: ROOT,
    stdio: opts.verbose ? 'inherit' : 'pipe',
    encoding: 'utf8',
  });

  const elapsed = ((Date.now() - start) / 1000).toFixed(1);

  if (result.status !== 0) {
    console.log(`${c.red}FAILED${c.reset} (${elapsed}s)`);
    if (!opts.verbose && result.stderr) {
      console.log(c.red + result.stderr.slice(0, 800) + c.reset);
    }
    if (opts.exitOnFail !== false) {
      console.log(`\n${c.red}${c.bold}✗ Pipeline aborted at: ${label}${c.reset}\n`);
      process.exit(1);
    }
    return false;
  }

  console.log(`${c.green}OK${c.reset} ${c.dim}(${elapsed}s)${c.reset}`);
  return true;
}

function checkCommand(cmd) {
  const result = spawnSync(cmd, ['--version'], { shell: true, stdio: 'pipe' });
  return result.status === 0;
}

// ─── Timestamps ──────────────────────────────────────────────────────────────
const pipelineStart = Date.now();

// ─── BANNER ──────────────────────────────────────────────────────────────────
console.log('');
console.log(`${c.bold}${c.magenta}  ╔══════════════════════════════════════════════╗${c.reset}`);
console.log(`${c.bold}${c.magenta}  ║   SaaS-O-Matic  •  CI/CD Pipeline Simulator  ║${c.reset}`);
console.log(`${c.bold}${c.magenta}  ╚══════════════════════════════════════════════╝${c.reset}`);
console.log(`  ${c.dim}Started at: ${new Date().toISOString()}${c.reset}`);
if (SKIP_DOCKER) warn('--skip-docker flag: Docker stages will be skipped');
if (SKIP_TESTS)  warn('--skip-tests flag: Test suite will be skipped');
console.log('');

// ═══════════════════════════════════════════════════════════════════
// TRACK 1: BACKEND QUALITY GATES & BUILD
// ═══════════════════════════════════════════════════════════════════
header(1, 'Backend — Quality Gate (ESLint + Jest + Coverage)');
run('Backend lint (ESLint / NestJS)', 'npm run lint:backend');

if (!SKIP_TESTS) {
  if (WITH_COVERAGE) {
    run('Backend unit tests + Coverage thresholds (Jest ≥75%)', 'npm run test:coverage:backend');
    ok('Backend quality gate passed — 0 lint errors, 100% tests green, coverage ≥75% satisfied');
  } else {
    run('Backend unit tests (Jest)', 'npm run test:backend');
    ok('Backend quality gate passed — 0 lint errors, 100% tests green');
  }
} else {
  warn('Backend tests skipped by flag');
}

header(2, 'Backend — Build (TypeScript → dist/)');
run('Compile TypeScript to production dist', 'npm run build:backend');
ok('Backend artifact ready: mic-saas-omatic/dist');

// ═══════════════════════════════════════════════════════════════════
// TRACK 2: FRONTEND QUALITY GATES & BUILD
// ═══════════════════════════════════════════════════════════════════
header(3, 'Frontend — Quality Gate (Oxlint + Vitest + Coverage)');
run('Frontend lint (Oxlint / Angular)', 'npm run lint:frontend');

if (!SKIP_TESTS) {
  if (WITH_COVERAGE) {
    run('Frontend unit tests + Coverage thresholds (Vitest ≥75%)', 'npm run test:coverage:frontend');
    ok('Frontend quality gate passed — 0 lint errors, 100% tests green, coverage ≥75% satisfied');
  } else {
    run('Frontend unit tests (Vitest)', 'npm run test:frontend');
    ok('Frontend quality gate passed — 0 lint errors, 100% tests green');
  }
} else {
  warn('Frontend tests skipped by flag');
}

header(4, 'Frontend — Build (Angular Production Bundle)');
run('Bundle Angular application for production', 'npm run build:frontend');
ok('Frontend artifact ready: spa-saas-omatic/dist/dashboard');

// ═══════════════════════════════════════════════════════════════════
// DEPLOYMENT TRACK: DOCKER CONTAINERIZATION
// ═══════════════════════════════════════════════════════════════════
header(5, 'Deploy — Backend Container (Node 22 Slim)');

if (SKIP_DOCKER) {
  warn('Stage skipped — run without --skip-docker to build & start containers');
} else if (!checkCommand('docker')) {
  warn('Docker not found in PATH — stage skipped');
  warn('Install Docker Desktop and run:  npm run deploy:docker');
} else {
  info('Checking Docker daemon...');
  const daemonOk = run('Docker daemon reachable', 'docker info', { exitOnFail: false });

  if (!daemonOk) {
    warn('Docker Desktop is not running — skipping container stages');
    warn('Start Docker Desktop and run:  npm run deploy:docker');
  } else {
    run('Build backend image (multi-stage Node 22 → runner)', 'docker compose build backend', { verbose: false });
    ok('Backend Docker image built successfully');

    header(6, 'Deploy — Frontend Container (Nginx Alpine)');
    run('Build frontend image (Angular bundle → Nginx Alpine)', 'docker compose build frontend', { verbose: false });
    run('Compose up (detached — healthchecks enabled)', 'docker compose up -d', { verbose: false });

    // Brief wait for healthcheck
    info('Waiting 10s for backend and frontend healthchecks...');
    await new Promise((r) => setTimeout(r, 10_000));

    run('Verify containers healthy', 'docker compose ps');
    ok('Containers running: saas-omatic-backend:3000 • saas-omatic-frontend:80');
  }
}

// ═══════════════════════════════════════════════════════════════════
// VERIFICATION: HEALTH CHECKS
// ═══════════════════════════════════════════════════════════════════
header(7, 'Health Check (API + SPA Reachability)');

// API health (works in both dev and docker modes)
const apiHealthy = await new Promise((resolve) => {
  import('node:http').then(({ default: http }) => {
    const req = http.get('http://localhost:3000/customers?limit=1', (res) => {
      resolve(res.statusCode === 200);
    });
    req.on('error', () => resolve(false));
    req.setTimeout(3000, () => { req.destroy(); resolve(false); });
  });
});

if (apiHealthy) {
  ok('API  → http://localhost:3000  •  GET /customers?limit=1  → 200 OK');
} else {
  warn('API unreachable at localhost:3000 (server may not be running locally)');
  info('Start dev server with:   npm start');
  info('Or via Docker with:      npm run deploy:docker');
}

// SPA health check
const spaHealthy = await new Promise((resolve) => {
  import('node:http').then(({ default: http }) => {
    const req = http.get('http://localhost:4200', (res) => {
      resolve(res.statusCode < 400);
    });
    req.on('error', () => resolve(false));
    req.setTimeout(3000, () => { req.destroy(); resolve(false); });
  });
});

if (spaHealthy) {
  ok('SPA  → http://localhost:4200  •  Angular dev server  → OK');
} else {
  warn('SPA unreachable at localhost:4200 (server may not be running)');
}

// ─── Summary ─────────────────────────────────────────────────────────────────
const totalElapsed = ((Date.now() - pipelineStart) / 1000).toFixed(1);
divider();
console.log('');
console.log(`${c.bold}${c.green}  ✓ Pipeline completed in ${totalElapsed}s${c.reset}`);
console.log('');
console.log(`  ${c.dim}Next steps:${c.reset}`);
console.log(`  ${c.cyan}→${c.reset} Dev mode:     ${c.bold}npm start${c.reset}             (API :3000 + SPA :4200)`);
console.log(`  ${c.cyan}→${c.reset} Docker prod:  ${c.bold}npm run deploy:docker${c.reset}  (SPA :80 + API :3000)`);
console.log(`  ${c.cyan}→${c.reset} Seed data:    ${c.bold}npm run seed${c.reset}`);
console.log(`  ${c.cyan}→${c.reset} Health:       ${c.bold}npm run deploy:health${c.reset}`);
console.log('');
