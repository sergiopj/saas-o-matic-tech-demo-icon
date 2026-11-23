# SaaS-O-Matic: AI Agent Operational Guidelines & Rules
# Universal Agent Configuration (Antigravity, Cursor, Gemini CLI, Claude Code, GitHub Copilot)

You are an expert full-stack software engineer and architect working on **SaaS-O-Matic (Dynamic Billing & Subscription Optimizer)**.
Whenever you operate in this repository, you MUST strictly adhere to the following architectural, coding, accessibility, and styling rules.

---

## 1. General Principles & Language Policy
- **Code in English**: All classes, variables, methods, interfaces, DTOs, tests, and git commits must be written in canonical, idiomatic English.
- **Documentation in Spanish**: Explanations, architectural logs, and markdown documentation files (`ai-workspace/`) must be written in professional Spanish.
- **Verification First**: After any modification, always execute linting and tests to ensure 0 errors and 0 warnings.
  - Frontend: `npm --prefix spa-saas-omatic run lint` (Oxlint) and `npm --prefix spa-saas-omatic test` (Vitest).
  - Backend: `npm --prefix mic-saas-omatic test` (Jest).

---

## 2. Frontend Guidelines (`spa-saas-omatic` / Angular 22)

### A. Styling & Design Tokens (SSOT in `src/styles/_colors.scss`)
- **Strict Prohibition of Hardcoded Hex & Raw RGB/RGBA Colors**: Never use direct hex color codes (e.g., `#1061e2`, `#64748b`, `#ffffff`) or raw decimal RGB/RGBA values (e.g., `rgba(16, 97, 226, 0.08)`, `rgba(239, 68, 68, 0.12)`) inside component `.scss` files. These violate the Single Source of Truth (SSOT) and break Dark Theme dynamic contrast. For subtle highlights, active states, chips, and alerts, use the official `--omatic-*-subtle` tokens (e.g., `--omatic-accent-blue-subtle`, `--omatic-status-error-subtle`) or modern CSS `color-mix(in srgb, var(--omatic-token) X%, transparent)`.
- **Strict Prohibition of Variable Fallbacks**: Never declare fallback hex values in CSS variables (e.g., `var(--omatic-text-secondary, #64748b)` or `var(--omatic-accent-blue, #1061e2)`). Fallbacks violate the Single Source of Truth (SSOT), break theming, and duplicate declarations. Always invoke tokens cleanly: `color: var(--omatic-text-secondary);`.
- **Omatic Brand Tokens**: Use the official `--omatic-*` tokens defined in `src/styles/_colors.scss`:
  - Brand: `--omatic-primary`, `--omatic-primary-light`, `--omatic-primary-dark`, `--omatic-accent-blue`, `--omatic-accent-blue-hover`, `--omatic-accent-cyan`, `--omatic-accent-purple`.
  - Subtle Tints & Highlights: `--omatic-accent-blue-subtle`, `--omatic-accent-blue-subtle-hover`, `--omatic-accent-purple-subtle`, `--omatic-status-success-subtle`, `--omatic-status-warning-subtle`, `--omatic-status-error-subtle`, `--omatic-status-error-subtle-hover`.
  - Surfaces: `--omatic-bg-page`, `--omatic-bg-card`, `--omatic-surface`, `--omatic-bg-input-dark`.
  - Typography: `--omatic-text-primary`, `--omatic-text-secondary`, `--omatic-text-muted`, `--omatic-text-inverse`.
  - Feedback: `--omatic-status-success`, `--omatic-status-warning`, `--omatic-status-error`, `--omatic-status-info`.
  - Borders: `--omatic-border`, `--omatic-border-light`, `--omatic-border-inverse`.
- **Zero Tailwind**: Do not install or introduce Tailwind CSS. Rely exclusively on modular SCSS (7-1 pattern) and Angular Material.
- **Strict Prohibition of Generic Transitions (`transition: all`)**: Never use `transition: all` or unspecified transitions without explicit property targets. Always declare the exact CSS properties that animate (e.g., `transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out;`). This avoids unnecessary browser layout repaints/reflows and complies with SonarQube rule `css:S9449` ("Specify which properties should transition so future style changes do not animate unexpectedly").

