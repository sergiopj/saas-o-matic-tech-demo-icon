import { Component, OnInit, computed, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';
import { InvoiceApiService } from '../../services/invoice-api.service';
import { CustomerApiService } from '../../../customers/services/customer-api.service';
import { ToastService } from '../../../../core/services/toast.service';
import { I18nService } from '../../../../core/services/i18n.service';
import { Customer } from '../../../customers/models/customer.model';
import { Invoice } from '../../models/invoice.model';
import { ProblemDetail } from '../../../../core/errors/problem-detail.model';

export interface InvoiceCreateDialogData {
  customerId?: string;
  simulationId?: string;
  concept?: string;
  subtotal?: number;
}

export function resolveCountryTaxRate(country?: string): number {
  switch (country?.toUpperCase()) {
    case 'ES': return 0.21;
    case 'DE': return 0.19;
    case 'FR': return 0.20;
    case 'IT': return 0.22;
    case 'PT': return 0.23;
    case 'GB': return 0.20;
    case 'CH': return 0.081;
    case 'US': return 0.00;
    default: return 0.21;
  }
}

@Component({
  selector: 'app-invoice-create-dialog',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    TranslatePipe,
  ],
  templateUrl: './invoice-create-dialog.component.html',
  styleUrl: './invoice-create-dialog.component.scss',
})
export class InvoiceCreateDialogComponent implements OnInit {
  private readonly dialogRef = inject(MatDialogRef<InvoiceCreateDialogComponent>);
  readonly data = inject<InvoiceCreateDialogData | null>(MAT_DIALOG_DATA, { optional: true });
  private readonly invoiceApi = inject(InvoiceApiService);
  private readonly customerApi = inject(CustomerApiService);
  private readonly toast = inject(ToastService);
  private readonly i18n = inject(I18nService);

  readonly matcher = new ShowOnDirtyErrorStateMatcher();
  readonly customers = signal<Customer[]>([]);
  readonly loadingCustomers = signal<boolean>(false);
  readonly submitting = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);

  readonly selectedCustomerId = signal<string>(this.data?.customerId ?? '');
  readonly currentSubtotal = signal<number>(this.data?.subtotal ?? 0);

  readonly form = new FormGroup({
    customerId: new FormControl<string>(this.data?.customerId ?? '', {
      nonNullable: true,
      validators: [(c) => Validators.required(c)],
    }),
    concept: new FormControl<string>(this.data?.concept ?? '', {
      nonNullable: true,
      validators: [(c) => Validators.required(c), Validators.minLength(3), Validators.maxLength(200)],
    }),
    subtotal: new FormControl<number>(this.data?.subtotal ?? 0, {
      nonNullable: true,
      validators: [(c) => Validators.required(c), Validators.min(0.01)],
    }),
    notes: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.maxLength(500)],
    }),
  });

  readonly selectedCustomer = computed(() => {
    const id = this.selectedCustomerId();
    return this.customers().find((c) => c.id === id) ?? null;
  });

  readonly taxRate = computed(() => {
    const cust = this.selectedCustomer();
    return resolveCountryTaxRate(cust?.country);
  });

  readonly taxAmount = computed(() => {
    const sub = this.currentSubtotal();
    const rate = this.taxRate();
    return Math.round(sub * rate * 100) / 100;
  });

  readonly totalAmount = computed(() => {
    return Math.round((this.currentSubtotal() + this.taxAmount()) * 100) / 100;
  });

  ngOnInit(): void {
    this.loadCustomers();

    this.form.get('customerId')?.valueChanges.subscribe((val) => {
      this.selectedCustomerId.set(val ?? '');
    });

    this.form.get('subtotal')?.valueChanges.subscribe((val) => {
      this.currentSubtotal.set(typeof val === 'number' && !Number.isNaN(val) ? val : 0);
    });
  }

  loadCustomers(): void {
    this.loadingCustomers.set(true);
    this.customerApi.search(undefined, undefined, 1, 100, 'companyName', 'ASC').subscribe({
      next: (res) => {
        this.customers.set(res.items);
        this.loadingCustomers.set(false);
      },
      error: () => {
        this.loadingCustomers.set(false);
      },
    });
  }

  onSubmit(): void {
    if (this.form.invalid || this.submitting()) {
      this.form.markAllAsTouched();
      return;
    }

    const { customerId, concept, subtotal, notes } = this.form.getRawValue();
    this.submitting.set(true);
    this.errorMessage.set(null);

    this.invoiceApi
      .create({
        customerId,
        simulationId: this.data?.simulationId,
        concept,
        subtotal,
        taxRate: this.taxRate(),
        currency: 'EUR',
        notes: notes ? notes.trim() : undefined,
      })
      .subscribe({
        next: (created: Invoice) => {
          this.submitting.set(false);
          this.toast.success(this.i18n.t('invoices.create.success'));
          this.dialogRef.close(created);
        },
        error: (err: ProblemDetail) => {
          this.submitting.set(false);
          this.errorMessage.set(err?.detail || this.i18n.t('error.communication.detail'));
        },
      });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
