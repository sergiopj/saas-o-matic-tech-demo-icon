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
    fixture.detectChanges();
  });

  it('should create the guide component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the hero section with illustration and title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const titleEl = compiled.querySelector('#guide-title');
    expect(titleEl).toBeTruthy();
    const heroImg = compiled.querySelector('.hero-illustration');
    expect(heroImg).toBeTruthy();
  });

  it('should contain 3 commercial workflow steps', () => {
    expect(component.steps.length).toBe(3);
    const compiled = fixture.nativeElement as HTMLElement;
    const stepCards = compiled.querySelectorAll('.step-card');
    expect(stepCards.length).toBe(3);
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
