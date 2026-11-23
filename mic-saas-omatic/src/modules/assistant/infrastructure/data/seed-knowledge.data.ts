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
3. **Persistencia:** Guarda la simulación en SQLite (\`POST /simulations\`) vinculada al cliente seleccionado.`,
      en: `The **Interactive Simulator** enables the sales team to project subscription costs in real time:

1. **Dynamic Controls:** Adjust active users slider (1–500), storage in GB, and estimated API calls.
2. **Live Projection:** Visual tier breakdown and instant currency conversion (EUR, USD, GBP, CHF).
3. **Persistence:** Save the calculation to SQLite (\`POST /simulations\`) linked to the selected corporate customer.`,
      fr: `Le **Simulateur Interactif** permet de projeter les coûts d'abonnement en temps réel :

1. **Contrôles dynamiques :** Curseurs pour utilisateurs (1–500), stockage en Go et appels API.
2. **Projection en direct :** Détail par paliers et conversion instantanée (EUR, USD, GBP, CHF).
3. **Persistance :** Enregistrement dans SQLite (\`POST /simulations\`) lié au client.`,
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
];