### B. Form Validation & Reactive State
- **Instant Dirty Validation**: Use `ShowOnDirtyErrorStateMatcher` with reactive `FormControl` so validation errors trigger immediately as the user types (`control.dirty`), rather than waiting for blur.
- **Email Validation**: Enforce RFC 5322 regex validation pattern with TLD requirement of at least 2 characters.
- **Accessible Feedback**: Display descriptive `<mat-error>` messages with multi-language i18n support (`es`, `en`, `de`, `fr`).
- **Dynamic Locale-Aware Fiscal Inputs**: When forms include fiscal jurisdiction selectors (e.g. `country`), both the field placeholder (`[placeholder]="taxIdPlaceholder()"`) and validation error feedback (`invalidSpanishTaxId` vs `invalidInternationalTaxId`) must be reactive and context-aware. Never display Spain-specific AEAT error text or CIF examples when an international jurisdiction is selected (e.g. Germany, France, US); provide localized examples (e.g., DE999888777) and tailored error messages explaining character length requirements (5-20 alphanumeric characters).
- **Permanent Floating Labels on Fields with Placeholders (`floatLabel="always"`)**: When a `<mat-form-field>` has both a `<mat-label>` and an `<input [placeholder]="...">`, always set `floatLabel="always"`. This prevents the floating label from resting at the baseline over the placeholder text when the field is empty and unfocused, eliminating text collision and visual jank.

### C. Web Accessibility (W3C A11y Standards)
- **First Rule of ARIA (Native Elements First)**: Do NOT use `role="status"` on generic `<div>` tags. Use native HTML5 `<output class="..." aria-live="polite">` elements (resolves SonarQube `Web:S6819`).
- **Full i18n on ARIA Attributes, Image Alt & Visual Elements**: All accessibility labels (`aria-label`, `aria-description`, tooltips), image alternative texts (`[alt]="'...' | translate"`), `[attr.title]`, and visual badges MUST use dynamic localized strings via `TranslatePipe` or `I18nService.t(...)`. Never leave hardcoded literal strings or untranslated descriptive attributes in templates (e.g. `alt="Clientes Corporativos"`, `title="Tramo 1 (0–10)"`), ensuring complete parity across all 4 supported locales (`es`, `en`, `de`, `fr`).
- Ensure all interactive elements have appropriate ARIA attributes, semantic tags, and keyboard navigation.

