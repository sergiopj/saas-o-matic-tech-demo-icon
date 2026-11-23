import { inject, Injectable, signal } from '@angular/core';
import { I18nService } from '../../../core/services/i18n.service';
import {
  ChatAction,
  ChatMessage,
  KnowledgeTopic,
  QuickPrompt,
} from '../models/ai-assistant.model';

export const AI_KNOWLEDGE_TOPICS: readonly KnowledgeTopic[] = [
  {
    id: 'pricing_tiers',
    keywords: [
      'tramo',
      'tramos',
      'precio',
      'precios',
      'tarifa',
      'tarifas',
      'tarificacion',
      'tarificación',
      'tier',
      'tiers',
      'pricing',
      'calcular',
      'coste',
      'costes',
      'usuario',
      'usuarios',
      'marginal',
      'acumulativo',
      'almacenamiento',
      'api',
      'storage',
    ],
    titles: {
      es: 'Motor de Tarificación Dinámica por Tramos',
      en: 'Dynamic Tiered Pricing Engine',
      de: 'Dynamische Staffelpreis-Engine',
      fr: 'Moteur de Tarification par Paliers Dynamique',
    },
    content: {
      es: `El motor de tarificación de SaaS-O-Matic aplica una tarificación acumulativa progresiva por tramos marginales basada en usuarios activos, almacenamiento y llamadas a API:

• **Tramo 1 (0–10 usuarios):** 10,00 € / usuario
• **Tramo 2 (11–50 usuarios):** 8,00 € / usuario
• **Tramo 3 (>50 usuarios):** 5,00 € / usuario
• **Almacenamiento adicional:** 0,15 € por GB
• **Consumo de API:** 0,001 € por llamada

**Ejemplo de cálculo para 60 usuarios:**
(10 × 10 €) + (40 × 8 €) + (10 × 5 €) = 100 € + 320 € + 50 € = **470,00 €** base mensual.
El cálculo es progresivo y respeta las tarifas inmutables del servidor.`,
      en: `SaaS-O-Matic's billing engine applies progressive cumulative marginal tiers based on active users, storage, and API calls:

• **Tier 1 (0–10 users):** €10.00 / user
• **Tier 2 (11–50 users):** €8.00 / user
• **Tier 3 (>50 users):** €5.00 / user
• **Additional storage:** €0.15 per GB
• **API usage:** €0.001 per call

**Example calculation for 60 users:**
(10 × €10) + (40 × €8) + (10 × €5) = €100 + €320 + €50 = **€470.00** monthly base.
The calculation is marginal and governed authoritatively by the backend.`,
      de: `Die Abrechnungs-Engine von SaaS-O-Matic wendet progressive kumulative Staffelpreise an:

• **Stufe 1 (0–10 Benutzer):** 10,00 € / Benutzer
• **Stufe 2 (11–50 Benutzer):** 8,00 € / Benutzer
• **Stufe 3 (>50 Benutzer):** 5,00 € / Benutzer
• **Zusätzlicher Speicher:** 0,15 € pro GB
• **API-Aufrufe:** 0,001 € pro Aufruf

**Berechnungsbeispiel für 60 Benutzer:**
(10 × 10 €) + (40 × 8 €) + (10 × 5 €) = 100 € + 320 € + 50 € = **470,00 €** monatliche Basis.`,
      fr: `Le moteur de facturation SaaS-O-Matic applique des paliers cumulatifs marginaux progressifs :

• **Palier 1 (0–10 utilisateurs) :** 10,00 € / utilisateur
• **Palier 2 (11–50 utilisateurs) :** 8,00 € / utilisateur
• **Palier 3 (>50 utilisateurs) :** 5,00 € / utilisateur
• **Stockage supplémentaire :** 0,15 € par Go
• **Appels API :** 0,001 € par appel

**Exemple de calcul pour 60 utilisateurs :**
(10 × 10 €) + (40 × 8 €) + (10 × 5 €) = 100 € + 320 € + 50 € = **470,00 €** base mensuelle.`,
    },
    actions: [
      {
        labels: {
          es: 'Abrir Simulador de Tramos',
          en: 'Open Pricing Simulator',
          de: 'Staffel-Simulator öffnen',
          fr: 'Ouvrir le Simulateur',
        },
        route: '/simulations',
        icon: 'calculate',
      },
    ],
    sources: [
      'ai-workspace/01-specs/functional-specs.md (Sec. 2.3)',
      'PricingEngineService (Backend/Frontend SSOT)',
    ],
  },
  {
    id: 'fiscal_aeat',
    keywords: [
      'cif',
      'nif',
      'dni',
      'nie',
      'fiscal',
      'aeat',
      'validacion',
      'validación',
      'validar',
      'impuesto',
      'impuestos',
      'vat',
      'hacienda',
      'algoritmo',
      'control',
      'jurisdiccion',
      'jurisdicción',
      'tax',
      'taxid',
    ],
    titles: {
      es: 'Validación Fiscal Algorítmica Estricta (AEAT e Internacional)',
      en: 'Strict Algorithmic Fiscal Validation (AEAT & International)',
      de: 'Strikte algorithmische Steuerprüfung (AEAT & International)',
      fr: 'Validation Fiscale Algorithmique Stricte (AEAT et International)',
    },
    content: {
      es: `SaaS-O-Matic verifica identificadores fiscales algorítmicamente según la jurisdicción:

• **España (ES) - Algoritmos Oficiales de la AEAT:**
  - **DNI:** 8 dígitos numéricos + letra mediante módulo 23 con tabla \`TRWAGMYFPDXBNJZSQVHLCKE\`.
  - **NIE:** Prefijo X (0), Y (1) o Z (2) seguido de 7 dígitos y letra de control módulo 23.
  - **CIF:** Letra de entidad + 7 dígitos + carácter de control (Luhn ponderado sobre dígitos pares e impares ×2). Letra obligatoria para K, P, Q, S; número para A, B, E, H; mixto para el resto.
• **Internacional (DE, FR, US, CH):** Formato alfanumérico normalizado de 5 a 20 caracteres con ejemplos localizados en el formulario.`,
      en: `SaaS-O-Matic strictly validates tax identifiers algorithmically by jurisdiction:

• **Spain (ES) - Official AEAT Algorithms:**
  - **DNI:** 8 digits + check letter via mod 23 with \`TRWAGMYFPDXBNJZSQVHLCKE\`.
  - **NIE:** Prefix X (0), Y (1), or Z (2) followed by 7 digits and mod 23 check letter.
  - **CIF:** Entity letter + 7 digits + control character (weighted Luhn sum). Mandatory letter for K, P, Q, S; digit for A, B, E, H; alphanumeric for others.
• **International (DE, FR, US, CH):** Normalized 5–20 alphanumeric characters with localized placeholders and error hints.`,
      de: `SaaS-O-Matic validiert Steuer-IDs algorithmisch nach Ländern:

• **Spanien (ES) - Offizielle AEAT-Algorithmen:**
  - **DNI:** 8 Ziffern + Prüfbuchstabe über Modulo 23.
  - **NIE:** Präfix X, Y, Z + 7 Ziffern + Prüfbuchstabe.
  - **CIF:** Organisationsbuchstabe + 7 Ziffern + Prüfzeichen (gewichtete Quersumme).
• **International (DE, FR, US, CH):** 5 bis 20 alphanumerische Zeichen.`,
      fr: `SaaS-O-Matic valide les identifiants fiscaux selon la juridiction :

• **Espagne (ES) - Algorithmes officiels AEAT :**
  - **DNI :** 8 chiffres + lettre de contrôle via modulo 23.
  - **NIE :** Préfixe X, Y, Z + 7 chiffres + lettre de contrôle modulo 23.
  - **CIF :** Lettre d'entité + 7 chiffres + caractère de contrôle (Luhn pondéré).
• **International (DE, FR, US, CH) :** 5 à 20 caractères alphanumériques.`,
    },
    actions: [
      {
        labels: {
          es: 'Ver Clientes Corporativos',
          en: 'View Corporate Customers',
          de: 'Kunden anzeigen',
          fr: 'Voir les Clients',
        },
        route: '/customers',
        icon: 'groups',
      },
    ],
    sources: [
      'ai-workspace/01-specs/functional-specs.md (Sec. 2.2)',
      'Real Decreto 1065/2007 (Reglamento General Tributario AEAT)',
    ],
  },
  {
    id: 'invoices_pdf',
    keywords: [
      'factura',
      'facturas',
      'invoice',
      'invoices',
      'pdf',
      'descargar',
      'descarga',
      'emitir',
      'anular',
      'anulacion',
      'anulación',
      'cobro',
      'cobros',
      'borrador',
      'draft',
      'issued',
      'paid',
      'cancelled',
      'confirm',
    ],
    titles: {
      es: 'Gestión de Facturas y Generación Binaria de PDF',
      en: 'Invoice Management & Binary PDF Generation',
      de: 'Rechnungsverwaltung & PDF-Generierung',
      fr: 'Gestion des Factures et Génération PDF',
    },
    content: {
      es: `El módulo de facturación comercial gestiona el ciclo de vida documental completo:

• **Numeración Oficial:** Correlativa anual con formato \`INV-YYYY-XXXX\` (ej. INV-2026-0001).
• **Ciclo de Estados:** \`DRAFT\` (Borrador) → \`ISSUED\` (Emitida) → \`PAID\` (Cobrada) o \`CANCELLED\` (Anulada).
• **Anulación Segura y Accesible:** Se ejecuta a través de un diálogo modal propio (\`ConfirmDialogComponent\`), eliminando por completo los bloqueos nativos \`window.confirm\`.
• **Generación PDFKit:** Generación binaria en backend con desglose de tramos, impuestos por país, estado en inglés canónico y descarga directa mediante Blob en streaming.`,
      en: `The billing module manages the complete commercial document lifecycle:

• **Official Sequential Code:** Annual format \`INV-YYYY-XXXX\` (e.g., INV-2026-0001).
• **Lifecycle States:** \`DRAFT\` → \`ISSUED\` → \`PAID\` or \`CANCELLED\`.
• **Accessible Safe Cancellation:** Executed via custom \`ConfirmDialogComponent\`, completely eradicating browser-native \`window.confirm\`.
• **PDFKit Binary Generation:** Server-side binary PDF generation featuring tier breakdowns, fiscal tax rules, canonical English status badges, and direct streaming download.`,
      de: `Das Rechnungsmodul verwaltet den gesamten Beleglebenszyklus:

• **Nummerierung:** \`INV-YYYY-XXXX\` fortlaufend pro Geschäftsjahr.
• **Status:** \`DRAFT\`, \`ISSUED\`, \`PAID\` und \`CANCELLED\`.
• **Sichere Stornierung:** Eigener barrierefreier Bestätigungsdialog (\`ConfirmDialogComponent\`).
• **PDF-Download:** Binäre Server-Generierung via PDFKit.`,
      fr: `Le module de facturation gère le cycle de vie complet des documents :

• **Numérotation séquentielle :** \`INV-YYYY-XXXX\` par année fiscale.
• **États :** \`DRAFT\`, \`ISSUED\`, \`PAID\` et \`CANCELLED\`.
• **Annulation sécurisée :** Dialogue modal accessible (\`ConfirmDialogComponent\`) sans \`window.confirm\`.
• **Téléchargement PDF :** Génération binaire avec PDFKit en backend.`,
    },
    actions: [
      {
        labels: {
          es: 'Ver Facturas y Cobros',
          en: 'View Invoices & Billing',
          de: 'Rechnungen anzeigen',
          fr: 'Voir les Factures',
        },
        route: '/invoices',
        icon: 'receipt_long',
      },
    ],
    sources: [
      'ai-workspace/01-specs/functional-specs.md (Sec. 2.4)',
      'InvoicesService (PDFKit Binary Streaming)',
    ],
  },
  {
    id: 'currencies_sync',
    keywords: [
      'divisa',
      'divisas',
      'moneda',
      'monedas',
      'currency',
      'currencies',
      'eur',
      'usd',
      'gbp',
      'chf',
      'cambio',
      'conversion',
      'conversión',
      'sincronizacion',
      'sincronización',
      'offline',
      'cache',
    ],
    titles: {
      es: 'Divisas Multi-Moneda y Resiliencia Offline',
      en: 'Multi-Currency Support & Offline Resilience',
      de: 'Multi-Währung & Offline-Resilienz',
      fr: 'Multi-Devises et Résilience Hors Ligne',
    },
    content: {
      es: `SaaS-O-Matic soporta 4 divisas corporativas internacionales:

• **EUR (€):** Divisa base de cálculo financiero y persistencia en base de datos.
• **USD ($), GBP (£), CHF (CHF):** Conversión en tiempo real para cotizaciones internacionales.
• **Sincronización:** Conexión en vivo con API pública de tipos de cambio de referencia.
• **Resiliencia Offline:** En caso de corte de red o indisponibilidad del servicio externo, conmuta automáticamente a una caché persistente local sin interrumpir las simulaciones ni las ventas.`,
      en: `SaaS-O-Matic supports 4 international corporate currencies:

• **EUR (€):** Base financial calculation and database persistence currency.
• **USD ($), GBP (£), CHF (CHF):** Real-time conversion for global business proposals.
• **Live Synchronization:** Direct connection to reference exchange rate API.
• **Offline Resilience:** In case of network interruption or third-party downtime, seamlessly falls back to persistent cached rates.`,
      de: `SaaS-O-Matic unterstützt 4 internationale Währungen:

• **EUR (€):** Basiswährung für Kalkulation und Persistenz.
• **USD ($), GBP (£), CHF (CHF):** Live-Umrechnung für internationale Angebote.
• **Offline-Resilienz:** Automatischer Fallback auf gecachte Wechselkurse bei Netzausfall.`,
      fr: `SaaS-O-Matic prend en charge 4 devises internationales :

• **EUR (€) :** Devise de base pour le calcul financier et la persistance.
• **USD ($), GBP (£), CHF (CHF) :** Conversion en temps réel pour devis internationaux.
• **Résilience hors ligne :** Basculement automatique vers les taux en cache en cas de panne réseau.`,
    },
    sources: [
      'ai-workspace/01-specs/functional-specs.md (Sec. 3.4)',
      'CurrencyService (Cache-First Exchange Strategy)',
    ],
  },
  {
    id: 'customers_mgmt',
    keywords: [
      'cliente',
      'clientes',
      'customer',
      'customers',
      'empresa',
      'empresas',
      'alta',
      'registro',
      'crear',
      'email',
      'correo',
      'comercial',
      'filtro',
      'filtros',
      'paginacion',
      'paginación',
    ],
    titles: {
      es: 'Gestión Reactiva de Clientes Corporativos',
      en: 'Reactive Corporate Customer Management',
      de: 'Verwaltung von Unternehmenskunden',
      fr: 'Gestion Réactive des Clients Entreprise',
    },
    content: {
      es: `El módulo de clientes proporciona una experiencia comercial ágil y robusta:

• **Validación Dirty Inmediata:** Mediante \`ShowOnDirtyErrorStateMatcher\`, los errores se validan al teclear sin esperar a perder el foco.
• **Búsqueda Server-Side Combinable:** Filtrado dinámico por nombre, NIF/CIF o correo electrónico, y selector de jurisdicción fiscal.
• **Paginación Desacoplada:** Componente reutilizable \`<app-paginator>\` que encapsula la navegación por páginas.
• **Compositor Comercial:** Modal accesible para redactar y previsualizar correos comerciales con plantillas dinámicas según el plan comercial contratado.`,
      en: `The customer module delivers a fast and robust commercial workflow:

• **Instant Dirty Validation:** Through \`ShowOnDirtyErrorStateMatcher\`, validation triggers as the user types without waiting for blur.
• **Server-Side Combined Search:** Dynamic filtering by company name, tax ID, or email, with country jurisdiction selector.
• **Decoupled Pagination:** Reusable standalone \`<app-paginator>\` encapsulating pagination logic.
• **Commercial Email Composer:** Accessible modal to draft and preview sales outreach emails with dynamic templates tailored to the selected plan.`,
      de: `Das Kundenmodul bietet einen schnellen und robusten Workflow:

• **Sofortige Dirty-Validierung:** Sofortige Rückmeldung beim Tippen via \`ShowOnDirtyErrorStateMatcher\`.
• **Server-Side Suche & Filter:** Filterung nach Firmenname, Steuer-ID und Land.
• **Wiederverwendbare Paginierung:** Standalone \`<app-paginator>\`.
• **E-Mail-Composer:** Modales Fenster für personalisierte E-Mails.`,
      fr: `Le module clients offre un flux commercial fluide et robuste :

• **Validation immédiate :** Rétroaction en temps réel avec \`ShowOnDirtyErrorStateMatcher\`.
• **Recherche serveur :** Filtrage combiné par entreprise, identifiant fiscal et pays.
• **Pagination réutilisable :** Composant autonome \`<app-paginator>\`.
• **Rédacteur d'e-mails :** Modal accessible pour courriers commerciaux personnalisés.`,
    },
    actions: [
      {
        labels: {
          es: 'Ir a Clientes Corporativos',
          en: 'Go to Corporate Customers',
          de: 'Zu den Kunden gehen',
          fr: 'Aller aux Clients',
        },
        route: '/customers',
        icon: 'groups',
      },
    ],
    sources: [
      'ai-workspace/01-specs/functional-specs.md (Sec. 2.1)',
      'CustomersListComponent & CustomerCreateDialog',
    ],
  },
  {
    id: 'architecture_hexagonal',
    keywords: [
      'arquitectura',
      'hexagonal',
      'backend',
      'frontend',
      'nestjs',
      'angular',
      'sqlite',
      'wal',
      'ports',
      'adapters',
      'puertos',
      'adaptadores',
      'typeorm',
      'rfc 7807',
      'signals',
      'clean code',
    ],
    titles: {
      es: 'Arquitectura Hexagonal y Principios Técnicos',
      en: 'Hexagonal Architecture & Technical Principles',
      de: 'Hexagonale Architektur & Technische Prinzipien',
      fr: 'Architecture Hexagonale et Principes Techniques',
    },
    content: {
      es: `SaaS-O-Matic está diseñado bajo principios de Arquitectura Limpia e Inversión de Dependencias:

• **Backend NestJS (Hexagonal):**
  - **Dominio Puro:** Entidades e invariantes en TypeScript puro, sin decoradores ni librerías de persistencia.
  - **Puertos y Adaptadores:** Casos de uso como \`in-ports\`, repositorios como \`out-ports\` y adaptadores REST/TypeORM desacoplados.
  - **SQLite WAL Mode:** Concurrencia sin bloqueos (\`enableWAL: true\`) para lecturas y escrituras simultáneas.
  - **RFC 7807 Problem Details:** Tratamiento de errores normalizado con sanitización anti-fugas de información.
• **Frontend Angular 22 (Standalone + Signals):**
  - Reactividad con Signals (\`signal\`, \`computed\`, \`effect\`).
  - Tokens de diseño CSS \`--omatic-*\` centralizados sin colores hexadecimales en SCSS.
  - Cero Tailwind: SCSS modular y Angular Material.`,
      en: `SaaS-O-Matic is designed adhering to Clean Architecture and Dependency Inversion:

• **Backend NestJS (Hexagonal):**
  - **Pure Domain:** Entities and invariants in pure TypeScript, without decorators or persistence dependencies.
  - **Ports & Adapters:** Use cases as \`in-ports\`, repositories as \`out-ports\`, and decoupled REST/TypeORM adapters.
  - **SQLite WAL Mode:** Lock-free concurrency (\`enableWAL: true\`) for non-blocking concurrent reads and writes.
  - **RFC 7807 Problem Details:** Standardized error responses with sensitive data sanitization.
• **Frontend Angular 22 (Standalone + Signals):**
  - Fine-grained reactivity via Angular Signals (\`signal\`, \`computed\`, \`effect\`).
  - Centralized \`--omatic-*\` CSS tokens with zero hardcoded hex colors in SCSS.
  - Zero Tailwind: Modular SCSS (7-1 pattern) and Angular Material.`,
      de: `SaaS-O-Matic basiert auf hexagonaler Architektur:

• **Backend NestJS:** Reines Domänenmodell ohne Framework-Kopplung, Ports & Adapters, SQLite im WAL-Modus und RFC 7807 Fehlerbehandlung.
• **Frontend Angular 22:** Standalone-Komponenten, Angular Signals, zentrale \`--omatic-*\` CSS-Tokens und null Tailwind.`,
      fr: `SaaS-O-Matic repose sur une architecture hexagonale :

• **Backend NestJS :** Domaine pur sans dépendances externes, ports et adaptateurs, SQLite en mode WAL et standard RFC 7807.
• **Frontend Angular 22 :** Composants autonomes, Angular Signals, tokens CSS \`--omatic-*\` stricts et zéro Tailwind.`,
    },
    sources: [
      'ai-workspace/02-architecture/architecture-guidelines.md (Sec. 1-3)',
      'AGENTS.md (Operational Guidelines & Rules)',
    ],
  },
  {
    id: 'cicd_devops',
    keywords: [
      'ci',
      'cd',
      'github actions',
      'pipeline',
      'docker',
      'nginx',
      'oxlint',
      'vitest',
      'jest',
      'cobertura',
      'coverage',
      'calidad',
      'test',
      'tests',
    ],
    titles: {
      es: 'Pipeline CI/CD, Calidad y Cobertura de Tests',
      en: 'CI/CD Pipeline, Quality Gates & Test Coverage',
      de: 'CI/CD-Pipeline, Qualitätstore & Testabdeckung',
      fr: 'Pipeline CI/CD, Contrôle Qualité et Couverture de Tests',
    },
    content: {
      es: `Infraestructura de pruebas y despliegue continuo de nivel corporativo:

• **GitHub Actions (8 Jobs Paralelos):** Flujos desacoplados de backend y frontend para Linting, Testing, Build y generación de imágenes Docker.
• **Oxlint Type-Aware:** Cero errores y cero advertencias en toda la base de código.
• **Cobertura de Tests (>96% real):** Puertas de calidad estrictas en Vitest (frontend) y Jest (backend) con tablas de cobertura publicadas en \`$GITHUB_STEP_SUMMARY\`.
• **Docker Multi-Stage:** Nginx 1.27 Alpine con soporte SPA pushState para el frontend y Node 22 slim para el microservicio de backend.`,
      en: `Enterprise-grade continuous deployment and testing infrastructure:

• **GitHub Actions (8 Parallel Jobs):** Decoupled pipelines for backend and frontend covering Lint, Test, Build, and Docker image packaging.
• **Oxlint Type-Aware:** 0 errors and 0 warnings enforced across the entire codebase.
• **Test Coverage (>96% actual):** Strict quality gates in Vitest (frontend) and Jest (backend) reporting directly to \`$GITHUB_STEP_SUMMARY\`.
• **Multi-Stage Docker:** Nginx 1.27 Alpine with SPA pushState routing for frontend and Node 22 slim for backend with IPv4 healthchecks.`,
      de: `Unternehmensweite Test- und CI/CD-Infrastruktur:

• **GitHub Actions:** 8 parallele Jobs für Linting, Testing, Build und Docker.
• **Oxlint:** 0 Fehler und 0 Warnungen.
• **Testabdeckung:** Über 96% reale Abdeckung in Vitest und Jest.
• **Docker:** Nginx Alpine für Frontend und Node 22 slim für Backend.`,
      fr: `Infrastructure de test et déploiement continu d'entreprise :

• **GitHub Actions :** 8 tâches parallèles pour Lint, Tests, Build et Docker.
• **Oxlint :** 0 erreur et 0 avertissement.
• **Couverture de tests :** Plus de 96% effectifs sur Vitest et Jest.
• **Docker :** Nginx Alpine pour frontend et Node 22 slim pour backend.`,
    },
    sources: [
      '.github/workflows/ci-cd.yml',
      'AGENTS.md (Sec. 4: Code Quality & CI/CD)',
    ],
  },
  {
    id: 'guide_video',
    keywords: [
      'guia',
      'guía',
      'video',
      'vídeo',
      'demo',
      'tutorial',
      'ayuda',
      'slides',
      'diapositivas',
      'player',
      'reproductor',
    ],
    titles: {
      es: 'Guía Interactiva y Reproductor de Vídeo Demo',
      en: 'Interactive Guide & Demo Video Player',
      de: 'Interaktiver Leitfaden & Demo-Videoplayer',
      fr: 'Guide Interactif et Lecteur Vidéo Démo',
    },
    content: {
      es: `El módulo de Guía y Documentación ofrece recursos de onboarding interactivos:

• **Reproductor de Vídeo Demo Accesible:** Marco 16:9 con seekbar personalizada, indicador de tiempo formateado, control de volumen y pantalla completa.
• **Atajos de Teclado:** \`K\` o \`Espacio\` (reproducir/pausar), \`M\` (silenciar), \`F\` (pantalla completa), inmune a mayúsculas mediante mapa de acciones limpio.
• **Diapositivas Paso a Paso:** Tarjeta interactiva con indicadores de paso, lista de ventajas y botones de avance y retroceso para aprender a registrar clientes, simular tramos y emitir facturas.`,
      en: `The Guide & Documentation module provides interactive onboarding resources:

• **Accessible Demo Video Player:** 16:9 responsive frame with custom seekbar, formatted time display, mute toggle, and fullscreen support.
• **Keyboard Shortcuts:** \`K\` or \`Space\` (toggle play), \`M\` (mute), \`F\` (fullscreen), case-insensitive via clean action dispatching map.
• **Step-by-Step Slides:** Interactive slide card with step indicators, key benefits checklist, and next/previous controls guiding through customers, simulations, and billing.`,
      de: `Das Leitfadenmodul bietet interaktive Einarbeitung:

• **Videoplayer:** 16:9 mit Tastaturkürzeln (K/Leertaste, M, F).
• **Schritt-für-Schritt-Folien:** Interaktive Karte zur Erklärung der Kernfunktionen.`,
      fr: `Le module Guide propose des ressources d'intégration interactives :

• **Lecteur vidéo démo :** 16:9 avec raccourcis clavier (K/Espace, M, F).
• **Diapositives interactives :** Carte pas-à-pas guidant à travers clients, simulations et factures.`,
    },
    actions: [
      {
        labels: {
          es: 'Abrir Guía y Documentación',
          en: 'Open Guide & Documentation',
          de: 'Leitfaden öffnen',
          fr: 'Ouvrir le Guide',
        },
        route: '/guide',
        icon: 'menu_book',
      },
    ],
    sources: [
      'ai-workspace/01-specs/functional-specs.md (Sec. 3.5)',
      'VideoPlayerComponent & GuideComponent',
    ],
  },
  {
    id: 'contact_support',
    keywords: [
      'contacto',
      'soporte',
      'tecnico',
      'técnico',
      'contact',
      'support',
      'incidencia',
      'duda',
      'ayuda comercial',
      'formulario',
    ],
    titles: {
      es: 'Contacto y Soporte Técnico / Comercial',
      en: 'Contact & Commercial / Technical Support',
      de: 'Kontakt & Technischer Support',
      fr: 'Contact et Support Technique / Commercial',
    },
    content: {
      es: `Canal oficial de soporte y comunicación para equipos comerciales y clientes:

• **Formulario Especializado:** Tipologías comercial, consulta de precios e incidencias técnicas.
• **Seguridad OWASP Anti-XSS:** Sanitización previa de mensajes con regex lineal libre de backtracking catastrófico.
• **Despacho Transaccional:** Registro estructurado con identificadores correlativos y simulación de envío asíncrono seguro.`,
      en: `Official support and outreach channel for commercial teams and customers:

• **Specialized Form:** Commercial inquiries, pricing questions, and technical support.
• **OWASP Anti-XSS Security:** Pre-sanitization of rich text payloads using linear regex patterns free from catastrophic backtracking.
• **Transactional Dispatch:** Structured logging with ticket IDs and safe decoupled asynchronous dispatching.`,
      de: `Offizieller Supportkanal für Vertriebsteams und Kunden:

• **Anfrageformular:** Kommerziell, Tarife und Technik.
• **OWASP-Sicherheit:** HTML-Bereinigung ohne ReDoS-Risiko.`,
      fr: `Canal de support officiel pour les équipes commerciales :

• **Formulaire dédié :** Commercial, tarification et support technique.
• **Sécurité OWASP :** Nettoyage HTML avec expressions régulières linéaires.`,
    },
    actions: [
      {
        labels: {
          es: 'Ir a Contacto y Soporte',
          en: 'Go to Contact & Support',
          de: 'Zu Kontakt & Support',
          fr: 'Aller à Contact & Support',
        },
        route: '/contact',
        icon: 'support_agent',
      },
    ],
    sources: [
      'ai-workspace/01-specs/functional-specs.md (Sec. 3.6)',
      'ContactComponent & EmailApiService',
    ],
  },
];

