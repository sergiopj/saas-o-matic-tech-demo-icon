import { PdfkitInvoicePdfGeneratorAdapter } from './pdfkit-invoice-pdf-generator.adapter';
import { Invoice } from '../../../../domain/entities/invoice.entity';
import { InvoiceStatus } from '../../../../domain/enums/invoice-status.enum';

describe('PdfkitInvoicePdfGeneratorAdapter', () => {
  let adapter: PdfkitInvoicePdfGeneratorAdapter;

  beforeEach(() => {
    adapter = new PdfkitInvoicePdfGeneratorAdapter();
  });

  it('should generate a valid PDF buffer starting with %PDF-', async () => {
    const invoice = Invoice.create({
      id: 'inv-123',
      invoiceNumber: 'INV-2026-00042',
      customerId: 'cust-123',
      customerCompanyName: 'Inditex S.A.',
      customerTaxId: 'A-15075062',
      customerCountry: 'ES',
      concept: 'SaaS Enterprise Subscription 500 users',
      subtotal: 1500.0,
      taxRate: 0.21,
      notes: 'Quarterly billing schedule',
    });

    const customer = {
      companyName: 'Inditex S.A.',
      taxId: 'A-15075062',
      email: 'billing@inditex.com',
      country: 'ES',
    };

    const buffer = await adapter.generate(invoice, customer);

    expect(Buffer.isBuffer(buffer)).toBe(true);
    expect(buffer.length).toBeGreaterThan(500);
    // Standard PDF files always start with %PDF-
    const header = buffer.subarray(0, 5).toString('utf-8');
    expect(header).toBe('%PDF-');
  });

  it('should generate PDF correctly for paid invoice without customer details or notes', async () => {
    const invoice = Invoice.reconstitute({
      id: 'inv-999',
      invoiceNumber: 'INV-2026-00099',
      customerId: 'cust-999',
      customerCompanyName: 'Berlin Cloud GmbH',
      customerTaxId: 'DE999888777',
      customerCountry: 'DE',
      simulationId: null,
      concept: 'Consulting Retainer',
      subtotal: 800.0,
      taxRate: 0.19,
      taxAmount: 152.0,
      totalAmount: 952.0,
      currency: 'EUR',
      status: InvoiceStatus.PAID,
      issueDate: new Date('2026-01-15'),
      dueDate: new Date('2026-02-15'),
      paidAt: new Date('2026-01-20'),
      notes: null,
      createdAt: new Date('2026-01-15'),
      updatedAt: new Date('2026-01-20'),
    });

    const buffer = await adapter.generate(invoice);

    expect(Buffer.isBuffer(buffer)).toBe(true);
    expect(buffer.length).toBeGreaterThan(500);
    const header = buffer.subarray(0, 5).toString('utf-8');
    expect(header).toBe('%PDF-');
  });

  it('should generate PDF correctly for cancelled invoice', async () => {
    const invoice = Invoice.reconstitute({
      id: 'inv-can',
      invoiceNumber: 'INV-2026-00000',
      customerId: 'cust-can',
      customerCompanyName: 'Cancelled S.L.',
      customerTaxId: 'B-00000000',
      customerCountry: 'ES',
      simulationId: null,
      concept: 'Cancelled Service',
      subtotal: 200.0,
      taxRate: 0.21,
      taxAmount: 42.0,
      totalAmount: 242.0,
      currency: 'EUR',
      status: InvoiceStatus.CANCELLED,
      issueDate: new Date('2026-02-01'),
      dueDate: new Date('2026-03-01'),
      paidAt: null,
      notes: 'Invoice voided per customer request',
      createdAt: new Date('2026-02-01'),
      updatedAt: new Date('2026-02-02'),
    });

    const buffer = await adapter.generate(invoice);

    expect(Buffer.isBuffer(buffer)).toBe(true);
    const header = buffer.subarray(0, 5).toString('utf-8');
    expect(header).toBe('%PDF-');
  });
});