### D. Performance & Architecture
- **Signals & Modern Standalone (Angular 19+)**: Use Angular Signals (`signal`, `computed`, `effect`) and standalone components. Avoid legacy NgModules. In Angular 19+, `standalone: true` is enabled by default across all `@Component`, `@Directive`, and `@Pipe` decorators: never write `standalone: true` explicitly as it is redundant boilerplate.
- **Clean Signal State Mutations**: Prefer natural, readable signal updates (`signal.set(!signal())`) for boolean flag toggles over cryptic lambdas (`signal.update((v) => !v)`). Reserve `.update()` for actual transformations involving previous state calculations (e.g., array manipulations or arithmetic bounds).
- **Centralized Feedback & Notification (`ToastService`)**: Never call `MatSnackBar.open(...)` directly inside components with manual positioning or duration parameters. Always use `ToastService` (`this.toast.success(...)`, `this.toast.error(...)`, `this.toast.show(...)`) to ensure a Single Source of Truth (SSOT) for toast notifications across the entire frontend.
- **Component Decomposition & Reuse (`<app-paginator>`, `<app-customer-carousel>`)**: Never duplicate pagination mathematics or pagination HTML markup in page components. Delegate pagination to the reusable `<app-paginator>` standalone component. Similarly, isolate interactive swipe/touch carousels and sliding track math into dedicated presentation components (e.g., `<app-customer-carousel>`) rather than bloating top-level dashboard pages with low-level window resize and pointer drag handlers.
- **Lazy Loading**: Heavy third-party integrations (e.g., Quill rich-text editor) must be lazily loaded in separate chunks to keep the initial main bundle under 165 kB.
- **DOM Containment**: Apply `content-visibility: auto; contain-intrinsic-size: auto 240px;` on repeating card items to maximize 60 FPS rendering in large grids.
- **Idiomatic Standard APIs Over Archaic Ternaries (`padStart`, `Number.isFinite`, Action Maps)**: Always leverage modern ECMAScript standard APIs (e.g. `String(val).padStart(len, '0')`, `Number.isFinite(val)`) instead of legacy manual ternaries (`val < 10 ? '0' + val : '' + val`) or global coercion functions (`isNaN`). When dispatching keyboard shortcuts or key events, normalize keys via `.toLowerCase()` and dispatch using typed action maps (`Record<string, () => void>`) or explicit switches with early returns rather than redundant cascading `if/else if` chains with repeated `preventDefault()`.
- **Strict Prohibition of Hardcoded Multilingual Content or Procedural Language Switches in Services**: Never hardcode translated copy, inline multilingual dictionaries (`Record<string, Record<string, string>>`), or procedural `switch (lang)` blocks inside TypeScript services or components. All client-facing UI strings, prompt queries, fallbacks, and error texts MUST flow through the Single Source of Truth for i18n (`I18nService.t(...)` via `translations.ts`). Furthermore, all rich business domain knowledge, FAQs, and documentation must reside in the backend data/API layer (Database & REST API), consumed via dedicated API clients with transparent offline fallback, preventing client bundle bloat and maintaining strict Separation of Concerns.

---

## 3. Backend Guidelines (`mic-saas-omatic` / NestJS)

### A. Hexagonal Architecture (Ports & Adapters)
- **Immaculate Domain**: Pure TypeScript domain entities, value objects, and domain services. Never import NestJS, TypeORM, or HTTP decorators into the `domain/` layer.
- **Ports & Adapters**:
  - `application/ports/in/`: Use case interfaces.
  - `application/ports/out/`: Repository and external service interfaces.
  - `infrastructure/adapters/in/rest/`: NestJS controllers, request DTOs, and response serializers.
  - `infrastructure/adapters/out/persistence/`: TypeORM entities, repositories, and persistence mappers.

### B. Security & Safe Dispatching
- **Anti-XSS & ReDoS Prevention**: Sanitize all incoming rich HTML payloads using an OWASP-compliant sanitizer (`HtmlSanitizerService`) before processing or persistence. Regular expressions used in sanitizers MUST be strictly linear ($\mathcal{O}(N)$) and free from super-linear backtracking (SonarQube `typescript:S8786`). Never start unanchored attribute-stripping patterns with greedy quantifiers like `\s*` or `.*`; use zero-width word boundaries (`\bon[a-z]+`) to prevent Regular Expression Denial of Service.
- **Safe Transactional Mocking**: For external service dispatching (e.g., email sending, payment gateways), use decoupled transactional domain stubs with structured logging. Never hardcode live third-party credentials or API keys into git repositories.

### C. Database & Fiscal Precision
- **Precision Financials**: Persist all currency values using `@Column('decimal', { precision: 10, scale: 2 })` (and `scale: 4` for rates) to avoid IEEE 754 floating-point inaccuracies.
- **SQLite WAL Mode**: Configure SQLite with `enableWAL: true` for high-concurrency non-blocking reads and writes.
- **Standardized Errors**: Translate all exceptions to IETF RFC 7807 Problem Details (`application/problem+json`).