export const QUICK_PROMPTS: readonly QuickPrompt[] = [
  {
    id: 'prompt_pricing',
    labelKey: 'assistant.prompts.pricing',
    query: '¿Cómo funciona el cálculo de precios por tramos?',
    icon: 'calculate',
  },
  {
    id: 'prompt_fiscal',
    labelKey: 'assistant.prompts.fiscal',
    query: '¿Cómo valida el sistema un CIF o NIF de la AEAT?',
    icon: 'verified_user',
  },
  {
    id: 'prompt_invoices',
    labelKey: 'assistant.prompts.invoices',
    query: '¿Cómo se emite o anula una factura y cómo descargo el PDF?',
    icon: 'receipt_long',
  },
  {
    id: 'prompt_currencies',
    labelKey: 'assistant.prompts.currencies',
    query: '¿Qué divisas están soportadas y qué pasa si no hay internet?',
    icon: 'currency_exchange',
  },
  {
    id: 'prompt_architecture',
    labelKey: 'assistant.prompts.architecture',
    query: '¿Cómo está estructurada la arquitectura hexagonal del proyecto?',
    icon: 'account_tree',
  },
  {
    id: 'prompt_customers',
    labelKey: 'assistant.prompts.customers',
    query: '¿Cómo se registran los clientes corporativos y se redacta un correo?',
    icon: 'groups',
  },
] as const;

