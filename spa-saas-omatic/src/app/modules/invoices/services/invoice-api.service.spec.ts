import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { InvoiceApiService } from './invoice-api.service';
import { Invoice, InvoiceCreate } from '../models/invoice.model';
import { environment } from '../../../../environments/environment';

describe('InvoiceApiService', () => {
  let service: InvoiceApiService;
  let httpMock: HttpTestingController;
  const baseUrl = `${environment.apiBaseUrl}/invoices`;

  const mockInvoice: Invoice = {
    id: 'inv-123',
    invoiceNumber: 'INV-2026-00001',
    customerId: 'cust-456',
    customerCompanyName: 'Acme Corp',
    customerTaxId: 'B12345674',
    customerCountry: 'ES',
    simulationId: 'sim-789',
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
    notes: 'Q1 Billing',
    createdAt: '2026-03-01T10:00:00.000Z',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        InvoiceApiService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(InvoiceApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should search invoices and extract X-Total-Count header', () => {
    service.search({ page: 1, limit: 10, status: 'ISSUED' }).subscribe((response) => {
      expect(response.items).toEqual([mockInvoice]);
      expect(response.total).toBe(1);
    });

    const req = httpMock.expectOne((r) => r.url === baseUrl && r.params.has('page'));
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('page')).toBe('1');
    expect(req.request.params.get('limit')).toBe('10');
    expect(req.request.params.get('status')).toBe('ISSUED');

    req.flush([mockInvoice], {
      headers: { 'x-total-count': '1' },
      status: 200,
      statusText: 'OK',
    });
  });

  it('should get invoice detail by id', () => {
    service.getById('inv-123').subscribe((invoice) => {
      expect(invoice).toEqual(mockInvoice);
    });

    const req = httpMock.expectOne(`${baseUrl}/inv-123`);
    expect(req.request.method).toBe('GET');
    req.flush(mockInvoice);
  });

  it('should create invoice', () => {
    const payload: InvoiceCreate = {
      customerId: 'cust-456',
      concept: 'Cloud Infrastructure Plan',
      subtotal: 100.0,
    };

    service.create(payload).subscribe((invoice) => {
      expect(invoice).toEqual(mockInvoice);
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);
    req.flush(mockInvoice);
  });

  it('should update invoice status', () => {
    const updatedInvoice = { ...mockInvoice, status: 'PAID' as const };

    service.updateStatus('inv-123', 'PAID').subscribe((invoice) => {
      expect(invoice.status).toBe('PAID');
    });

    const req = httpMock.expectOne(`${baseUrl}/inv-123/status`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ status: 'PAID' });
    req.flush(updatedInvoice);
  });

  it('should set error signal on HTTP failure', () => {
    service.getById('not-found').subscribe({
      next: () => fail('Should have failed'),
      error: (err) => {
        expect(err.status).toBe(404);
        expect(service.error()?.status).toBe(404);
      },
    });

    const req = httpMock.expectOne(`${baseUrl}/not-found`);
    req.flush({ title: 'Not Found', status: 404, detail: 'Invoice not found' }, {
      status: 404,
      statusText: 'Not Found',
    });
  });
});