### D. Anti-Overengineering, Clean Code & Pragmatism
- **No Pretentious Value Objects without Business Behavior**: Do NOT create empty wrapper classes, `.vo.ts` files, or dedicated orphan folders for trivial string trimming or basic regex sanitization. Use clean, focused utility functions within the relevant domain service (e.g., `normalizeTaxId` inside `tax-id.validator.ts`) unless a Value Object genuinely encapsulates rich invariants and is actively used across entities.
- **Ubiquitous Language & No Spec-Anchored Regional Coupling**: Name domain services, validators, and entities using domain-driven ubiquitous language (e.g., `tax-id.validator.ts`, not `spanish-fiscal.validator.ts`). Even if initial challenge prompts emphasize a specific country, domain services must reflect the universal business capability with internal delegation to locale-specific rules, preventing semantic mismatches when multi-region support expands.
- **Zero Dead Code & Zero Unused Artifacts**: Never create or leave uninstantiated classes, unused interfaces, or orphaned methods. If code is unreferenced, delete it immediately.
- **Single-Purpose Function Signatures**: When refactoring to Parameter Objects (e.g., `CustomerSearchCriteria`), completely eliminate legacy positional parameters and runtime type-sniffing shims (`typeof arg === 'object'`). Keep signatures lean, predictable, and single-purpose.
- **DRY Domain Invariants**: Encapsulate domain validation rules in cohesive private static helper methods within the domain entity rather than scattering raw validation lines across `create()`, `update()`, or factory methods (e.g., `Customer.validateCompanyName`, `Simulation.validateCustomerId`, `Simulation.validateCountry`, `Simulation.validateActiveUsers`). This enforces the Single Responsibility Principle, leaves entity creation methods orchestrating cleanly in under 10 lines, and isolates business invariants for reuse and future mutation operations.
- **Declarative Controller DTOs Over Manual Parsing**: Never manually parse query strings or body fields using manual ternaries and runtime coercions (e.g., `const pageNum = page ? Number.parseInt(page, 10) : undefined;`). Always encapsulate incoming query parameters into dedicated DTOs with `class-validator` and `class-transformer` decorators (`@Type(() => Number)`, `@IsInt()`, `@Min(1)`). Let NestJS global `ValidationPipe({ transform: true })` handle type coercion and rejection of `NaN` or invalid inputs declaratively.
- **Runtime Value Imports for Controller DTOs**: Never import request body or query parameter DTOs using TypeScript type-only imports (`import type { SomeDto }`). NestJS reflection metadata (`reflect-metadata` via `emitDecoratorMetadata`) requires the concrete runtime class symbol to discover `class-validator` decorators and execute validation via `ValidationPipe`. When `import type` is used, TypeScript erases the class symbol to `Object` or `Function`, causing `ValidationPipe({ forbidNonWhitelisted: true })` to reject all incoming payload properties (`property X should not exist`). Always import DTOs as concrete value classes (`import { SomeDto }`).
- **Clean DTO Contracts Without Redundant Aliases**: Do NOT pollute DTOs with duplicate alias properties (e.g., having both `order` and `sortOrder` on the same request DTO). Unify query parameters around the official API contract (OpenAPI / frontend SSOT), and map them cleanly to domain parameters. Avoid redundant inline type casts inside `@Transform` decorators.
- **No Identity Mirror Dictionaries or Procedural Order Mutations**: Do NOT create useless identity map objects (e.g. `const fieldMap = { companyName: 'companyName', ... }`) that merely map keys to themselves. When resolving default sorting or query fallback directions, write pure, immutable TypeScript with `const` and nullish coalescing (`criteria.sortBy ?? 'createdAt'`, `criteria.sortOrder ?? defaultDirection`) instead of procedural `let` declarations with verbose `if/else` branches.
- **Defensive Pagination Guards Without Verbosity**: In repository query builders and search adapters, enforce pagination bounds cleanly using mathematical bounds (`Math.max(1, criteria?.page ?? 1)`, `Math.max(1, criteria?.limit ?? 20)`) rather than noisy redundant ternaries (`criteria?.page && criteria.page > 0 ? criteria.page : 1`).
- **No Procedural Color Switches or Inline Magic Strings in PDF Generators**: When generating binary PDF documents with PDFKit (where browser CSS variables do not exist), never embed raw hex strings or status labels inside mutable `switch/case` statements. Declare an immutable, typed lookup dictionary (`const INVOICE_STATUS_BADGE_CONFIG: Readonly<Record<...>>`) at module scope. All generated metadata must be in canonical English (`Invoice ${number}`, not `Factura`).
- **Functional Decomposition Over Procedural Spaghetti in Exception Filters**: Never write sprawling `if/else if/else` chains with mutable `let` state inside global exception filters. Decompose error classification into cohesive, module-private pure functions with early returns (`resolveProblemDetail`, `parseHttpException`, `extractInvalidParams`, `handleUnexpectedError`), keeping the filter's `catch()` method purely orchestrational and under 20 lines.
- **Information Hiding & Scope**: Do not indiscriminately export helper functions. Export only the public contract of the module; keep internal algorithmic helpers module-private (unexported).
- **Natural Engineering Comments**: Write natural, concise developer comments in English explaining domain constraints without AI-generated boilerplate, robotic academic tones, or decorative comment banners.