@Injectable({
  providedIn: 'root',
})
export class AiAssistantService {
  private readonly i18n = inject(I18nService);

  readonly messages = signal<readonly ChatMessage[]>([]);
  readonly isTyping = signal<boolean>(false);
  readonly quickPrompts = signal<readonly QuickPrompt[]>(QUICK_PROMPTS);

  constructor() {
    this.resetConversation();
  }

  resetConversation(): void {
    const welcomeMessage: ChatMessage = {
      id: `msg-${Date.now()}-welcome`,
      sender: 'assistant',
      content: this.getWelcomeContent(this.i18n.currentLanguage()),
      timestamp: new Date(),
      sources: [
        'ai-workspace/01-specs/functional-specs.md',
        'ai-workspace/02-architecture/architecture-guidelines.md',
        'AGENTS.md',
      ],
    };
    this.messages.set([welcomeMessage]);
  }

  async sendMessage(query: string): Promise<void> {
    const trimmed = query.trim();
    if (!trimmed || this.isTyping()) {
      return;
    }

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      sender: 'user',
      content: trimmed,
      timestamp: new Date(),
    };

    this.messages.set([...this.messages(), userMessage]);
    this.isTyping.set(true);

    // Realistic typing latency simulation (250ms)
    await new Promise((resolve) => setTimeout(resolve, 250));

