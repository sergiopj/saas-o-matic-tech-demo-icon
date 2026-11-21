import { Invoice } from './invoice.entity';
import { InvoiceStatus } from '../enums/invoice-status.enum';
import { DomainError } from '../../../../shared/domain/domain.exception';

describe('Invoice (Domain Entity)', () => {
  const validPayload = {
    customerId: 'cust-100',
    customerCompanyName: 'Omatic Corp',
    customerTaxId: 'B12345674',
    customerCountry: 'ES',
    concept: 'SaaS-O-Matic Tiered Subscription (50 users)',
    subtotal: 420.00,
    taxRate: 0.21,
  };

  it('should successfully create an invoice with calculated taxes and Net 30 due date', () => {
    const invoice = Invoice.create(validPayload);

    expect(invoice.getId()).toBeDefined();
    expect(invoice.getInvoiceNumber()).toMatch(/^INV-\d{4}-\d{4}$/);
    expect(invoice.getCustomerId()).toBe('cust-100');
    expect(invoice.getCustomerCompanyName()).toBe('Omatic Corp');
    expect(invoice.getSubtotal()).toBe(420.00);
    expect(invoice.getTaxRate()).toBe(0.21);
    expect(invoice.getTaxAmount()).toBe(88.20);
    expect(invoice.getTotalAmount()).toBe(508.20);
    expect(invoice.getCurrency()).toBe('EUR');
    expect(invoice.getStatus()).toBe(InvoiceStatus.ISSUED);
    expect(invoice.getPaidAt()).toBeNull();
  });

  it('should reject invalid concept with less than 3 characters', () => {
    expect(() =>
      Invoice.create({ ...validPayload, concept: 'ab' })
    ).toThrow(DomainError);
  });

  it('should reject negative subtotal', () => {
    expect(() =>
      Invoice.create({ ...validPayload, subtotal: -50 })
    ).toThrow(DomainError);
  });

  it('should mark invoice as paid', () => {
    const invoice = Invoice.create(validPayload);
    const payDate = new Date('2026-10-15T12:00:00Z');

    invoice.markAsPaid(payDate);

    expect(invoice.getStatus()).toBe(InvoiceStatus.PAID);
    expect(invoice.getPaidAt()).toEqual(payDate);
  });

  it('should prevent marking cancelled invoice as paid', () => {
    const invoice = Invoice.create(validPayload);
    invoice.cancel();

    expect(() => invoice.markAsPaid()).toThrow(DomainError);
  });

  it('should cancel an issued invoice', () => {
    const invoice = Invoice.create(validPayload);
    invoice.cancel();

    expect(invoice.getStatus()).toBe(InvoiceStatus.CANCELLED);
  });

  it('should prevent cancelling an already paid invoice', () => {
    const invoice = Invoice.create(validPayload);
    invoice.markAsPaid();

    expect(() => invoice.cancel()).toThrow(DomainError);
  });
});