---

## 4. Code Quality, Coverage Thresholds & CI/CD
- **Oxlint Compliance**: Run `oxlint --type-aware src/` and ensure zero warnings and zero errors across both frontend and backend.
- **Strict Coverage Thresholds (SonarQube-Equivalent Quality Gates)**: Enforce code coverage minimums in both test runners (`coverageThreshold` in Jest and `coverageThresholds` in Angular CLI/Vitest):
  - Statements / Lines: $\ge 75\%$ (Current: $>96\%$)
  - Functions / Methods: $\ge 75\%$ (Current: $>96\%$)
  - Branches / Conditions: $\ge 65\%$ (Current: $>83\%$)
  - If any commit or pull request drops coverage below these thresholds, the test runner must exit with code 1 and abort the pipeline.
- **Decoupled CI/CD Pipeline (8 Parallel Jobs)**: The repository maintains an 8-job decoupled GitHub Actions workflow (`.github/workflows/ci-cd.yml`) with independent execution tracks for Backend (Lint $\to$ Test $\to$ Build $\to$ Deploy) and Frontend (Lint $\to$ Test $\to$ Build $\to$ Deploy), publishing live coverage Markdown tables directly into `$GITHUB_STEP_SUMMARY`.
- **Docker & Deployment Hygiene**:
  - Always maintain a root `.dockerignore` excluding `node_modules`, `dist`, `.git`, and test databases to keep build context transfer under 1 MB.
  - Multi-stage Dockerfiles: Node 22 slim `builder` with native compilation tools, and lightweight production `runner` (Nginx 1.27 Alpine for frontend, Node 22 slim for backend).
  - Nginx SPA PushState: `nginx.conf` must route all application navigation via `location / { try_files $uri $uri/ /index.html; }` without intercepting business REST endpoints.
  - Container healthchecks must explicitly target IPv4 loopback (`http://127.0.0.1:80/`) to prevent Alpine IPv6 `::1` connection refused failures.
- **No Dead Code**: Remove unused imports, dead variables, and redundant comments.
- **Strict Typing**: Avoid `any`. Use strict TypeScript types, discriminated unions, and explicit return types.

---

## 5. Traceability & Markdown Documentation Policy (AI Evaluation Governance)
- **Mandatory Synchronous Logging per Prompt**: Every prompt, architectural decision, UI refinement, and technical change MUST be documented synchronously in the corresponding `.md` files (`ai-workspace/03-vibe-coding-log/prompts-and-audits.md`, `ai-workspace/01-specs/functional-specs.md`, `ai-workspace/02-architecture/architecture-guidelines.md`, and module READMEs).
- **Audit-Ready Vibe Coding Dataset**: Every entry in `prompts-and-audits.md` must record the date, context, human prompt verbatim, architectural solution applied, verification results (Oxlint 0/0, 100% test pass rate), and value for the Omatic technical evaluation committee.
