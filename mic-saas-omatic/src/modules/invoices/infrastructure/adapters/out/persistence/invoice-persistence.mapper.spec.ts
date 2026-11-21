import { InvoicePersistenceMapper } from './invoice-persistence.mapper';
import { Invoice } from '../../../domain/entities/invoice.entity';
import { InvoiceTypeOrmEntity } from './invoice.typeorm-entity';
import { InvoiceStatus } from '../../../domain/enums/invoice-status.enum';

describe('InvoicePersistenceMapper', () => {
  it('should map between domain Invoice and TypeORM entity bidirectionally', () => {
    const domainInvoice = Invoice.create({
      customerId: 'cust-1',
      customerCompanyName: 'Omatic Telecom S.L.',
      customerTaxId: 'B12345674',
      customerCountry: 'ES',
      concept: 'Monthly Subscription',
      subtotal: 500,
      taxRate: 0.21,
    });

    const persistenceEntity = InvoicePersistenceMapper.toPersistence(domainInvoice);
    expect(persistenceEntity.id).toBe(domainInvoice.getId());
    expect(persistenceEntity.subtotal).toBe(500);

    const mappedBack = InvoicePersistenceMapper.toDomain(persistenceEntity);
    expect(mappedBack.getId()).toBe(domainInvoice.getId());
    expect(mappedBack.getSubtotal()).toBe(500);
    expect(mappedBack.getStatus()).toBe(InvoiceStatus.ISSUED);
  });
});
