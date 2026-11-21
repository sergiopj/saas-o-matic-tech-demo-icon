import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { InvoiceListComponent } from './invoice-list.component';
import { InvoiceApiService } from '../../services/invoice-api.service';
import { ToastService } from '../../../../core/services/toast.service';
import { I18nService } from '../../../../core/services/i18n.service';
import { Invoice } from '../../models/invoice.model';

describe('InvoiceListComponent', () => {
  let component: InvoiceListComponent;
  let fixture: ComponentFixture<InvoiceListComponent>;
  let invoiceApi: jasmine.SpyObj<InvoiceApiService> | any;
  let toastService: jasmine.SpyObj<ToastService> | any;

  const mockInvoices: Invoice[] = [
    {
      id: 'inv-1',
      invoiceNumber: 'INV-2026-00001',
      customerId: 'cust-1',
      customerCompanyName: 'Acme Corp',
      customerTaxId: 'B12345674',
      customerCountry: 'ES',
      simulationId: 'sim-1',
      concept: 'Cloud Infrastructure Plan',
      subtotal: 100.0,
      taxRate: 0.21,
      taxAmount: 21.0,
      totalAmount: 121.0,
      currency: 'EUR',
      status: 'ISSUED',
      issueDate: '2026-03-01T10:00:00.000Z',
      dueDate: '2026-03-31T10:00:00.000Z',
      paidAt: null,
      notes: 'Initial invoice',
      createdAt: '2026-03-01T10:00:00.000Z',
    },
    {
      id: 'inv-2',
      invoiceNumber: 'INV-2026-00002',
      customerId: 'cust-2',
      customerCompanyName: 'Globex Ltd',
      customerTaxId: 'DE999888777',
      customerCountry: 'DE',
      simulationId: null,
      concept: 'Enterprise License',
      subtotal: 200.0,
      taxRate: 0.19,
      taxAmount: 38.0,
      totalAmount: 238.0,
      currency: 'EUR',
      status: 'PAID',
      issueDate: '2026-02-15T10:00:00.000Z',
      dueDate: '2026-03-15T10:00:00.000Z',
      paidAt: '2026-02-20T12:00:00.000Z',
      notes: null,
      createdAt: '2026-02-15T10:00:00.000Z',
    },
  ];

  beforeEach(async () => {
    invoiceApi = {
      search: vi.fn().mockReturnValue(of({ items: mockInvoices, total: 2 })),
      updateStatus: vi.fn().mockReturnValue(of({ ...mockInvoices[0], status: 'PAID' })),
      loading: () => false,
    };

    toastService = {
      success: vi.fn(),
      error: vi.fn(),
      show: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [InvoiceListComponent],
      providers: [
        { provide: InvoiceApiService, useValue: invoiceApi },
        { provide: ToastService, useValue: toastService },
        provideHttpClient(),
        provideHttpClientTesting(),
        I18nService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InvoiceListComponent);
    component = fixture.componentInstance;
    const i18n = TestBed.inject(I18nService);
    i18n.setLanguage('es');
    fixture.detectChanges();
  });

  it('should create the component and load invoices on init', () => {
    expect(component).toBeTruthy();
    expect(invoiceApi.search).toHaveBeenCalled();
    expect(component.invoices().length).toBe(2);
    expect(component.totalInvoices()).toBe(2);
  });

  it('should compute KPI totals accurately', () => {
    expect(component.totalInvoiced()).toBe(359.0);
    expect(component.pendingAmount()).toBe(121.0);
    expect(component.paidAmount()).toBe(238.0);
  });

  it('should filter invoices by status and reset page to 1', () => {
    component.currentPage.set(3);
    component.filterByStatus('PAID');

    expect(component.selectedStatus()).toBe('PAID');
    expect(component.currentPage()).toBe(1);
    expect(invoiceApi.search).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'PAID', page: 1 }),
    );
  });

  it('should open and close the slide-over drawer with selected invoice', () => {
    expect(component.isDrawerOpen()).toBe(false);
    expect(component.selectedInvoice()).toBeNull();

    component.openDrawer(mockInvoices[0]);
    expect(component.isDrawerOpen()).toBe(true);
    expect(component.selectedInvoice()).toEqual(mockInvoices[0]);

    component.closeDrawer();
    expect(component.isDrawerOpen()).toBe(false);
    expect(component.selectedInvoice()).toBeNull();
  });

  it('should mark an invoice as paid and notify via toast', () => {
    component.markAsPaid(mockInvoices[0]);

    expect(invoiceApi.updateStatus).toHaveBeenCalledWith('inv-1', 'PAID');
    expect(toastService.success).toHaveBeenCalled();
    const updated = component.invoices().find((inv) => inv.id === 'inv-1');
    expect(updated?.status).toBe('PAID');
  });
});
