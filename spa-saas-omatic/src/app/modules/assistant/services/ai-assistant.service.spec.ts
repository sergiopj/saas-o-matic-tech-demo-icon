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
    expect(service.messages()[0].content).toContain('Asistente IA de SaaS-O-Matic');
    expect(service.isTyping()).toBe(false);
  });

  it('should have predefined quick prompts', () => {
    expect(service.quickPrompts().length).toBe(QUICK_PROMPTS.length);
    expect(service.quickPrompts()[0].id).toBe('prompt_pricing');
  });

  it('should resolve pricing tiers answer with action and calculation details in Spanish', () => {
    const answer = service.resolveAnswer('¿Cómo se calculan los precios por tramos?', 'es');
    expect(answer.content).toContain('Tramo 1 (0–10 usuarios)');
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
    expect(answer.content).toContain('TRWAGMYFPDXBNJZSQVHLCKE');
    expect(answer.content).toContain('CIF');
    expect(answer.actions?.[0].route).toBe('/customers');
  });

  it('should resolve invoice lifecycle and PDF generation details', () => {
    const answer = service.resolveAnswer('¿Cómo descargo la factura en PDF o cómo la anulo?', 'es');
    expect(answer.content).toContain('INV-YYYY-XXXX');
    expect(answer.content).toContain('ConfirmDialogComponent');
    expect(answer.actions?.[0].route).toBe('/invoices');
  });

  it('should resolve multi-currency and offline fallback information', () => {
    const answer = service.resolveAnswer('¿Qué divisas soportáis y qué pasa offline?', 'es');
    expect(answer.content).toContain('EUR');
    expect(answer.content).toContain('USD');
    expect(answer.content).toContain('Resiliencia Offline');
  });

  it('should resolve hexagonal architecture details', () => {
    const answer = service.resolveAnswer('Explícame la arquitectura hexagonal y NestJS', 'es');
    expect(answer.content).toContain('Dominio Puro');
    expect(answer.content).toContain('SQLite WAL Mode');
    expect(answer.content).toContain('RFC 7807');
  });

  it('should resolve CI/CD and test coverage details', () => {
    const answer = service.resolveAnswer('¿Cómo es el pipeline de CI/CD y los tests de GitHub Actions?', 'es');
    expect(answer.content).toContain('8 Jobs Paralelos');
    expect(answer.content).toContain('Oxlint');
  });

  it('should resolve guide and video player details', () => {
    const answer = service.resolveAnswer('¿Dónde veo el vídeo tutorial y la guía paso a paso?', 'es');
    expect(answer.content).toContain('Vídeo Demo');
    expect(answer.actions?.[0].route).toBe('/guide');
  });

  it('should resolve contact and support inquiry details', () => {
    const answer = service.resolveAnswer('Necesito ayuda con el formulario de soporte técnico y contacto', 'es');
    expect(answer.content).toContain('Formulario Especializado');
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
    const prompt = QUICK_PROMPTS[0]; // prompt_pricing
    await service.askQuickPrompt(prompt);

    const msgs = service.messages();
    expect(msgs.length).toBe(3);
    expect(msgs[1].content).toContain('tramos');
    expect(msgs[2].content).toContain('Tramo 1');
  });

  it('should reset conversation to a single welcome message', async () => {
    await service.sendMessage('Hola');
    expect(service.messages().length).toBe(3);

    service.resetConversation();
    expect(service.messages().length).toBe(1);
    expect(service.messages()[0].sender).toBe('assistant');
  });

  it('should welcome in German and French when language is set', () => {
    i18nService.setLanguage('de');
    service.resetConversation();
    expect(service.messages()[0].content).toContain('Hallo! Ich bin der');

    i18nService.setLanguage('fr');
    service.resetConversation();
    expect(service.messages()[0].content).toContain('Bonjour ! Je suis');

    i18nService.setLanguage('en');
    service.resetConversation();
    expect(service.messages()[0].content).toContain('Hello! I am');
  });
});
