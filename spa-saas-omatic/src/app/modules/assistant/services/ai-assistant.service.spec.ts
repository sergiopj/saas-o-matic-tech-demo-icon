import { TestBed } from '@angular/core/testing';
import { AiAssistantService } from './ai-assistant.service';
import { QUICK_PROMPTS } from '../data/ai-knowledge.data';
import { I18nService } from '../../../core/services/i18n.service';

describe('AiAssistantService', () => {
  let service: AiAssistantService;
  let i18nService: I18nService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AiAssistantService, I18nService],
    });

    i18nService = TestBed.inject(I18nService);
    i18nService.setLanguage('es');
    service = TestBed.inject(AiAssistantService);
    service.resetConversation();
  });

  it('should be created and initialized with an initial welcome message', () => {
    expect(service).toBeTruthy();
    expect(service.messages().length).toBe(1);
    expect(service.messages()[0].sender).toBe('assistant');
    expect(service.messages()[0].content).toContain('¡Hola! 👋 Soy tu copiloto en SaaS-O-Matic.');
    expect(service.isTyping()).toBe(false);
  });

  it('should have predefined quick prompts', () => {
    expect(service.quickPrompts().length).toBe(QUICK_PROMPTS.length);
    expect(service.quickPrompts()[0].id).toBe('prompt_challenge');
  });

  it('should resolve pricing tiers answer with action and calculation details in Spanish', () => {
    const answer = service.resolveAnswer('¿Cómo se calculan los precios por tramos?', 'es');
    expect(answer.content).toContain('Tramo 1 (0–10 usuarios)');
    expect(answer.content).toContain('140,00 €');
    expect(answer.content).toContain('470,00 €');
    expect(answer.actions).toBeTruthy();
    expect(answer.actions?.[0].route).toBe('/simulations');
    expect(answer.sources?.length).toBeGreaterThan(0);
  });

  it('should resolve pricing tiers answer in English when language is en', () => {
    const answer = service.resolveAnswer('How do pricing tiers work?', 'en');
    expect(answer.content).toContain('Tier 1 (0–10 users)');
    expect(answer.content).toContain('€470.00');
    expect(answer.actions?.[0].label).toBe('Open Pricing Simulator');
  });

  it('should resolve pricing tiers answer in German using native German keywords', () => {
    const answer = service.resolveAnswer('Wie funktioniert die Staffelpreis Berechnung und Stufen?', 'de');
    expect(answer.content).toContain('Stufe 1 (0–10 Benutzer)');
    expect(answer.content).toContain('470,00 €');
    expect(answer.actions?.[0].label).toBe('Staffel-Simulator öffnen');
  });

  it('should resolve pricing tiers answer in French using native French keywords', () => {
    const answer = service.resolveAnswer('Comment fonctionne la tarification par paliers ?', 'fr');
    expect(answer.content).toContain('Palier 1 (0–10 utilisateurs)');
    expect(answer.content).toContain('470,00 €');
    expect(answer.actions?.[0].label).toBe('Ouvrir le Simulateur');
  });

  it('should resolve fiscal validation answer in German and French with localized labels', () => {
    const deAnswer = service.resolveAnswer('Wie prüfe ich spanische Steuer und DNI?', 'de');
    expect(deAnswer.content).toContain('Spanien (ES)');
    expect(deAnswer.actions?.[0].label).toBe('Kunden anzeigen');

    const frAnswer = service.resolveAnswer('Comment valider la taxe fiscale et CIF espagnol ?', 'fr');
    expect(frAnswer.content).toContain('Espagne (ES)');
    expect(frAnswer.actions?.[0].label).toBe('Voir les Clients');
  });

  it('should resolve fiscal validation answer with AEAT details and customer link', () => {
    const answer = service.resolveAnswer('¿Cómo valida el CIF y NIF de la AEAT?', 'es');
    expect(answer.content).toContain('DNI');
    expect(answer.content).toContain('módulo 23');
    expect(answer.content).toContain('CIF');
    expect(answer.actions?.[0].route).toBe('/customers');
  });

  it('should resolve specific practical answer for downloading invoice PDF', () => {
    const answer = service.resolveAnswer('donde descargo el pdf de una factura', 'es');
    expect(answer.content).toContain('descargar el PDF oficial de cualquier factura en 2 pasos');
    expect(answer.content).toContain('Descargar PDF');
    expect(answer.actions?.[0].route).toBe('/invoices');
  });

  it('should resolve specific practical answer for cancelling an invoice', () => {
    const answer = service.resolveAnswer('¿Cómo anulo una factura emitida?', 'es');
    expect(answer.content).toContain('Para anular una factura');
    expect(answer.content).toContain('CANCELLED');
    expect(answer.actions?.[0].route).toBe('/invoices');
  });

  it('should resolve general invoice overview for general queries', () => {
    const answer = service.resolveAnswer('¿Cómo es el ciclo de estados de las facturas?', 'es');
    expect(answer.content).toContain('INV-YYYY-XXXX');
    expect(answer.content).toContain('DRAFT');
    expect(answer.actions?.[0].route).toBe('/invoices');
  });

  it('should resolve multi-currency and offline fallback information', () => {
    const answer = service.resolveAnswer('¿Qué divisas soportáis y qué pasa offline?', 'es');
    expect(answer.content).toContain('EUR');
    expect(answer.content).toContain('USD');
    expect(answer.content).toContain('Modo Offline');
  });

  it('should resolve hexagonal architecture details', () => {
    const answer = service.resolveAnswer('Explícame la arquitectura hexagonal y NestJS', 'es');
    expect(answer.content).toContain('Dominio inmaculado');
    expect(answer.content).toContain('modo WAL');
    expect(answer.content).toContain('RFC 7807');
  });

  it('should resolve CI/CD and test coverage details', () => {
    const answer = service.resolveAnswer('¿Cómo es el pipeline de CI/CD y los tests de GitHub Actions?', 'es');
    expect(answer.content).toContain('8 jobs paralelos');
    expect(answer.content).toContain('Oxlint');
  });

  it('should resolve guide and video player details', () => {
    const answer = service.resolveAnswer('¿Dónde veo el vídeo tutorial y la guía paso a paso?', 'es');
    expect(answer.content).toContain('Vídeo Demo');
    expect(answer.actions?.[0].route).toBe('/guide');
  });

  it('should resolve contact and support inquiry details', () => {
    const answer = service.resolveAnswer('Necesito ayuda con el formulario de soporte técnico y contacto', 'es');
    expect(answer.content).toContain('Contacto y Soporte');
    expect(answer.actions?.[0].route).toBe('/contact');
  });

  it('should return fallback content when query has no matching keywords', () => {
    const answer = service.resolveAnswer('algo completamente desconocido y aleatorio xyz123', 'es');
    expect(answer.content).toContain('No he encontrado una coincidencia exacta');
    expect(answer.actions).toBeUndefined();
  });

  it('should return fallback content in other languages', () => {
    const enFallback = service.resolveAnswer('completely unknown string xyz', 'en');
    expect(enFallback.content).toContain("I couldn't find a direct match");

    const deFallback = service.resolveAnswer('unbekannter String xyz', 'de');
    expect(deFallback.content).toContain('Ich habe keine direkte Übereinstimmung');

    const frFallback = service.resolveAnswer('chaine inconnue xyz', 'fr');
    expect(frFallback.content).toContain("Je n'ai pas trouvé de correspondance");
  });

  it('should successfully send a message and add both user message and assistant reply', async () => {
    expect(service.messages().length).toBe(1);

    const sendPromise = service.sendMessage('¿Cómo calculo los tramos?');
    expect(service.isTyping()).toBe(true);
    expect(service.messages().length).toBe(2);
    expect(service.messages()[1].sender).toBe('user');
    expect(service.messages()[1].content).toBe('¿Cómo calculo los tramos?');

    await sendPromise;

    expect(service.isTyping()).toBe(false);
    expect(service.messages().length).toBe(3);
    expect(service.messages()[2].sender).toBe('assistant');
    expect(service.messages()[2].content).toContain('Tramo 1');
  });

  it('should ignore empty or whitespace message', async () => {
    const countBefore = service.messages().length;
    await service.sendMessage('   ');
    expect(service.messages().length).toBe(countBefore);
  });

  it('should handle askQuickPrompt using localized prompt text', async () => {
    const prompt = QUICK_PROMPTS.find((p) => p.id === 'prompt_pricing')!;
    await service.askQuickPrompt(prompt);

    const msgs = service.messages();
    expect(msgs.length).toBe(3);
    expect(msgs[1].content).toContain('tramos');
    expect(msgs[2].content).toContain('Tramo 1');
  });

  it('should reset conversation to a single welcome message without sources clutter', async () => {
    await service.sendMessage('Hola');
    expect(service.messages().length).toBe(3);

    service.resetConversation();
    expect(service.messages().length).toBe(1);
    expect(service.messages()[0].sender).toBe('assistant');
    expect(service.messages()[0].sources).toBeUndefined();
  });

  it('should welcome in German and French when language is set', () => {
    i18nService.setLanguage('de');
    service.resetConversation();
    expect(service.messages()[0].content).toContain('Hallo! 👋');

    i18nService.setLanguage('fr');
    service.resetConversation();
    expect(service.messages()[0].content).toContain('Bonjour ! 👋');

    i18nService.setLanguage('en');
    service.resetConversation();
    expect(service.messages()[0].content).toContain('Hi there! 👋');
  });

  it('should resolve official challenge evaluation criteria', () => {
    const answer = service.resolveAnswer('¿Cuáles son los criterios de evaluación del reto técnico?', 'es');
    expect(answer.content).toContain('Planificación y Diseño (35%)');
    expect(answer.content).toContain('Calidad del Software Entregado (30%)');
    expect(answer.content).toContain('Criterio Técnico y Control de Calidad (25%)');
    expect(answer.content).toContain('README y Despliegue (10%)');
    expect(answer.actions?.[0].route).toBe('/guide');
  });

  it('should resolve challenge purpose and philosophy overview', () => {
    const answer = service.resolveAnswer('¿Qué es SaaS-O-Matic y cuál es el objetivo del reto?', 'es');
    expect(answer.content).toContain('SaaS-O-Matic');
    expect(answer.content).toContain('Spec-Driven Development');
    expect(answer.content).toContain('Vibe Coding');
    expect(answer.actions?.[0].route).toBe('/simulations');
  });

  it('should resolve ai-workspace methodology and structure', () => {
    const answer = service.resolveAnswer('¿Cómo está organizado el espacio de trabajo ai-workspace y la bitácora?', 'es');
    expect(answer.content).toContain('01-specs/');
    expect(answer.content).toContain('02-architecture/');
    expect(answer.content).toContain('03-vibe-coding-log/prompts-and-audits.md');
    expect(answer.actions?.[0].route).toBe('/guide');
  });

  it('should resolve country taxes calculation details', () => {
    const answer = service.resolveAnswer('¿Cómo se calcula el impuesto y el IVA por país?', 'es');
    expect(answer.content).toContain('España (ES)');
    expect(answer.content).toContain('21% IVA');
    expect(answer.content).toContain('Alemania (DE)');
    expect(answer.content).toContain('19% USt');
    expect(answer.content).toContain('Francia (FR)');
    expect(answer.content).toContain('20% TVA');
    expect(answer.content).toContain('Estados Unidos (US)');
    expect(answer.actions?.[0].route).toBe('/simulations');
  });

  it('should resolve local run and Docker deployment instructions', () => {
    const answer = service.resolveAnswer('¿Cómo levantar el backend y frontend en local o con Docker?', 'es');
    expect(answer.content).toContain('docker-compose up -d --build');
    expect(answer.content).toContain('mic-saas-omatic');
    expect(answer.content).toContain('spa-saas-omatic');
    expect(answer.actions?.[0].route).toBe('/guide');
  });

  it('should resolve interactive simulation flow details', () => {
    const answer = service.resolveAnswer('¿Cómo uso el simulador interactivo y los sliders?', 'es');
    expect(answer.content).toContain('Simulador Interactivo');
    expect(answer.content).toContain('POST /simulations');
    expect(answer.actions?.[0].route).toBe('/simulations');
  });
});
