import { InvoiceTypeOrmEntity } from './invoice.typeorm-entity';
import { InvoiceStatus } from '../../../domain/enums/invoice-status.enum';

describe('InvoiceTypeOrmEntity', () => {
  it('should instantiate an InvoiceTypeOrmEntity with valid properties', () => {
    const entity = new InvoiceTypeOrmEntity();
    entity.id = 'inv-uuid-1';
    entity.invoiceNumber = 'INV-2026-0001';
    entity.customerId = 'cust-1';
    entity.customerCompanyName = 'Omatic Telecom S.L.';
    entity.customerTaxId = 'B12345674';
    entity.customerCountry = 'ES';
    entity.concept = 'SaaS Subscription';
    entity.subtotal = 100.00;
    entity.taxRate = 0.21;
    entity.taxAmount = 21.00;
    entity.totalAmount = 121.00;
    entity.currency = 'EUR';
    entity.status = InvoiceStatus.ISSUED;
    entity.issueDate = new Date();
    entity.dueDate = new Date();
    entity.paidAt = null;
    entity.notes = null;
    entity.createdAt = new Date();
    entity.updatedAt = new Date();

    expect(entity.id).toBe('inv-uuid-1');
    expect(entity.invoiceNumber).toBe('INV-2026-0001');
    expect(entity.totalAmount).toBe(121.00);
  });
});
