import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { GuideComponent } from './guide.component';
import { I18nService } from '../../../../core/services/i18n.service';

describe('GuideComponent', () => {
  let component: GuideComponent;
  let fixture: ComponentFixture<GuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuideComponent],
      providers: [
        provideRouter([]),
        I18nService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GuideComponent);
    component = fixture.componentInstance;
    const i18n = TestBed.inject(I18nService);
    i18n.setLanguage('es');
    fixture.detectChanges();
  });

  it('should create the guide component', () => {
    expect(component).toBeTruthy();
    expect(component.currentSlide()).toBe(0);
    expect(component.totalSlides()).toBe(3);
    expect(component.isFirstSlide()).toBe(true);
    expect(component.isLastSlide()).toBe(false);
  });

  it('should render the hero section and video player', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const titleEl = compiled.querySelector('#guide-title');
    expect(titleEl).toBeTruthy();
    const videoEl = compiled.querySelector('app-video-player');
    expect(videoEl).toBeTruthy();
  });

  it('should navigate through slides with nextSlide, prevSlide, and goToSlide', () => {
    expect(component.currentSlide()).toBe(0);
    expect(component.currentStep().stepNumber).toBe('01');

    component.nextSlide();
    expect(component.currentSlide()).toBe(1);
    expect(component.currentStep().stepNumber).toBe('02');
    expect(component.isFirstSlide()).toBe(false);

    component.nextSlide();
    expect(component.currentSlide()).toBe(2);
    expect(component.isLastSlide()).toBe(true);

    // Looping on last slide
    component.nextSlide();
    expect(component.currentSlide()).toBe(0);

    // Direct jump
    component.goToSlide(2);
    expect(component.currentSlide()).toBe(2);

    // Previous slide
    component.prevSlide();
    expect(component.currentSlide()).toBe(1);
  });

  it('should render the big slide card with benefits checklist', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const slideCard = compiled.querySelector('.slide-card-hero');
    expect(slideCard).toBeTruthy();

    const stepNumber = compiled.querySelector('.slide-step-number');
    expect(stepNumber?.textContent?.trim()).toBe('01');

    const benefits = compiled.querySelectorAll('.benefit-item');
    expect(benefits.length).toBe(2);
  });

  it('should render 6 feature matrix cards and 3 faqs', () => {
    expect(component.features.length).toBe(6);
    expect(component.faqs.length).toBe(3);
    const compiled = fixture.nativeElement as HTMLElement;
    const featCards = compiled.querySelectorAll('.feature-card');
    expect(featCards.length).toBe(6);
    const faqCards = compiled.querySelectorAll('.faq-card');
    expect(faqCards.length).toBe(3);
  });
});