    const response = this.resolveAnswer(trimmed, this.i18n.currentLanguage());
    const assistantMessage: ChatMessage = {
      id: `msg-${Date.now()}-assistant`,
      sender: 'assistant',
      content: response.content,
      timestamp: new Date(),
      actions: response.actions,
      sources: response.sources,
    };

    this.messages.set([...this.messages(), assistantMessage]);
    this.isTyping.set(false);
  }

  async askQuickPrompt(prompt: QuickPrompt): Promise<void> {
    const localizedQuery = this.getLocalizedPromptQuery(prompt.id, this.i18n.currentLanguage());
    await this.sendMessage(localizedQuery);
  }

  resolveAnswer(
    query: string,
    lang: string
  ): {
    content: string;
    actions?: readonly ChatAction[];
    sources?: readonly string[];
  } {
    const normalized = query
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    const queryTokens = normalized.split(/[^a-z0-9]+/);

    // Search for the topic with the highest matching keyword count
    let bestTopic: KnowledgeTopic | null = null;
    let maxMatches = 0;

    for (const topic of AI_KNOWLEDGE_TOPICS) {
      let matches = 0;
      for (const keyword of topic.keywords) {
        const normalizedKeyword = keyword
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');

        if (normalizedKeyword.includes(' ')) {
          if (normalized.includes(normalizedKeyword)) {
            matches += 2;
          }
        } else if (normalizedKeyword.length <= 3) {
          if (queryTokens.includes(normalizedKeyword)) {
            matches++;
          }
        } else if (normalized.includes(normalizedKeyword)) {
          matches++;
        }
      }
      if (matches > maxMatches) {
        maxMatches = matches;
        bestTopic = topic;
      }
    }

    if (bestTopic && maxMatches > 0) {
      const content =
        bestTopic.content[lang] ||
        bestTopic.content['es'] ||
        bestTopic.content['en'];

      const actions: ChatAction[] | undefined = bestTopic.actions?.map((act) => ({
        label: act.labels[lang] || act.labels['es'] || act.labels['en'],
        route: act.route,
        icon: act.icon,
      }));

      return {
        content,
        actions,
        sources: bestTopic.sources,
      };
    }

    return {
      content: this.getFallbackContent(lang),
      sources: [
        'ai-workspace/01-specs/functional-specs.md',
        'ai-workspace/02-architecture/architecture-guidelines.md',
      ],
    };
  }

  private getWelcomeContent(lang: string): string {
    switch (lang) {
      case 'en':
        return `Hello! I am **SaaS-O-Matic AI Assistant**, your technical and commercial copilot.

I am deeply indexed on the entire repository knowledge base, business rules, and technical specifications:
• **Tiered Pricing Engine:** Marginal cumulative tiers (€10, €8, €5), storage, and API calls.
• **Fiscal Verification:** Real AEAT algorithmic validation (DNI, NIE, CIF mod 23 & Luhn).
• **Invoices & Billing:** \`INV-YYYY-XXXX\`, states, accessible modal cancellation, and PDF streaming.
• **Architecture:** Hexagonal architecture, SQLite WAL mode, and RFC 7807 Problem Details.
• **Multi-Currency:** EUR base, USD, GBP, CHF with offline-resilient cache fallback.

How can I help you optimize your SaaS business today?`;
      case 'de':
        return `Hallo! Ich bin der **SaaS-O-Matic KI-Assistent**, Ihr technischer und kaufmännischer Kopilot.

Ich kenne alle Spezifikationen, Geschäftsregeln und Architekturrichtlinien der Plattform:
• **Staffelpreise:** Stufen 1–3 (10 €, 8 €, 5 €), Speicher und API-Aufrufe.
• **Steuerprüfung:** Offizielle AEAT-Algorithmen (DNI, NIE, CIF) und EU-USt-IDs.
• **Rechnungen:** \`INV-YYYY-XXXX\`, barrierefreie Stornierung und PDF-Export.
• **Architektur:** Hexagonale Architektur, SQLite WAL-Modus und RFC 7807.

Wie kann ich Ihnen heute behilflich sein?`;
      case 'fr':
        return `Bonjour ! Je suis **l'Assistant IA SaaS-O-Matic**, votre copilote technique et commercial.

Je suis entraîné sur l'ensemble des spécifications et règles métier de la plateforme :
• **Tarification par paliers :** Paliers cumulatifs marginaux (10 €, 8 €, 5 €), stockage et appels API.
• **Validation fiscale :** Algorithmes officiels de l'AEAT (DNI, NIE, CIF) et TVA internationale.
• **Factures & PDF :** Numérotation \`INV-YYYY-XXXX\`, annulation sécurisée et export PDFKit.
• **Architecture :** Architecture hexagonale, SQLite en mode WAL et RFC 7807.

Comment puis-je vous aider aujourd'hui ?`;
      default:
        return `¡Hola! Soy el **Asistente IA de SaaS-O-Matic**, tu copiloto técnico y comercial.

Estoy alimentado con toda la documentación de \`ai-workspace/\`, reglas de negocio y directrices de arquitectura:
• **Motor de Precios por Tramos:** Tramos acumulativos marginales (10 €, 8 €, 5 €), almacenamiento y llamadas API.
• **Validación Fiscal AEAT:** Algoritmos oficiales de DNI, NIE y CIF (módulo 23 y Luhn ponderado).
• **Facturas y PDF:** Numeración \`INV-YYYY-XXXX\`, anulación segura y generación binaria en PDFKit.
• **Arquitectura Hexagonal:** Dominio inmaculado, SQLite en modo WAL y RFC 7807 Problem Details.
• **Multi-Divisa:** EUR, USD, GBP, CHF con resiliencia offline ante fallos de conexión.

¿En qué puedo ayudarte hoy a optimizar tus suscripciones?`;
    }
  }

  private getFallbackContent(lang: string): string {
    switch (lang) {
      case 'en':
        return `I couldn't find a direct match for your question, but I can help you with:
• **Tiered Pricing:** Ask *"How do pricing tiers calculate?"*
• **Fiscal Rules:** Ask *"How are Spanish CIF or DNI verified?"*
• **Invoices & Billing:** Ask *"How does PDF invoice download work?"*
• **Currencies:** Ask *"Which currencies are supported?"*
• **Architecture:** Ask *"Explain the hexagonal architecture."*

Feel free to pick any of the quick suggestions above!`;
      case 'de':
        return `Ich habe keine direkte Übereinstimmung gefunden, helfe Ihnen aber gerne bei:
• **Staffelpreisen:** Fragen Sie nach der Staffelpreis-Berechnung.
• **Steuerprüfung:** Fragen Sie nach der CIF- oder DNI-Validierung der AEAT.
• **Rechnungen:** Fragen Sie nach PDF-Download oder Rechnungsstornierung.
• **Architektur:** Fragen Sie nach der hexagonalen Architektur.`;
      case 'fr':
        return `Je n'ai pas trouvé de correspondance exacte, mais je peux vous renseigner sur :
• **Tarification par paliers :** Demandez le calcul des paliers.
• **Validation fiscale :** Demandez comment valider un CIF ou DNI espagnol.
• **Factures :** Demandez le fonctionnement des factures PDF.
• **Architecture :** Demandez des explications sur l'architecture hexagonale.`;
      default:
        return `No he encontrado una coincidencia exacta para esa consulta, pero puedo ayudarte con:
• **Tarificación por Tramos:** Pregunta *"¿Cómo se calculan los tramos?"*
• **Validación Fiscal:** Pregunta *"¿Cómo se valida un CIF o NIF de la AEAT?"*
• **Facturación y PDF:** Pregunta *"¿Cómo funciona la descarga de facturas en PDF?"*
• **Divisas y Tipos de Cambio:** Pregunta *"¿Qué divisas soportáis?"*
• **Arquitectura Hexagonal:** Pregunta *"¿Cómo está estructurado el backend y frontend?"*

¡O selecciona cualquiera de las preguntas rápidas recomendadas arriba!`;
    }
  }

  private getLocalizedPromptQuery(promptId: string, lang: string): string {
    const queries: Record<string, Record<string, string>> = {
      prompt_pricing: {
        es: '¿Cómo funciona el cálculo de precios por tramos?',
        en: 'How does tiered pricing calculation work?',
        de: 'Wie funktioniert die Staffelpreis-Berechnung?',
        fr: 'Comment fonctionne le calcul des prix par paliers ?',
      },
      prompt_fiscal: {
        es: '¿Cómo valida el sistema un CIF o NIF de la AEAT?',
        en: 'How does the system validate an AEAT CIF or NIF?',
        de: 'Wie validiert das System spanische CIF oder NIF der AEAT?',
        fr: "Comment le système valide-t-il un CIF ou NIF de l'AEAT ?",
      },
      prompt_invoices: {
        es: '¿Cómo se emite o anula una factura y cómo descargo el PDF?',
        en: 'How do I issue or cancel an invoice and download the PDF?',
        de: 'Wie erstelle oder storniere ich eine Rechnung und lade das PDF herunter?',
        fr: 'Comment émettre ou annuler une facture et télécharger le PDF ?',
      },
      prompt_currencies: {
        es: '¿Qué divisas están soportadas y qué pasa si no hay internet?',
        en: 'Which currencies are supported and what happens offline?',
        de: 'Welche Währungen werden unterstützt und was passiert offline?',
        fr: 'Quelles devises sont prises en charge et que se passe-t-il hors ligne ?',
      },
      prompt_architecture: {
        es: '¿Cómo está estructurada la arquitectura hexagonal del proyecto?',
        en: 'How is the hexagonal architecture structured?',
        de: 'Wie ist die hexagonale Architektur des Projekts strukturiert?',
        fr: 'Comment est structurée l’architecture hexagonale du projet ?',
      },
      prompt_customers: {
        es: '¿Cómo se registran los clientes corporativos y se redacta un correo?',
        en: 'How do I register corporate customers and compose emails?',
        de: 'Wie registriere ich Kunden und verfasse eine E-Mail?',
        fr: 'Comment enregistrer des clients et rédiger un e-mail ?',
      },
    };

    return queries[promptId]?.[lang] || queries[promptId]?.['es'] || promptId;
  }
}
