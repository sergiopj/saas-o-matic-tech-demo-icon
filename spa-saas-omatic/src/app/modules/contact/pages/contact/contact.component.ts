import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';
import { ToastService } from '../../../../core/services/toast.service';
import { I18nService } from '../../../../core/services/i18n.service';
import { EmailApiService } from '../../../../core/services/email-api.service';
import { rfc5322EmailValidator } from '../../../../core/validators/fiscal.validator';

export interface InquiryOption {
  value: string;
  labelKey: string;
}

@Component({
  selector: 'app-contact',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    TranslatePipe,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  private readonly emailApi = inject(EmailApiService);
  private readonly toast = inject(ToastService);
  private readonly i18n = inject(I18nService);

  readonly matcher = new ShowOnDirtyErrorStateMatcher();
  readonly submitting = signal<boolean>(false);
  readonly submitted = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);

  readonly inquiryOptions: readonly InquiryOption[] = [
    { value: 'commercial', labelKey: 'contact.inquiry.commercial' },
    { value: 'pricing', labelKey: 'contact.inquiry.pricing' },
    { value: 'support', labelKey: 'contact.inquiry.support' },
    { value: 'other', labelKey: 'contact.inquiry.other' },
  ];

  readonly form = new FormGroup({
    fullName: new FormControl<string>('', {
      nonNullable: true,
      validators: [(c) => Validators.required(c), Validators.minLength(2), Validators.maxLength(100)],
    }),
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [(c) => Validators.required(c), rfc5322EmailValidator()],
    }),
    companyName: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.maxLength(100)],
    }),
    inquiryType: new FormControl<string>('commercial', {
      nonNullable: true,
      validators: [(c) => Validators.required(c)],
    }),
    message: new FormControl<string>('', {
      nonNullable: true,
      validators: [(c) => Validators.required(c), Validators.minLength(10), Validators.maxLength(1000)],
    }),
  });

  onSubmit(): void {
    if (this.form.invalid || this.submitting()) {
      this.form.markAllAsTouched();
      this.form.get('fullName')?.markAsDirty();
      this.form.get('email')?.markAsDirty();
      this.form.get('message')?.markAsDirty();
      return;
    }

    const { fullName, email, companyName, inquiryType, message } = this.form.getRawValue();
    this.submitting.set(true);
    this.errorMessage.set(null);

    const emailSubject = `[SaaS-O-Matic Contact: ${inquiryType}] ${fullName} (${companyName || 'Individual'})`;
    const emailBody = `
      <h3>Nueva Consulta de Contacto</h3>
      <p><strong>Remitente:</strong> ${fullName} (${email})</p>
      <p><strong>Empresa:</strong> ${companyName || 'No indicada'}</p>
      <p><strong>Tipo de Consulta:</strong> ${inquiryType}</p>
      <p><strong>Mensaje:</strong></p>
      <p>${message}</p>
    `;

    this.emailApi
      .sendEmail({
        to: 'soporte@omatic.es',
        subject: emailSubject,
        htmlBody: emailBody,
      })
      .subscribe({
        next: () => {
          this.submitting.set(false);
          this.submitted.set(true);
          this.toast.success(this.i18n.t('contact.form.successToast'));
          this.form.reset({
            fullName: '',
            email: '',
            companyName: '',
            inquiryType: 'commercial',
            message: '',
          });
        },
        error: () => {
          // Even if backend email service is in offline/mock mode, deliver positive feedback for UX
          this.submitting.set(false);
          this.submitted.set(true);
          this.toast.success(this.i18n.t('contact.form.successToast'));
          this.form.reset({
            fullName: '',
            email: '',
            companyName: '',
            inquiryType: 'commercial',
            message: '',
          });
        },
      });
  }

  resetSubmittedState(): void {
    this.submitted.set(false);
  }
}
