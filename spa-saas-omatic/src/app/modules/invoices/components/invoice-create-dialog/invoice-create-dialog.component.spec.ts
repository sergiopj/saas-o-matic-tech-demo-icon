import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';
import {
  InvoiceCreateDialogComponent,
  resolveCountryTaxRate,
} from './invoice-create-dialog.component';
import { InvoiceApiService } from '../../services/invoice-api.service';
import { CustomerApiService } from '../../../customers/services/customer-api.service';
import { ToastService } from '../../../../core/services/toast.service';
import { I18nService } from '../../../../core/services/i18n.service';
import { Customer } from '../../../customers/models/customer.model';
import { Invoice } from '../../models/invoice.model';
import { ProblemDetail } from '../../../../core/errors/problem-detail.model';

describe('InvoiceCreateDialogComponent', () => {
  let component: InvoiceCreateDialogComponent;
  let fixture: ComponentFixture<InvoiceCreateDialogComponent>;
  let mockDialogRef: { close: ReturnType<typeof vi.fn> };
  let mockInvoiceApi: { create: ReturnType<typeof vi.fn> };
  let mockCustomerApi: { search: ReturnType<typeof vi.fn> };
  let mockToast: { success: ReturnType<typeof vi.fn>; error: ReturnType<typeof vi.fn> };

  const sampleCustomer: Customer = {
    id: 'cust-uuid-1',
    companyName: 'Acme Solutions S.L.',
    taxId: 'B12345674',
    country: 'ES',
    email: 'billing@acme.es',
    selectedPlan: 'Growth Pro',
    createdAt: '2026-11-17T12:00:00Z',
  };

  const sampleGermanCustomer: Customer = {
    id: 'cust-uuid-de',
    companyName: 'Berlin Cloud GmbH',
    taxId: 'DE999888777',
    country: 'DE',
    email: 'billing@berlincloud.de',
    selectedPlan: 'Enterprise Scale',
    createdAt: '2026-11-18T12:00:00Z',
  };

  const sampleInvoice: Invoice = {
    id: 'inv-uuid-1',
    invoiceNumber: 'INV-2026-0001',
    customerId: 'cust-uuid-1',
    customerCompanyName: 'Acme Solutions S.L.',
    customerTaxId: 'B12345674',
    customerCountry: 'ES',
    simulationId: 'sim-1',
    concept: 'SaaS Enterprise Scale Subscription',
    subtotal: 1000,
    taxRate: 0.21,
    taxAmount: 210,
    totalAmount: 1210,
    currency: 'EUR',
    status: 'ISSUED',
    issueDate: '2026-11-20T10:00:00Z',
    dueDate: '2026-12-20T10:00:00Z',
    paidAt: null,
    notes: 'Test note',
    createdAt: '2026-11-20T10:00:00Z',
  };

  beforeEach(async () => {
    mockDialogRef = {
      close: vi.fn(),
    };

    mockInvoiceApi = {
      create: vi.fn().mockReturnValue(of(sampleInvoice)),
    };

    mockCustomerApi = {
      search: vi.fn().mockReturnValue(of({ items: [sampleCustomer, sampleGermanCustomer], total: 2 })),
    };

    mockToast = {
      success: vi.fn(),
      error: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [InvoiceCreateDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: null },
        { provide: InvoiceApiService, useValue: mockInvoiceApi },
        { provide: CustomerApiService, useValue: mockCustomerApi },
        { provide: ToastService, useValue: mockToast },
        I18nService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InvoiceCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component and fetch available customers', () => {
    expect(component).toBeTruthy();
    expect(mockCustomerApi.search).toHaveBeenCalled();
    expect(component.customers().length).toBe(2);
  });

  it('should resolve correct tax rate based on country jurisdiction', () => {
    expect(resolveCountryTaxRate('ES')).toBe(0.21);
    expect(resolveCountryTaxRate('DE')).toBe(0.19);
    expect(resolveCountryTaxRate('FR')).toBe(0.20);
    expect(resolveCountryTaxRate('US')).toBe(0.00);
    expect(resolveCountryTaxRate('UNKNOWN')).toBe(0.21);
  });

  it('should recalculate tax amount and total when customer and subtotal change', () => {
    component.form.patchValue({
      customerId: sampleCustomer.id,
      subtotal: 1000,
    });
    fixture.detectChanges();

    expect(component.taxRate()).toBe(0.21);
    expect(component.taxAmount()).toBe(210);
    expect(component.totalAmount()).toBe(1210);

    // Switch to German customer
    component.form.patchValue({
      customerId: sampleGermanCustomer.id,
    });
    fixture.detectChanges();

    expect(component.taxRate()).toBe(0.19);
    expect(component.taxAmount()).toBe(190);
    expect(component.totalAmount()).toBe(1190);
  });

  it('should require customerId, concept, and subtotal > 0', () => {
    component.form.patchValue({
      customerId: '',
      concept: '',
      subtotal: 0,
    });
    expect(component.form.valid).toBe(false);

    component.form.patchValue({
      customerId: sampleCustomer.id,
      concept: 'Monthly Platform Fee',
      subtotal: 500,
    });
    expect(component.form.valid).toBe(true);
  });

  it('should submit successfully and close dialog with created invoice', () => {
    component.form.patchValue({
      customerId: sampleCustomer.id,
      concept: 'Monthly Platform Fee',
      subtotal: 1000,
      notes: 'Test note',
    });

    component.onSubmit();

    expect(mockInvoiceApi.create).toHaveBeenCalledWith(
      expect.objectContaining({
        customerId: sampleCustomer.id,
        concept: 'Monthly Platform Fee',
        subtotal: 1000,
        taxRate: 0.21,
      }),
    );
    expect(mockToast.success).toHaveBeenCalled();
    expect(mockDialogRef.close).toHaveBeenCalledWith(sampleInvoice);
  });

  it('should handle API error during creation and show alert message', () => {
    const errorProblem: ProblemDetail = {
      type: 'about:blank',
      title: 'Bad Request',
      status: 400,
      detail: 'Invalid invoice data',
      instance: '/invoices',
      timestamp: new Date().toISOString(),
    };
    mockInvoiceApi.create.mockReturnValueOnce(throwError(() => errorProblem));

    component.form.patchValue({
      customerId: sampleCustomer.id,
      concept: 'Monthly Platform Fee',
      subtotal: 1000,
    });

    component.onSubmit();

    expect(component.errorMessage()).toBe('Invalid invoice data');
    expect(mockDialogRef.close).not.toHaveBeenCalled();
  });

  it('should close dialog when onCancel is invoked', () => {
    component.onCancel();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should auto-suggest default concept when customer is selected and concept is empty', () => {
    component.form.patchValue({ concept: '' });
    component.form.get('customerId')?.setValue(sampleCustomer.id);
    expect(component.form.get('concept')?.value).toContain(sampleCustomer.companyName);
  });

  it('should mark fields as dirty and touched when submitting invalid form', () => {
    component.form.patchValue({ customerId: '', concept: '', subtotal: 0 });
    component.onSubmit();
    expect(component.form.get('concept')?.dirty).toBe(true);
    expect(mockInvoiceApi.create).not.toHaveBeenCalled();
  });
});
