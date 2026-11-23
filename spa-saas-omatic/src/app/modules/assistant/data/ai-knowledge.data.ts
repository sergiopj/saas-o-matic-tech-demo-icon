import { KnowledgeTopic, QuickPrompt } from '../models/ai-assistant.model';

export const AI_KNOWLEDGE_TOPICS: readonly KnowledgeTopic[] = [
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
      de: [
        'rechnung herunterladen',
        'pdf herunterladen',
        'wo herunterladen',
        'rechnungs-pdf',
        'pdf download',
        'herunterladen',
        'download',
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
      de: 'Rechnung als PDF herunterladen',
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
      de: `Sie können das offizielle Rechnungs-PDF in 2 schnellen Schritten herunterladen:

1. Gehen Sie zu **Rechnungen & Abrechnung** (oder nutzen Sie den Button unten).
2. Klicken Sie in der Tabelle auf das Symbol **PDF herunterladen** in der Aktionsspalte.

Das PDF wird sofort mit allen Preisstufen, Steuern und der offiziellen Belegnummer \`INV-YYYY-XXXX\` generiert.`,
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
          de: 'Zu Rechnungen & Abrechnung',
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
      de: [
        'rechnung stornieren',
        'stornieren',
        'stornierung',
        'abbrechen',
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
      de: 'Rechnung stornieren',
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
      de: `So stornieren Sie eine Rechnung:

1. Öffnen Sie **Rechnungen & Abrechnung**.
2. Klicken Sie in der Rechnungszeile auf **Stornieren** (Papierkorb-Symbol).
3. Bestätigen Sie im Dialogfenster, um den Status sicher auf \`CANCELLED\` zu setzen.`,
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
          de: 'Zu Rechnungen & Abrechnung',
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
      de: [
        'rechnung',
        'rechnungen',
        'abrechnung',
        'entwurf',
        'bezahlt',
        'lebenszyklus',
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
      de: 'Rechnungen & Abrechnung',
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
      de: `Das Modul **Rechnungen & Abrechnung** verwaltet die Belege:

• **Nummerierung:** \`INV-YYYY-XXXX\` fortlaufend pro Geschäftsjahr.
• **Status:** \`DRAFT\`, \`ISSUED\`, \`PAID\` oder \`CANCELLED\`.
• **Export:** PDF-Download mit Steueraufschlüsselung.`,
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
          de: 'Rechnungen anzeigen',
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
      de: [
        'stufe',
        'stufen',
        'staffel',
        'staffeln',
        'staffelpreis',
        'staffelpreise',
        'preis',
        'preise',
        'tarif',
        'tarife',
        'berechnen',
        'berechnung',
        'kosten',
        'benutzer',
        '15 benutzer',
        '15',
        '140',
        '60 benutzer',
        '60',
        '470',
        'speicher',
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
      de: 'Staffelpreis-Engine',
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
      de: `Die Abrechnung erfolgt progressiv nach aktiven Benutzern:

• **Stufe 1 (0–10 Benutzer):** 10,00 € / Benutzer
• **Stufe 2 (11–50 Benutzer):** 8,00 € / Benutzer
• **Stufe 3 (>50 Benutzer):** 5,00 € / Benutzer
• **Zusatz:** Speicher (0,15 €/GB) und API (0,001 €/Aufruf).

**Offizielles Challenge-Beispiel (15 Benutzer):**
(10 × 10 €) + (5 × 8 €) = 100 € + 40 € = **140,00 €/Monat** Basis + MwSt.

**Beispiel für 60 Benutzer:**
(10 × 10 €) + (40 × 8 €) + (10 × 5 €) = **470,00 €/Monat** Basis.`,
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
          de: 'Staffel-Simulator öffnen',
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
      de: [
        'cif',
        'nif',
        'dni',
        'nie',
        'steuer',
        'steuern',
        'steuerid',
        'vat',
        'ust',
        'aeat',
        'validieren',
        'prüfung',
        'algorithmus',
        'spanien',
        'finanzamt',
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
      de: 'Steuer-ID Validierung',
      fr: 'Validation Fiscale',
    },
    content: {
      es: `Validación de identificadores fiscales según la jurisdicción del cliente:

• **España (ES):** Algoritmo oficial de la AEAT para DNI (módulo 23), NIE (prefijo X/Y/Z) y CIF (Luhn ponderado).
• **Internacional (DE, FR, US, CH):** Formato alfanumérico normalizado de 5 a 20 caracteres con ejemplos contextuales.`,
      en: `Strict tax identifier validation based on customer jurisdiction:

• **Spain (ES):** Official AEAT algorithms for DNI (mod 23), NIE (prefix X/Y/Z), and CIF (weighted Luhn check).
• **International (DE, FR, US, CH):** Normalized 5–20 alphanumeric characters with contextual examples.`,
      de: `Algorithmische Steuer-ID-Validierung nach Ländern:

• **Spanien (ES):** Offizielle AEAT-Algorithmen für DNI (Mod 23), NIE und CIF (gewichtete Quersumme).
• **International (DE, FR, US, CH):** 5 bis 20 alphanumerische Zeichen mit Beispielen.`,
      fr: `Validation des identifiants fiscaux selon la juridiction :

• **Espagne (ES) :** Algorithmes officiels de l'AEAT pour DNI (mod 23), NIE et CIF (Luhn pondéré).
• **International (DE, FR, US, CH) :** Format alphanumérique normalisé de 5 à 20 caractères.`,
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
      de: [
        'währung',
        'währungen',
        'geld',
        'eur',
        'usd',
        'gbp',
        'chf',
        'wechselkurs',
        'umrechnung',
        'konvertieren',
        'synchronisation',
        'offline',
        'cache',
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
      de: 'Währungen & Live-Umrechnung',
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
      de: `Der Optimierer unterstützt 4 Währungen:

• **Währungen:** EUR (Basis), USD, GBP und CHF.
• **Live-Umrechnung:** Synchronisation mit öffentlicher Wechselkurs-API.
• **Offline-Modus:** Automatischer Fallback auf gecachte Kurse bei Netzausfall.`,
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
      de: [
        'kunde',
        'kunden',
        'unternehmen',
        'firma',
        'firmen',
        'erstellen',
        'registrieren',
        'anmeldung',
        'email',
        'vertrieb',
        'filter',
        'paginierung',
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
      de: 'Geschäftskunden-Verwaltung',
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
      de: `Im Modul **Geschäftskunden** können Sie:

• **Kunden anlegen:** Sofortige Prüfung der Eingaben beim Tippen.
• **Erweiterte Filter:** Suche nach Firmenname, Steuer-ID und Land.
• **Angebote versenden:** Integrierter E-Mail-Composer für maßgeschneiderte Angebote.`,
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
          de: 'Zu Geschäftskunden',
          fr: 'Aller aux Clients',
        },
        route: '/customers',
        icon: 'groups',
      },
    ],
    sources: ['Gestión de Clientes'],
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
        'ports',
        'adapters',
        'puertos',
        'adaptadores',
        'typeorm',
        'rfc 7807',
        'signals',
        'clean code',
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
        'typeorm',
        'rfc 7807',
        'signals',
        'clean code',
      ],
      de: [
        'architektur',
        'hexagonal',
        'backend',
        'frontend',
        'nestjs',
        'angular',
        'sqlite',
        'wal',
        'ports',
        'adapters',
        'typeorm',
        'rfc 7807',
        'signals',
        'clean code',
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
        'typeorm',
        'rfc 7807',
        'signals',
        'clean code',
      ],
    },
    titles: {
      es: 'Arquitectura Hexagonal',
      en: 'Hexagonal Architecture',
      de: 'Hexagonale Architektur',
      fr: 'Architecture Hexagonale',
    },
    content: {
      es: `Arquitectura técnica limpia desacoplada en tres capas:

• **Backend (NestJS):** Dominio inmaculado en TypeScript puro, puertos de entrada/salida, persistencia SQLite en modo WAL y errores RFC 7807.
• **Frontend (Angular 22):** Componentes standalone reactivos con Signals, cero Tailwind y tokens de diseño centralizados \`--omatic-*\`.`,
      en: `Clean decoupled technical architecture:

• **Backend (NestJS):** Immaculate pure TypeScript domain, in/out ports, SQLite with concurrent WAL mode, and RFC 7807 Problem Details.
• **Frontend (Angular 22):** Reactive standalone components using Angular Signals, zero Tailwind, and centralized \`--omatic-*\` tokens.`,
      de: `Saubere hexagonale Systemarchitektur:

• **Backend (NestJS):** Reines TypeScript-Domänenmodell, Ports & Adapters, SQLite im WAL-Modus und RFC 7807.
• **Frontend (Angular 22):** Standalone-Komponenten mit Signals und \`--omatic-*\` CSS-Tokens.`,
      fr: `Architecture technique propre et découplée :

• **Backend (NestJS) :** Domaine pur en TypeScript, ports et adaptateurs, SQLite en mode WAL et standard RFC 7807.
• **Frontend (Angular 22) :** Composants autonomes avec Signals et tokens \`--omatic-*\`.`,
    },
    sources: ['Directrices de Arquitectura'],
  },
  {
    id: 'cicd_devops',
    keywords: {
      es: [
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
      en: [
        'ci',
        'cd',
        'github actions',
        'pipeline',
        'docker',
        'nginx',
        'oxlint',
        'vitest',
        'jest',
        'coverage',
        'quality',
        'test',
        'tests',
        'deployment',
      ],
      de: [
        'ci',
        'cd',
        'github actions',
        'pipeline',
        'docker',
        'nginx',
        'oxlint',
        'vitest',
        'jest',
        'abdeckung',
        'qualität',
        'test',
        'tests',
        'bereitstellung',
      ],
      fr: [
        'ci',
        'cd',
        'github actions',
        'pipeline',
        'docker',
        'nginx',
        'oxlint',
        'vitest',
        'jest',
        'couverture',
        'qualité',
        'qualite',
        'test',
        'tests',
        'déploiement',
      ],
    },
    titles: {
      es: 'Pipeline CI/CD y Calidad',
      en: 'CI/CD Pipeline & Quality',
      de: 'CI/CD & Qualität',
      fr: 'Pipeline CI/CD et Qualité',
    },
    content: {
      es: `Infraestructura de entrega continua y pruebas automatizadas:

• **GitHub Actions:** 8 jobs paralelos desacoplados para backend y frontend.
• **Calidad de código:** Oxlint con 0 errores y cobertura de tests superior al 96%.
• **Docker:** Imágenes multi-stage ligeras con Nginx Alpine y Node 22 slim.`,
      en: `Continuous deployment and automated testing pipeline:

• **GitHub Actions:** 8 decoupled parallel jobs for backend and frontend.
• **Code Quality:** Oxlint with 0 errors and test coverage exceeding 96%.
• **Docker:** Optimized multi-stage images with Nginx Alpine and Node 22 slim.`,
      de: `Automatisierte CI/CD-Pipeline:

• **GitHub Actions:** 8 parallele Jobs für Tests, Linter, Build und Docker.
• **Qualität:** 0 Oxlint-Fehler und über 96% Testabdeckung.
• **Docker:** Schlanke Multi-Stage-Images mit Nginx Alpine und Node 22.`,
      fr: `Infrastructure de test et déploiement continu :

• **GitHub Actions :** 8 tâches parallèles pour tests, build et conteneurs.
• **Qualité :** 0 erreur Oxlint et couverture de test supérieure à 96%.
• **Docker :** Images multi-étapes légères avec Nginx Alpine et Node 22.`,
    },
    sources: ['Infraestructura CI/CD'],
  },
  {
    id: 'guide_video',
    keywords: {
      es: [
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
      en: [
        'guide',
        'video',
        'demo',
        'tutorial',
        'help',
        'slides',
        'player',
        'onboarding',
        'walkthrough',
      ],
      de: [
        'leitfaden',
        'anleitung',
        'video',
        'demo',
        'tutorial',
        'hilfe',
        'folien',
        'player',
        'einführung',
      ],
      fr: [
        'guide',
        'vidéo',
        'video',
        'démo',
        'demo',
        'tutoriel',
        'aide',
        'diapositives',
        'lecteur',
        'onboarding',
      ],
    },
    titles: {
      es: 'Guía y Vídeo Demo',
      en: 'Guide & Demo Video',
      de: 'Leitfaden & Video',
      fr: 'Guide et Vidéo Démo',
    },
    content: {
      es: `El módulo de **Guía y Documentación** ofrece:

• **Vídeo Demo 16:9:** Reproductor accesible con atajos (K/Espacio para pausar, M para silenciar, F para pantalla completa).
• **Paso a Paso:** Diapositivas interactivas con las ventajas clave de clientes, simulador y facturas.`,
      en: `The **Guide & Documentation** module offers:

• **Demo Video:** 16:9 player with keyboard shortcuts (K/Space to pause, M to mute, F for fullscreen).
• **Step-by-Step:** Interactive walkthrough slides guiding through customers, simulations, and billing.`,
      de: `Das Modul **Leitfaden & Dokumentation** bietet:

• **Demovideo:** 16:9 Player mit Tastaturkürzeln (K/Leertaste, M, F).
• **Schritt-für-Schritt:** Interaktive Folien für Kunden, Simulationen und Rechnungen.`,
      fr: `Le module **Guide et Documentation** propose :

• **Vidéo Démo :** Lecteur 16:9 avec raccourcis clavier (K/Espace, M, F).
• **Pas-à-pas :** Diapositives interactives guidant à travers clients, simulations et facturation.`,
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
    sources: ['Guía Interactiva'],
  },
  {
    id: 'contact_support',
    keywords: {
      es: [
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
      en: [
        'contact',
        'support',
        'technical',
        'help',
        'ticket',
        'issue',
        'inquiry',
        'form',
        'commercial',
      ],
      de: [
        'kontakt',
        'support',
        'technisch',
        'hilfe',
        'ticket',
        'problem',
        'anfrage',
        'formular',
        'kundenservice',
      ],
      fr: [
        'contact',
        'support',
        'technique',
        'aide',
        'ticket',
        'problème',
        'probleme',
        'demande',
        'formulaire',
        'assistance',
      ],
    },
    titles: {
      es: 'Contacto y Soporte',
      en: 'Contact & Support',
      de: 'Kontakt & Support',
      fr: 'Contact et Support',
    },
    content: {
      es: `Puedes enviar consultas comerciales, dudas de tarificación o incidencias técnicas mediante el formulario de **Contacto y Soporte**. Los mensajes cuentan con sanitización automática anti-XSS.`,
      en: `You can submit commercial inquiries, pricing questions, or technical tickets via the **Contact & Support** form. Payloads are pre-sanitized against XSS.`,
      de: `Über das Formular **Kontakt & Support** können Sie kommerzielle oder technische Anfragen senden. Eingaben werden automatisch bereinigt.`,
      fr: `Vous pouvez soumettre vos demandes commerciales ou techniques via le formulaire **Contact et Support**. Les messages sont assainis automatiquement contre les failles XSS.`,
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
    sources: ['Contacto y Soporte'],
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
      ],
      de: [
        'kriterien',
        'bewertungskriterien',
        'bewertung',
        'rubrik',
        'gewichtung',
        'prozente',
        '35%',
        '25%',
        '30%',
        '10%',
        'challenge',
        'beurteilung',
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
      ],
    },
    titles: {
      es: 'Criterios de Evaluación Oficiales del Reto',
      en: 'Official Challenge Evaluation Criteria',
      de: 'Offizielle Bewertungskriterien der Challenge',
      fr: 'Critères d\'Évaluation Officiels du Défi',
    },
    content: {
      es: `Los criterios oficiales de evaluación del reto técnico se dividen en 4 áreas clave:

• **Planificación y Diseño (35%):** Desglose de reglas de negocio, modelos y contratos OpenAPI antes de programar (*Spec-Driven Development* en \`ai-workspace/01-specs/\`).
• **Calidad del Software Entregado (30%):** Robustez del backend (cálculo de tramos, validación estricta AEAT de DNI/CIF, SQLite) y frontend (Angular 22, reactividad con Signals, responsive).
• **Criterio Técnico y Control de Calidad (25%):** Rol de "director de orquesta", auditando a la IA (*Vibe Coding*), eliminando deuda técnica y garantizando 0 errores y >96% cobertura.
• **README y Despliegue (10%):** Instrucciones sin fricción para levantar frontend y backend en local o en un comando con Docker Compose.`,
      en: `The official technical challenge evaluation criteria are weighted into 4 key areas:

• **Planning & Design (35%):** Prior breakdown of functional specifications, models, and API contracts before coding (*Spec-Driven Development* in \`ai-workspace/01-specs/\`).
• **Software Quality (30%):** Backend robustness (tiered calculation, strict AEAT DNI/CIF validation, SQLite) and frontend responsiveness (Angular 22, Signals, responsive design).
• **Technical Judgment & QA (25%):** Your role as "orchestra conductor", auditing AI output in real time (*Vibe Coding*), eliminating technical debt, and ensuring zero errors and >96% coverage.
• **README & Frictionless Deployment (10%):** Clear instructions to run frontend and backend locally or with a single Docker Compose command.`,
      de: `Die offiziellen Bewertungskriterien der Challenge gliedern sich in 4 Kernbereiche:

• **Planung & Design (35%):** Vorab-Spezifikation von Fachregeln und API-Verträgen (*Spec-Driven Development* in \`ai-workspace/01-specs/\`).
• **Softwarequalität (30%):** Backend-Robustheit (Staffelpreise, spanische Steuer-ID-Prüfung) und reaktives Frontend (Angular 22, Signals).
• **Technisches Urteilsvermögen & QA (25%):** Rolle als "Orchesterdirigent", Code-Audits der KI (*Vibe Coding*) und Beseitigung technischer Schulden.
• **README & Deployment (10%):** Reibungslose Inbetriebnahme lokal oder per Docker Compose.`,
      fr: `Les critères d'évaluation officiels du défi technique se divisent en 4 axes majeurs :

• **Planification et Design (35%) :** Décomposition préalable des spécifications et contrats d'API (*Spec-Driven Development* dans \`ai-workspace/01-specs/\`).
• **Qualité du Logiciel (30%) :** Robustesse du backend (calcul par paliers, validation stricte AEAT, SQLite) et réactivité frontend (Angular 22, Signals).
• **Jugement Technique et QA (25%) :** Rôle de "chef d'orchestre", audit en temps réel de l'IA (*Vibe Coding*) et élimination de la dette technique.
• **README et Déploiement (10%) :** Instructions claires pour lancer le projet en local ou avec Docker Compose.`,
    },
    actions: [
      {
        labels: {
          es: 'Ver Guía y Arquitectura',
          en: 'View Guide & Architecture',
          de: 'Leitfaden anzeigen',
          fr: 'Voir le Guide',
        },
        route: '/guide',
        icon: 'military_tech',
      },
    ],
    sources: ['Prueba_Devs_con_IA.docx (Sec. 4)', 'ai-workspace/01-specs/functional-specs.md'],
  },
  {
    id: 'challenge_overview',
    keywords: {
      es: [
        'reto',
        'objetivo del reto',
        'de que va',
        'para que sirve',
        'filosofia',
        'filosofía',
        'propósito',
        'proposito',
        'saas-o-matic',
        'que es saas-o-matic',
        'qué es saas-o-matic',
        'descripcion del proyecto',
        'descripción del proyecto',
      ],
      en: [
        'challenge',
        'challenge overview',
        'goal',
        'purpose',
        'what is saas-o-matic',
        'philosophy',
        'project description',
        'objective',
      ],
      de: [
        'challenge',
        'ziel',
        'zweck',
        'was ist saas-o-matic',
        'philosophie',
        'projektbeschreibung',
      ],
      fr: [
        'défi',
        'defi',
        'objectif',
        'but',
        'qu est ce que saas-o-matic',
        'philosophie',
        'description du projet',
      ],
    },
    titles: {
      es: 'Propósito y Filosofía del Reto SaaS-O-Matic',
      en: 'SaaS-O-Matic Purpose & Challenge Philosophy',
      de: 'Ziel und Philosophie der SaaS-O-Matic Challenge',
      fr: 'Objectif et Philosophie du Défi SaaS-O-Matic',
    },
    content: {
      es: `**SaaS-O-Matic** es una herramienta interna para que el equipo comercial simule, optimice y presupueste suscripciones SaaS multi-divisa para clientes corporativos.

**Filosofía del Reto:**
Ya no se evalúa la velocidad para picar código repetitivo de memoria. Lo fundamental es el criterio de ingeniería, el diseño de sistemas, estructurar planes de desarrollo (*Spec-Driven Development*) y guiar a la IA en caliente (*Vibe Coding*), manteniendo el control de la arquitectura, la calidad del código y la seguridad.`,
      en: `**SaaS-O-Matic** is an internal tool designed for the sales team to simulate, optimize, and quote multi-currency SaaS subscriptions for corporate customers.

**Challenge Philosophy:**
The goal is no longer testing repetitive typing speed. The core focus is engineering judgment, system design, structuring specs before coding (*Spec-Driven Development*), and guiding AI models in real time (*Vibe Coding*) while retaining full control of architecture, quality, and security.`,
      de: `**SaaS-O-Matic** ist ein internes Vertriebstool zur Simulation, Optimierung und Angebotserstellung von mehrwährungsfähigen SaaS-Abonnements.

**Philosophie:**
Es geht nicht um mechanisches Coden aus dem Gedächtnis, sondern um Engineering-Urteil, Systemarchitektur (*Spec-Driven Development*) und das Führen der KI (*Vibe Coding*) mit vollständiger Qualitätskontrolle.`,
      fr: `**SaaS-O-Matic** est un outil interne permettant à l'équipe commerciale de simuler, optimiser et deviser des abonnements SaaS multi-devises pour clients d'entreprise.

**Philosophie du Défi :**
Le but n'est plus d'évaluer la saisie mécanique de code. La valeur réside dans le discernement d'ingénierie, la conception de systèmes (*Spec-Driven Development*) et le pilotage de l'IA (*Vibe Coding*) en garantissant qualité et sécurité.`,
    },
    actions: [
      {
        labels: {
          es: 'Ir al Simulador Comercial',
          en: 'Go to Sales Simulator',
          de: 'Zum Vertriebs-Simulator',
          fr: 'Aller au Simulateur',
        },
        route: '/simulations',
        icon: 'calculate',
      },
    ],
    sources: ['Prueba_Devs_con_IA.docx (Sec. 1-2)'],
  },
  {
    id: 'ai_workspace_methodology',
    keywords: {
      es: [
        'ai-workspace',
        'workspace',
        'spec-driven',
        'spec driven',
        'vibe coding',
        'bitacora',
        'bitácora',
        'prompts',
        'auditoria',
        'auditorías',
        'metodologia',
        'metodología',
        'director de orquesta',
        'claude',
        'antigravity',
        'como se uso la ia',
        'cómo se usó la ia',
      ],
      en: [
        'ai-workspace',
        'workspace',
        'spec-driven',
        'spec driven development',
        'vibe coding',
        'prompt log',
        'audit log',
        'methodology',
        'orchestra conductor',
        'claude',
        'antigravity',
        'how ai was used',
      ],
      de: [
        'ai-workspace',
        'arbeitsbereich',
        'spec-driven',
        'vibe coding',
        'prompt-protokoll',
        'audit',
        'methodik',
        'orchesterdirigent',
      ],
      fr: [
        'ai-workspace',
        'spec-driven',
        'vibe coding',
        'journal des prompts',
        'audit',
        'méthodologie',
        'methodologie',
        'chef d orchestre',
      ],
    },
    titles: {
      es: 'Metodología y Espacio de Trabajo con IA (/ai-workspace)',
      en: 'AI Workspace & Methodology (/ai-workspace)',
      de: 'KI-Methodik & Arbeitsbereich (/ai-workspace)',
      fr: 'Méthodologie et Espace de Travail IA (/ai-workspace)',
    },
    content: {
      es: `La carpeta \`/ai-workspace\` en la raíz del repositorio documenta el proceso de ingeniería en 3 dimensiones:

• **1. Planificación y Specs (\`01-specs/\`):** Reglas de negocio, contratos de API REST (OpenAPI 3.1) y especificaciones funcionales antes de redactar código (*Spec-Driven Development*).
• **2. Definición de Arquitectura (\`02-architecture/\`):** Patrones hexagonales, dominio inmaculado, SQLite WAL, SSOT en \`_colors.scss\` y reglas en \`AGENTS.md\`.
• **3. Vibe Coding y Auditoría (\`03-vibe-coding-log/prompts-and-audits.md\`):** Bitácora sincronizada prompt a prompt con auditorías técnicas, correcciones de SonarQube/Oxlint y validación del 100% de tests.`,
      en: `The \`/ai-workspace\` folder at repository root documents the engineering process across 3 core dimensions:

• **1. Specs & Planning (\`01-specs/\`):** Business rules, OpenAPI 3.1 contracts, and functional specs defined prior to implementation (*Spec-Driven Development*).
• **2. Architecture Definition (\`02-architecture/\`):** Hexagonal patterns, clean domain, SQLite WAL, design token SSOT, and \`AGENTS.md\` governance.
• **3. Vibe Coding & Quality Audits (\`03-vibe-coding-log/prompts-and-audits.md\`):** Synchronous prompt-by-prompt log capturing technical audits, SonarQube/Oxlint fixes, and 100% test pass verification.`,
      de: `Der Ordner \`/ai-workspace\` dokumentiert die 3 Dimensionen der Entwicklungsarbeit:

• **1. Spezifikationen (\`01-specs/\`):** Fachregeln und OpenAPI-Verträge vor der Codegenerierung (*Spec-Driven Development*).
• **2. Architektur (\`02-architecture/\`):** Hexagonale Schichten, saubere Domäne, SQLite WAL und \`AGENTS.md\`.
• **3. Vibe Coding Log (\`03-vibe-coding-log/\`):** Detaillierte Prompt-Dokumentation mit Code-Audits und Qualitätssicherung.`,
      fr: `Le dossier \`/ai-workspace\` détaille le processus d'ingénierie selon 3 dimensions :

• **1. Spécifications (\`01-specs/\`):** Règles métier et contrats OpenAPI rédigés avant l'écriture du code (*Spec-Driven Development*).
• **2. Architecture (\`02-architecture/\`):** Approche hexagonale, domaine pur, SQLite WAL et règles \`AGENTS.md\`.
• **3. Vibe Coding et Audit (\`03-vibe-coding-log/\`):** Journal synchrone prompt par prompt avec audits techniques et 100% de tests réussis.`,
    },
    actions: [
      {
        labels: {
          es: 'Consultar Documentación',
          en: 'View Documentation',
          de: 'Dokumentation anzeigen',
          fr: 'Consulter la Documentation',
        },
        route: '/guide',
        icon: 'menu_book',
      },
    ],
    sources: ['ai-workspace/03-vibe-coding-log/prompts-and-audits.md', 'AGENTS.md'],
  },
  {
    id: 'pricing_taxes',
    keywords: {
      es: [
        'iva',
        'impuesto',
        'impuestos',
        'tax',
        'taxes',
        'vat',
        'porcentaje iva',
        'pais',
        'paises',
        'impuesto pais',
        'cuanto iva',
        'cuánto iva',
        '21%',
        '19%',
        '20%',
        '0%',
      ],
      en: [
        'tax',
        'taxes',
        'vat',
        'iva',
        'country tax',
        'tax percentage',
        'tax rate',
        '21%',
        '19%',
        '20%',
        '0%',
      ],
      de: [
        'steuer',
        'steuern',
        'mwst',
        'ust',
        'mehrwertsteuer',
        'steuersatz',
        'länderspezifisch',
        '21%',
        '19%',
        '20%',
      ],
      fr: [
        'taxe',
        'taxes',
        'tva',
        'taux tva',
        'taux taxe',
        'impôt',
        '21%',
        '19%',
        '20%',
        '0%',
      ],
    },
    titles: {
      es: 'Impuestos y Tasas Fiscales por País',
      en: 'Country Taxes & VAT Rates',
      de: 'Länderspezifische Steuern & USt',
      fr: 'Taxes et TVA par Pays',
    },
    content: {
      es: `Al subtotal base de la suscripción se le suma el impuesto oficial según el país del cliente:

• **España (ES):** 21% IVA
• **Alemania (DE):** 19% USt
• **Francia (FR):** 20% TVA
• **Estados Unidos (US) / Otros internacionales:** 0% (inversión de sujeto pasivo / exento).

El impuesto se calcula con precisión de 2 decimales y se refleja en el simulador, en las facturas emitidas y en el PDF oficial.`,
      en: `The official tax rate corresponding to the customer's country is applied to the net base subscription:

• **Spain (ES):** 21% IVA
• **Germany (DE):** 19% USt
• **France (FR):** 20% TVA
• **United States (US) / International:** 0% (reverse charge / exempt).

Taxes are calculated with 2-decimal financial precision and included across simulations, issued invoices, and generated PDFs.`,
      de: `Auf die monatliche Netto-Abonnementbasis wird die jeweilige Landessteuer aufgeschlagen:

• **Spanien (ES):** 21% IVA
• **Deutschland (DE):** 19% USt
• **Frankreich (FR):** 20% TVA
• **USA (US) / International:** 0% (Steuerbefreit / Reverse-Charge).`,
      fr: `La taxe officielle selon le pays du client s'applique sur le sous-total net de l'abonnement :

• **Espagne (ES) :** 21% TVA
• **Allemagne (DE) :** 19% USt
• **France (FR) :** 20% TVA
• **États-Unis (US) / International :** 0% (exonéré).`,
    },
    actions: [
      {
        labels: {
          es: 'Simular con Impuestos',
          en: 'Simulate with Taxes',
          de: 'Mit Steuern simulieren',
          fr: 'Simuler avec Taxes',
        },
        route: '/simulations',
        icon: 'calculate',
      },
    ],
    sources: ['ai-workspace/01-specs/functional-specs.md (Sec. 2.2)'],
  },
  {
    id: 'run_locally_deployment',
    keywords: {
      es: [
        'levantar',
        'ejecutar',
        'arrancar',
        'despliegue',
        'desplegar',
        'docker',
        'docker compose',
        'docker-compose',
        'npm start',
        'npm run',
        'local',
        'instrucciones',
        'puerto',
        'puertos',
        'como ejecuto',
        'cómo ejecuto',
        'como levantar',
        'cómo levantar',
      ],
      en: [
        'run',
        'run locally',
        'start',
        'deploy',
        'deployment',
        'docker',
        'docker compose',
        'docker-compose',
        'npm start',
        'npm run',
        'instructions',
        'ports',
        'how to run',
        'how to start',
      ],
      de: [
        'starten',
        'ausführen',
        'bereitstellung',
        'deployment',
        'docker',
        'docker compose',
        'lokal',
        'anleitung',
        'ports',
        'wie starte ich',
      ],
      fr: [
        'lancer',
        'démarrer',
        'demarrer',
        'déploiement',
        'deploiement',
        'docker',
        'docker compose',
        'instructions',
        'ports',
        'comment lancer',
      ],
    },
    titles: {
      es: 'Instrucciones de Despliegue y Ejecución Local',
      en: 'Deployment & Local Execution Instructions',
      de: 'Deployment & Lokale Ausführung',
      fr: 'Instructions de Déploiement et Exécution Locale',
    },
    content: {
      es: `Puedes levantar el proyecto en local o con Docker en pocos pasos sin fricción:

• **Docker Compose (Recomendado, 1 comando):**
\`docker-compose up -d --build\` (Frontend en \`http://localhost:80\` y Backend en \`http://localhost:3000\`).

• **Arranque en Local:**
1. Backend: \`cd mic-saas-omatic && npm install && npm run start:dev\`
2. Frontend: \`cd spa-saas-omatic && npm install && npm start\` (disponible en \`http://localhost:4200\`).

• **Ejecución de Tests y Linter:**
Backend: \`npm --prefix mic-saas-omatic test\` (Jest)
Frontend: \`npm --prefix spa-saas-omatic test\` (Vitest) y \`npm run lint\` (Oxlint).`,
      en: `You can run the project locally or with Docker in a few frictionless steps:

• **Docker Compose (Recommended, 1 command):**
\`docker-compose up -d --build\` (Frontend at \`http://localhost:80\` and Backend at \`http://localhost:3000\`).

• **Local Execution:**
1. Backend: \`cd mic-saas-omatic && npm install && npm run start:dev\`
2. Frontend: \`cd spa-saas-omatic && npm install && npm start\` (opens at \`http://localhost:4200\`).

• **Running Tests & Linting:**
Backend: \`npm --prefix mic-saas-omatic test\` (Jest)
Frontend: \`npm --prefix spa-saas-omatic test\` (Vitest) and \`npm run lint\` (Oxlint).`,
      de: `Sie können das Projekt lokal oder per Docker ausführen:

• **Docker Compose (Empfohlen):**
\`docker-compose up -d --build\` (Frontend Port 80, Backend Port 3000).

• **Lokal:**
1. Backend: \`cd mic-saas-omatic && npm install && npm run start:dev\`
2. Frontend: \`cd spa-saas-omatic && npm install && npm start\` (\`http://localhost:4200\`).`,
      fr: `Vous pouvez lancer le projet en local ou avec Docker sans friction :

• **Docker Compose (Recommandé) :**
\`docker-compose up -d --build\` (Frontend port 80, Backend port 3000).

• **Exécution locale :**
1. Backend : \`cd mic-saas-omatic && npm install && npm run start:dev\`
2. Frontend : \`cd spa-saas-omatic && npm install && npm start\` (\`http://localhost:4200\`).`,
    },
    actions: [
      {
        labels: {
          es: 'Ver Guía Completa',
          en: 'View Full Guide',
          de: 'Vollständigen Leitfaden anzeigen',
          fr: 'Voir le Guide Complet',
        },
        route: '/guide',
        icon: 'terminal',
      },
    ],
    sources: ['README.md', 'docker-compose.yml'],
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
      de: [
        'simulator',
        'simulation',
        'simulationen',
        'schieberegler',
        'hochrechnung',
        'wie simuliere ich',
        'neue simulation',
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
      de: 'Interaktiver Abonnement-Simulator',
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
      de: `Der **Interaktive Simulator** ermöglicht Kostenprognosen in Echtzeit:

1. **Dynamische Regler:** Schieberegler für Benutzer (1–500), Speicher (GB) und API-Aufrufe.
2. **Live-Vorschau:** Visuelle Stufenaufteilung und Währungsumrechnung (EUR, USD, GBP, CHF).
3. **Speichern:** Persistierung in SQLite (\`POST /simulations\`) für den gewählten Kunden.`,
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
          de: 'Simulator öffnen',
          fr: 'Ouvrir le Simulateur',
        },
        route: '/simulations',
        icon: 'calculate',
      },
    ],
    sources: ['ai-workspace/01-specs/functional-specs.md (Sec. 2.2)'],
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
    id: 'prompt_simulations',
    labelKey: 'assistant.prompts.simulations',
    query: '¿Cómo simulo el coste mensual y el desglose de tramos?',
    icon: 'tune',
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
    id: 'prompt_customers',
    labelKey: 'assistant.prompts.customers',
    query: '¿Cómo se registran los clientes corporativos y se redacta un correo?',
    icon: 'groups',
  },
] as const;
