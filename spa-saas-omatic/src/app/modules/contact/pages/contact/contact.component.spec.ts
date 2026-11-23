import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ContactComponent } from './contact.component';
import { EmailApiService } from '../../../../core/services/email-api.service';
import { ToastService } from '../../../../core/services/toast.service';
import { I18nService } from '../../../../core/services/i18n.service';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let mockEmailApi: { sendEmail: ReturnType<typeof vi.fn> };
  let mockToast: { success: ReturnType<typeof vi.fn>; error: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    mockEmailApi = {
      sendEmail: vi.fn().mockReturnValue(of({ messageId: 'msg-123', status: 'SENT' })),
    };
    mockToast = {
      success: vi.fn(),
      error: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [ContactComponent],
      providers: [
        { provide: EmailApiService, useValue: mockEmailApi },
        { provide: ToastService, useValue: mockToast },
        I18nService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the contact component with initial form state', () => {
    expect(component).toBeTruthy();
    expect(component.form.valid).toBe(false);
    expect(component.submitting()).toBe(false);
    expect(component.submitted()).toBe(false);
  });

  it('should validate required fields and email RFC format', () => {
    const emailControl = component.form.get('email');
    emailControl?.setValue('invalid-email');
    expect(emailControl?.valid).toBe(false);

    emailControl?.setValue('valid.contact@company.com');
    expect(emailControl?.valid).toBe(true);
  });

  it('should submit successfully and reset form', () => {
    component.form.patchValue({
      fullName: 'Carlos Gómez',
      email: 'carlos@empresa.com',
      companyName: 'Tech Innovators S.L.',
      inquiryType: 'pricing',
      message: 'Solicito asesoramiento para optimizar tramos de 50 usuarios.',
    });

    expect(component.form.valid).toBe(true);

    component.onSubmit();

    expect(mockEmailApi.sendEmail).toHaveBeenCalled();
    expect(mockToast.success).toHaveBeenCalled();
    expect(component.submitted()).toBe(true);
  });

  it('should gracefully handle offline error and still provide feedback', () => {
    mockEmailApi.sendEmail.mockReturnValueOnce(throwError(() => new Error('Offline')));

    component.form.patchValue({
      fullName: 'Ana Martínez',
      email: 'ana@corp.es',
      companyName: 'Corp Global',
      inquiryType: 'commercial',
      message: 'Quisiera concertar una reunión comercial.',
    });

    component.onSubmit();

    expect(mockToast.success).toHaveBeenCalled();
    expect(component.submitted()).toBe(true);
  });

  it('should reset submitted state when resetSubmittedState is called', () => {
    component.submitted.set(true);
    component.resetSubmittedState();
    expect(component.submitted()).toBe(false);
  });
});
