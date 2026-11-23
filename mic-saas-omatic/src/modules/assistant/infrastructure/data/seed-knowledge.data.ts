import type { KnowledgeTopicProps } from '../../domain/entities/knowledge-topic.entity';

export const SEED_KNOWLEDGE_TOPICS: readonly KnowledgeTopicProps[] = [
  {
    id: 'download_invoice_pdf',
    keywords: {
      es: [
        'descargar pdf',
        'donde descargo',
        'descarga pdf',
        'bajar pdf',
        'descargar factura',
        'descarga factura',
        'bajar factura',
        'obtener factura',
        'descargar',
        'descarga',
        'pdf',
      ],
      en: [
        'download pdf',
        'where to download',
        'download invoice',
        'get invoice pdf',
        'save invoice',
        'download',
        'pdf',
      ],
      fr: [
        'télécharger facture',
        'telecharger pdf',
        'ou telecharger',
        'où télécharger',
        'telecharger facture',
        'facture pdf',
        'télécharger',
        'telecharger',
      ],
    },
    titles: {
      es: 'Descarga de Facturas en PDF',
      en: 'Download Invoice PDF',
      fr: 'Télécharger la facture en PDF',
    },
    content: {
      es: `Puedes descargar el PDF oficial de cualquier factura en 2 pasos:

1. Entra en **Facturas y Cobros** (o pulsa en el botón de abajo).
2. En la tabla de facturas, haz clic en el icono **Descargar PDF** de la columna de acciones.

El PDF se genera al instante con el desglose de tramos, los impuestos correspondientes según el país y el código oficial \`INV-YYYY-XXXX\`.`,
      en: `You can download the official PDF of any invoice in 2 quick steps:

1. Go to **Invoices & Billing** (or click the button below).
2. In the invoice list, click the **Download PDF** icon in the actions column.

The document is generated instantly with the complete tier breakdown, applicable taxes, and the official \`INV-YYYY-XXXX\` number.`,
      fr: `Vous pouvez télécharger le PDF officiel d'une facture en 2 étapes rapides :

1. Rendez-vous dans **Factures et Paiements** (ou cliquez sur le bouton ci-dessous).
2. Dans la liste des factures, cliquez sur l'icône **Télécharger PDF** de la colonne d'actions.

Le document est généré instantanément avec le détail des paliers, la TVA et le numéro officiel \`INV-YYYY-XXXX\`.`,
    },
    actions: [
      {
        labels: {
          es: 'Ir a Facturas y Cobros',
          en: 'Go to Invoices & Billing',
          fr: 'Aller à Factures et Paiements',
        },
        route: '/invoices',
        icon: 'receipt_long',
      },
    ],
    sources: ['Facturas y Cobros (PDFKit)'],
  },
  {
    id: 'cancel_invoice',
    keywords: {
      es: [
        'anular factura',
        'cancelar factura',
        'como anulo',
        'cómo anulo',
        'anular',
        'anulacion',
        'anulación',
        'cancelar',
        'cancelacion',
        'cancelación',
      ],
      en: [
        'cancel invoice',
        'how to cancel',
        'void invoice',
        'cancel',
        'cancellation',
      ],
      fr: [
        'annuler facture',
        'annulation facture',
        'comment annuler',
        'annuler',
        'annulation',
      ],
    },
    titles: {
      es: 'Anulación de Facturas',
      en: 'Cancel Invoice',
      fr: 'Annulation de Facture',
    },
    content: {
      es: `Para anular una factura:

1. Accede a **Facturas y Cobros**.
2. En la fila de la factura, haz clic en el botón de **Anular** (icono de papelera).
3. Confirma la acción en el diálogo de seguridad para actualizar su estado a \`CANCELLED\`.`,
      en: `To cancel an invoice:

1. Open **Invoices & Billing**.
2. On the invoice row, click the **Cancel** button (trash icon).
3. Confirm in the dialog to safely transition its status to \`CANCELLED\`.`,
      fr: `Pour annuler une facture :

1. Accédez à **Factures et Paiements**.
2. Sur la ligne de la facture, cliquez sur **Annuler** (icône poubelle).
3. Confirmez dans la boîte de dialogue pour passer son état à \`CANCELLED\`.`,
    },
    actions: [
      {
        labels: {
          es: 'Ir a Facturas y Cobros',
          en: 'Go to Invoices & Billing',
          fr: 'Aller à Factures et Paiements',
        },
        route: '/invoices',
        icon: 'receipt_long',
      },
    ],
    sources: ['Ciclo de Facturación'],
  },
  {
    id: 'invoices_pdf',
    keywords: {
      es: [
        'factura',
        'facturas',
        'invoice',
        'invoices',
        'cobro',
        'cobros',
        'borrador',
        'draft',
        'issued',
        'paid',
        'ciclo facturas',
      ],
      en: [
        'invoice',
        'invoices',
        'billing',
        'draft',
        'issued',
        'paid',
        'invoice lifecycle',
      ],
      fr: [
        'facture',
        'factures',
        'paiement',
        'brouillon',
        'payée',
        'cycle facturation',
      ],
    },
    titles: {
      es: 'Gestión de Facturas y Cobros',
      en: 'Invoices & Billing Overview',
      fr: 'Factures et Paiements',
    },
    content: {
      es: `El módulo de **Facturas y Cobros** gestiona los documentos comerciales:

• **Numeración Oficial:** Formato correlativo anual \`INV-YYYY-XXXX\` (ej. INV-2026-0001).
• **Estados:** \`DRAFT\` (Borrador) → \`ISSUED\` (Emitida) → \`PAID\` (Cobrada) o \`CANCELLED\` (Anulada).
• **Exportación:** Descarga directa en PDF con cálculo de impuestos y desglose de tramos.`,
      en: `The **Invoices & Billing** module manages commercial documents:

• **Sequential Code:** Annual sequential format \`INV-YYYY-XXXX\` (e.g., INV-2026-0001).
• **States:** \`DRAFT\` → \`ISSUED\` → \`PAID\` or \`CANCELLED\`.
• **Export:** Instant PDF download with full tax and tiered breakdown.`,
      fr: `Le module **Factures et Paiements** gère les documents commerciaux :

• **Numérotation :** Format séquentiel \`INV-YYYY-XXXX\`.
• **États :** \`DRAFT\`, \`ISSUED\`, \`PAID\` ou \`CANCELLED\`.
• **Export :** Téléchargement PDF avec détail des taxes et paliers.`,
    },
    actions: [
      {
        labels: {
          es: 'Ver Facturas y Cobros',
          en: 'View Invoices & Billing',
          fr: 'Voir les Factures',
        },
        route: '/invoices',
        icon: 'receipt_long',
      },
    ],
    sources: ['Módulo de Facturación'],
  },
  {
    id: 'pricing_tiers',
    keywords: {
      es: [
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
        'gradual',
        '15 usuarios',
        '15',
        '140',
        '60 usuarios',
        '60',
        '470',
        'almacenamiento',
        'api',
        'storage',
      ],
      en: [
        'tier',
        'tiers',
        'pricing',
        'price',
        'prices',
        'rate',
        'rates',
        'calculate',
        'calculation',
        'cost',
        'costs',
        'user',
        'users',
        'marginal',
        'cumulative',
        'gradual',
        '15 users',
        '15',
        '140',
        '60 users',
        '60',
        '470',
        'storage',
        'api',
      ],
      fr: [
        'palier',
        'paliers',
        'prix',
        'tarif',
        'tarifs',
        'tarification',
        'calculer',
        'calcul',
        'coût',
        'cout',
        'coûts',
        'utilisateur',
        'utilisateurs',
        'marginal',
        'cumulatif',
        '15 utilisateurs',
        '15',
        '140',
        '60 utilisateurs',
        '60',
        '470',
        'stockage',
        'api',
      ],
    },
    titles: {
      es: 'Motor de Tarificación por Tramos',
      en: 'Tiered Pricing Engine',
      fr: 'Tarification par Paliers',
    },
    content: {
      es: `La tarificación es acumulativa y progresiva por tramos de usuarios activos:

• **Tramo 1 (0–10 usuarios):** 10,00 € / usuario
• **Tramo 2 (11–50 usuarios):** 8,00 € / usuario
• **Tramo 3 (>50 usuarios):** 5,00 € / usuario
• **Extras:** Almacenamiento (0,15 €/GB) y llamadas API (0,001 €/llamada).

**Ejemplo oficial del reto (15 usuarios):**
(10 × 10 €) + (5 × 8 €) = 100 € + 40 € = **140,00 €/mes** base + impuestos del país.

**Ejemplo para 60 usuarios:**
(10 × 10 €) + (40 × 8 €) + (10 × 5 €) = 100 € + 320 € + 50 € = **470,00 €/mes** base.`,
      en: `Pricing is progressive and cumulative based on active users:

• **Tier 1 (0–10 users):** €10.00 / user
• **Tier 2 (11–50 users):** €8.00 / user
• **Tier 3 (>50 users):** €5.00 / user
• **Add-ons:** Storage (€0.15/GB) and API usage (€0.001/call).

**Official challenge example (15 users):**
(10 × €10) + (5 × €8) = €100 + €40 = **€140.00/month** base + country taxes.

**Example for 60 users:**
(10 × €10) + (40 × €8) + (10 × €5) = €100 + €320 + €50 = **€470.00/month** base.`,
      fr: `La tarification est progressive et cumulative selon les utilisateurs actifs :

• **Palier 1 (0–10 utilisateurs) :** 10,00 € / utilisateur
• **Palier 2 (11–50 utilisateurs) :** 8,00 € / utilisateur
• **Palier 3 (>50 utilisateurs) :** 5,00 € / utilisateur
• **Suppléments :** Stockage (0,15 €/Go) et API (0,001 €/appel).

**Exemple officiel du défi (15 utilisateurs) :**
(10 × 10 €) + (5 × 8 €) = 100 € + 40 € = **140,00 €/mois** base + TVA du pays.

**Exemple pour 60 utilisateurs :**
(10 × 10 €) + (40 × 8 €) + (10 × 5 €) = **470,00 €/mois** base.`,
    },
    actions: [
      {
        labels: {
          es: 'Abrir Simulador de Tramos',
          en: 'Open Pricing Simulator',
          fr: 'Ouvrir le Simulateur',
        },
        route: '/simulations',
        icon: 'calculate',
      },
    ],
    sources: ['Motor de Tarificación (PricingEngine)'],
  },
  {
    id: 'fiscal_aeat',
    keywords: {
      es: [
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
      en: [
        'cif',
        'nif',
        'dni',
        'nie',
        'fiscal',
        'tax',
        'taxes',
        'taxid',
        'vat',
        'aeat',
        'validate',
        'validation',
        'algorithm',
        'spain',
        'spanish',
        'jurisdiction',
      ],
      fr: [
        'cif',
        'nif',
        'dni',
        'nie',
        'fiscal',
        'fiscale',
        'taxe',
        'taxes',
        'tva',
        'aeat',
        'valider',
        'validation',
        'algorithme',
        'espagne',
        'juridiction',
      ],
    },
    titles: {
      es: 'Validación Fiscal Algorítmica',
      en: 'Fiscal ID Validation',
      fr: 'Validation Fiscale',
    },
    content: {
      es: `Validación de identificadores fiscales según la jurisdicción del cliente:

• **España (ES):** Algoritmo oficial de la AEAT para DNI (módulo 23), NIE (prefijo X/Y/Z) y CIF (Luhn ponderado).
• **Internacional (DE, FR, US, CH):** Formato alfanumérico normalizado de 5 a 20 caracteres con ejemplos contextuales.`,
      en: `Strict tax identifier validation based on customer jurisdiction:

• **Spain (ES):** Official AEAT algorithms for DNI (mod 23), NIE (prefix X/Y/Z), and CIF (weighted Luhn check).
• **International (DE, FR, US, CH):** Normalized 5–20 alphanumeric characters with contextual examples.`,
      fr: `Validation des identifiants fiscaux selon la juridiction :

• **Espagne (ES) :** Algorithmes officiels de l'AEAT pour DNI (mod 23), NIE et CIF (Luhn pondéré).
• **International (DE, FR, US, CH) :** Format alphanumérique normalisé de 5 à 20 caractères.`,
    },
    actions: [
      {
        labels: {
          es: 'Ver Clientes Corporativos',
          en: 'View Corporate Customers',
          fr: 'Voir les Clients',
        },
        route: '/customers',
        icon: 'groups',
      },
    ],
    sources: ['Normativa Fiscal AEAT (R.D. 1065/2007)'],
  },
  {
    id: 'currencies_sync',
    keywords: {
      es: [
        'divisa',
        'divisas',
        'moneda',
        'monedas',
        'currency',
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
        'sin internet',
        'internet',
        'sin conexion',
        'sin conexión',
        'soportadas',
        'soportan',
        'divisas soportadas',
      ],
      en: [
        'currency',
        'currencies',
        'money',
        'eur',
        'usd',
        'gbp',
        'chf',
        'exchange',
        'conversion',
        'convert',
        'sync',
        'synchronization',
        'offline',
        'cache',
        'rate',
        'rates',
      ],
      fr: [
        'devise',
        'devises',
        'monnaie',
        'eur',
        'usd',
        'gbp',
        'chf',
        'taux de change',
        'conversion',
        'convertir',
        'synchro',
        'hors ligne',
        'cache',
      ],
    },
    titles: {
      es: 'Divisas y Conversión en Vivo',
      en: 'Currencies & Live Conversion',
      fr: 'Devises et Conversion en Direct',
    },
    content: {
      es: `El optimizador soporta 4 divisas internacionales:

• **Monedas:** EUR (base de cálculo), USD, GBP y CHF.
• **Conversión en vivo:** Se sincroniza contra una API pública de tipos de cambio.
• **Modo Offline:** Si no hay internet, conmuta automáticamente a la caché local sin interrumpir tu trabajo.`,
      en: `The optimizer supports 4 international currencies:

• **Currencies:** EUR (base calculation), USD, GBP, and CHF.
• **Live Conversion:** Synced with a reference public exchange rate API.
• **Offline Mode:** Seamlessly falls back to persistent cached rates if internet connectivity drops.`,
      fr: `L'optimiseur gère 4 devises internationales :

• **Devises :** EUR (base de calcul), USD, GBP et CHF.
• **Conversion en direct :** Synchronisation via une API publique de taux de change.
• **Mode hors ligne :** Basculement automatique sur le cache en cas de coupure réseau.`,
    },
    sources: ['Servicio de Divisas (CurrencyService)'],
  },
  {
    id: 'customers_mgmt',
    keywords: {
      es: [
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
      en: [
        'customer',
        'customers',
        'company',
        'companies',
        'client',
        'clients',
        'create',
        'register',
        'registration',
        'email',
        'sales',
        'filter',
        'pagination',
      ],
      fr: [
        'client',
        'clients',
        'entreprise',
        'société',
        'societe',
        'créer',
        'creer',
        'enregistrer',
        'inscription',
        'email',
        'commercial',
        'filtre',
        'pagination',
      ],
    },
    titles: {
      es: 'Gestión de Clientes Corporativos',
      en: 'Corporate Customer Management',
      fr: 'Gestion des Clients Entreprise',
    },
    content: {
      es: `Desde el módulo de **Clientes Corporativos** puedes:

• **Alta con validación instantánea:** Los errores fiscales y de formato se indican mientras escribes.
• **Filtros avanzados:** Búsqueda combinada por nombre, NIF/CIF y país.
• **Propuestas comerciales:** Compositor integrado para enviar ofertas personalizadas por email.`,
      en: `From the **Corporate Customers** module you can:

• **Register with instant validation:** Form and tax ID errors flag as you type.
• **Advanced filters:** Search combined by company name, tax ID, and country.
• **Sales outreach:** Draft and send tailored commercial proposals via the built-in composer.`,
      fr: `Depuis le module **Clients Entreprises**, vous pouvez :

• **Créer des comptes :** Validation instantanée dès la saisie.
• **Filtres avancés :** Recherche combinée par nom, identifiant fiscal et pays.
• **Offres commerciales :** Rédacteur d'e-mails intégré pour propositions sur mesure.`,
    },
    actions: [
      {
        labels: {
          es: 'Ir a Clientes Corporativos',
          en: 'Go to Corporate Customers',
          fr: 'Aller aux Clients',
        },
        route: '/customers',
        icon: 'groups',
      },
    ],
    sources: ['Gestión de Clientes'],
  },
  {
    id: 'simulations_flow',
    keywords: {
      es: [
        'simulador',
        'simulacion',
        'simulaciones',
        'slider',
        'proyeccion',
        'proyección',
        'como simulo',
        'cómo simulo',
        'presupuestar',
        'nueva simulacion',
        'nueva simulación',
      ],
      en: [
        'simulator',
        'simulation',
        'simulations',
        'slider',
        'projection',
        'how to simulate',
        'quote',
        'new simulation',
      ],
      fr: [
        'simulateur',
        'simulation',
        'simulations',
        'curseur',
        'projection',
        'comment simuler',
        'nouvelle simulation',
      ],
    },
    titles: {
      es: 'Simulador Interactivo de Suscripciones',
      en: 'Interactive Subscription Simulator',
      fr: 'Simulateur d\'Abonnement Interactif',
    },
    content: {
      es: `El **Simulador Interactivo** permite al comercial proyectar costes en tiempo real:

1. **Ajuste Dinámico:** Usa los sliders de usuarios activos (1–500), almacenamiento en GB y llamadas API estimadas.
2. **Proyección en Vivo:** Desglose visual de tramos y conversión instantánea a EUR, USD, GBP o CHF.
3. **Persistencia:** Guarda la proyección vinculada a la cuenta del cliente corporativo para auditoría y consulta histórica.`,
      en: `The **Interactive Simulator** enables the sales team to project subscription costs in real time:

1. **Dynamic Controls:** Adjust active users slider (1–500), storage in GB, and estimated API calls.
2. **Live Projection:** Visual tier breakdown and instant currency conversion (EUR, USD, GBP, CHF).
3. **Persistence:** Save the calculation linked to the selected corporate customer for auditing and historical review.`,
      fr: `Le **Simulateur Interactif** permet de projeter les coûts d'abonnement en temps réel :

1. **Contrôles dynamiques :** Curseurs pour utilisateurs (1–500), stockage en Go et appels API.
2. **Projection en direct :** Détail par paliers et conversion instantanée (EUR, USD, GBP, CHF).
3. **Persistance :** Enregistrement de la proposition liée au compte client pour audit et historique.`,
    },
    actions: [
      {
        labels: {
          es: 'Abrir Simulador',
          en: 'Open Simulator',
          fr: 'Ouvrir le Simulateur',
        },
        route: '/simulations',
        icon: 'calculate',
      },
    ],
    sources: ['ai-workspace/01-specs/functional-specs.md (Sec. 2.2)'],
  },
  {
    id: 'challenge_criteria',
    keywords: {
      es: [
        'criterios',
        'criterio',
        'evaluacion',
        'evaluación',
        'evaluar',
        'rubrica',
        'rúbrica',
        'porcentajes',
        '35%',
        '25%',
        '30%',
        '10%',
        'puntuacion',
        'puntuación',
        'nota',
        'prueba tecnica',
        'prueba técnica',
        'reto tecnico',
        'reto técnico',
        'como se evalua',
        'cómo se evalúa',
        'objetivos',
        'objetivo',
        'objetivos y criterios',
      ],
      en: [
        'criteria',
        'criterion',
        'evaluation',
        'evaluate',
        'rubric',
        'scoring',
        'weights',
        'percentage',
        'percentages',
        '35%',
        '25%',
        '30%',
        '10%',
        'technical challenge',
        'how is it evaluated',
        'assessment',
        'goals',
        'objectives',
      ],
      fr: [
        'critères',
        'criteres',
        'évaluation',
        'evaluation',
        'rubrique',
        'pourcentages',
        '35%',
        '25%',
        '30%',
        '10%',
        'défi technique',
        'defi technique',
        'bareme',
        'objectifs',
      ],
    },
    titles: {
      es: 'Criterios de Evaluación y Objetivos del Reto',
      en: 'Official Challenge Evaluation Criteria & Goals',
      fr: 'Critères d’Évaluation et Objectifs du Défi',
    },
    content: {
      es: `Los criterios oficiales de evaluación del reto técnico se dividen en 4 áreas clave:

• **Planificación y Diseño (35%):** Desglose de reglas de negocio, modelos y contratos OpenAPI antes de programar (*Spec-Driven Development* en \`ai-workspace/01-specs/\`).
• **Calidad del Software Entregado (30%):** Robustez del backend (cálculo de tramos, validación estricta AEAT de DNI/CIF, persistencia SQLite WAL) y frontend (Angular 22, reactividad con Signals, responsive).
• **Criterio Técnico y Control de Calidad (25%):** Rol de "director de orquesta", auditando a la IA (*Vibe Coding*), eliminando deuda técnica y garantizando 0 errores y >96% cobertura.
• **README y Despliegue (10%):** Instrucciones sin fricción para levantar frontend y backend en local o en un comando con Docker Compose.`,
      en: `The official technical challenge evaluation criteria are weighted into 4 key areas:

• **Planning & Design (35%):** Prior breakdown of functional specifications, models, and API contracts before coding (*Spec-Driven Development* in \`ai-workspace/01-specs/\`).
• **Software Quality (30%):** Backend robustness (tiered calculation, strict AEAT DNI/CIF validation, SQLite WAL) and frontend responsiveness (Angular 22, Signals, responsive design).
• **Technical Judgment & QA (25%):** Your role as "orchestra conductor", auditing AI output in real time (*Vibe Coding*), eliminating technical debt, and ensuring zero errors and >96% coverage.
• **README & Frictionless Deployment (10%):** Clear instructions to run frontend and backend locally or with a single Docker Compose command.`,
      fr: `Les critères d'évaluation officiels du défi technique se divisent en 4 axes majeurs :

• **Planification et Design (35%) :** Décomposition préalable des spécifications et contrats d'API (*Spec-Driven Development* dans \`ai-workspace/01-specs/\`).
• **Qualité du Logiciel (30%) :** Robustesse du backend (calcul par paliers, validation stricte AEAT, SQLite WAL) et réactivité frontend (Angular 22, Signals).
• **Jugement Technique et QA (25%) :** Rôle de "chef d'orchestre", audit en temps réel de l'IA (*Vibe Coding*) et élimination de la dette technique.
• **README et Déploiement (10%) :** Instructions claires pour lancer le projet en local ou avec Docker Compose.`,
    },
    actions: [
      {
        labels: {
          es: 'Ver Guía y Despliegue',
          en: 'View Guide & Deployment',
          fr: 'Voir le Guide',
        },
        route: '/guide',
        icon: 'military_tech',
      },
    ],
    sources: ['Prueba_Devs_con_IA.docx (Sec. 4)', 'ai-workspace/01-specs/functional-specs.md'],
  },
  {
    id: 'architecture_hexagonal',
    keywords: {
      es: [
        'arquitectura',
        'hexagonal',
        'backend',
        'frontend',
        'nestjs',
        'angular',
        'sqlite',
        'wal',
        'puertos',
        'adaptadores',
        'ports',
        'adapters',
        'como esta estructurada',
        'cómo está estructurada',
        'estructura',
        'patron',
        'patrón',
        'rfc 7807',
        'signals',
      ],
      en: [
        'architecture',
        'hexagonal',
        'backend',
        'frontend',
        'nestjs',
        'angular',
        'sqlite',
        'wal',
        'ports',
        'adapters',
        'structure',
        'how is it structured',
        'pattern',
        'rfc 7807',
        'signals',
      ],
      fr: [
        'architecture',
        'hexagonale',
        'backend',
        'frontend',
        'nestjs',
        'angular',
        'sqlite',
        'wal',
        'ports',
        'adaptateurs',
        'structure',
        'comment est structure',
        'comment est structurée',
      ],
    },
    titles: {
      es: 'Arquitectura Hexagonal (Puertos y Adaptadores)',
      en: 'Hexagonal Architecture (Ports & Adapters)',
      fr: 'Architecture Hexagonale (Ports et Adaptateurs)',
    },
    content: {
      es: `La plataforma SaaS-O-Matic implementa **Arquitectura Hexagonal (Puertos y Adaptadores)** estricta:

• **Dominio Inmaculado:** Entidades puras en TypeScript (\`Customer\`, \`Simulation\`, \`Invoice\`, \`KnowledgeTopic\`) sin dependencias de frameworks ni TypeORM.
• **Puertos de Entrada/Salida:** Interfaces que definen los casos de uso (\`in/\`) y los contratos de repositorios o servicios externos (\`out/\`).
• **Adaptadores:** Controladores REST en NestJS (primarios) y repositorios TypeORM con SQLite en modo WAL y errores RFC 7807 (secundarios).
• **Frontend:** Angular 22 standalone puro con Signals, tokens de diseño CSS centralizados (\`--omatic-*\`) y cero Tailwind.`,
      en: `SaaS-O-Matic implements strict **Hexagonal Architecture (Ports & Adapters)**:

• **Immaculate Domain:** Pure TypeScript domain entities (\`Customer\`, \`Simulation\`, \`Invoice\`, \`KnowledgeTopic\`) free of framework or TypeORM dependencies.
• **In/Out Ports:** Strict interfaces defining use cases (\`in/\`) and repository or external service contracts (\`out/\`).
• **Adapters:** NestJS REST controllers (primary) and TypeORM persistence with SQLite WAL mode and RFC 7807 Problem Details (secondary).
• **Frontend:** Pure Angular 22 standalone with Signals, centralized CSS design tokens (\`--omatic-*\`), and zero Tailwind.`,
      fr: `La plateforme SaaS-O-Matic implémente une **Architecture Hexagonale (Ports et Adaptateurs)** stricte :

• **Domaine Immaculé :** Entités TypeScript pures (\`Customer\`, \`Simulation\`, \`Invoice\`, \`KnowledgeTopic\`) sans dépendance TypeORM ni NestJS.
• **Ports d'Entrée/Sortie :** Interfaces définissant les cas d'utilisation (\`in/\`) et les contrats de dépôts (\`out/\`).
• **Adaptateurs :** Contrôleurs REST NestJS (primaires) et dépôts TypeORM avec SQLite WAL et Problem Details RFC 7807 (secondaires).
• **Frontend :** Angular 22 standalone avec Signals, tokens CSS centralisés (\`--omatic-*\`) et zéro Tailwind.`,
    },
    actions: [
      {
        labels: {
          es: 'Ver Guía de Arquitectura',
          en: 'View Architecture Guide',
          fr: 'Voir le Guide d’Architecture',
        },
        route: '/guide',
        icon: 'lan',
      },
    ],
    sources: [
      'ai-workspace/02-architecture/architecture-guidelines.md',
      'ai-workspace/01-specs/functional-specs.md',
    ],
  },
  {
    id: 'contact_support',
    keywords: {
      es: [
        'contacto',
        'soporte',
        'modulo de contacto',
        'para que sirve contacto',
        'contacto y soporte',
        'modulo de contacto y soporte',
        'enviar correo',
        'mandar correo',
        'enviar email',
        'mandar email',
        'formulario de contacto',
        'atencion al cliente',
        'asistencia',
        'ayuda',
        'mensaje',
        'propuesta comercial',
      ],
      en: [
        'contact',
        'support',
        'contact module',
        'what is contact for',
        'contact and support',
        'send email',
        'send mail',
        'contact form',
        'customer support',
        'help',
        'assistance',
        'message',
        'commercial proposal',
      ],
      fr: [
        'contact',
        'support',
        'module contact',
        'a quoi sert le contact',
        'contact et support',
        'envoyer email',
        'envoyer courriel',
        'formulaire de contact',
        'service client',
        'aide',
        'assistance',
        'message',
        'proposition commerciale',
      ],
    },
    titles: {
      es: 'Módulo de Contacto y Soporte Comercial',
      en: 'Contact and Sales Support Module',
      fr: 'Module de Contact et Support Commercial',
    },
    content: {
      es: `El módulo de **Contacto y Soporte** permite al equipo comercial y a los clientes comunicarse de forma directa y segura:

1. **Envío de Propuestas:** Redacta y despacha propuestas comerciales personalizadas utilizando el editor de texto enriquecido con formato profesional.
2. **Consultas y Asistencia:** Canaliza dudas sobre facturas emitidas, tramos de tarificación o soporte de cuentas corporativas sin salir de la plataforma.
3. **Seguridad y Validación:** Todas las comunicaciones cuentan con sanitización anti-XSS y validación estricta de direcciones de correo conforme al estándar RFC 5322.`,
      en: `The **Contact and Support** module enables sales reps and customers to communicate directly and securely:

1. **Proposal Dispatch:** Draft and dispatch tailored commercial proposals using the rich-text WYSIWYG editor.
2. **Inquiries & Assistance:** Resolve questions regarding invoices, pricing tiers, or corporate account management.
3. **Security & Validation:** All messages feature anti-XSS sanitization and strict RFC 5322 email validation.`,
      fr: `Le module de **Contact et Support** permet à l'équipe commerciale et aux clients d'échanger directement :

1. **Envoi de Propositions :** Rédigez et envoyez des propositions commerciales personnalisées avec l'éditeur de texte enrichi.
2. **Assistance et Questions :** Posez vos questions sur les factures, les paliers de tarification ou les comptes clients.
3. **Sécurité et Validation :** Toutes les communications bénéficient d'une désinfection anti-XSS et d'une validation stricte RFC 5322.`,
    },
    actions: [
      {
        labels: {
          es: 'Ir a Contacto y Soporte',
          en: 'Go to Contact & Support',
          fr: 'Aller à Contact et Support',
        },
        route: '/contact',
        icon: 'contact_support',
      },
    ],
    sources: [
      'ai-workspace/01-specs/functional-specs.md (Sec. 2.5)',
      'ai-workspace/02-architecture/architecture-guidelines.md (Sec. 3.12)',
    ],
  },
];
