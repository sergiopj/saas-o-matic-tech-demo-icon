import { Repository } from 'typeorm';
import { InvoicePersistenceAdapter } from './invoice-persistence.adapter';
import { InvoiceTypeOrmEntity } from './invoice.typeorm-entity';
import { Invoice } from '../../../../domain/entities/invoice.entity';
import { InvoiceStatus } from '../../../../domain/enums/invoice-status.enum';

describe('InvoicePersistenceAdapter', () => {
  let adapter: InvoicePersistenceAdapter;
  let mockRepository: jest.Mocked<Partial<Repository<InvoiceTypeOrmEntity>>>;

  const sampleDomain = Invoice.create({
    customerId: 'cust-100',
    customerCompanyName: 'Omatic Telecom S.L.',
    customerTaxId: 'B12345674',
    customerCountry: 'ES',
    concept: 'Monthly Subscription',
    subtotal: 500,
  });

  beforeEach(() => {
    mockRepository = {
      save: jest.fn(),
      findOne: jest.fn(),
      find: jest.fn(),
      createQueryBuilder: jest.fn(),
    };
    adapter = new InvoicePersistenceAdapter(
      mockRepository as Repository<InvoiceTypeOrmEntity>,
    );
  });

  it('should save and return domain Invoice', async () => {
    const savedEntity = new InvoiceTypeOrmEntity();
    Object.assign(savedEntity, {
      id: sampleDomain.getId(),
      invoiceNumber: sampleDomain.getInvoiceNumber(),
      customerId: sampleDomain.getCustomerId(),
      customerCompanyName: sampleDomain.getCustomerCompanyName(),
      customerTaxId: sampleDomain.getCustomerTaxId(),
      customerCountry: sampleDomain.getCustomerCountry(),
      simulationId: null,
      concept: sampleDomain.getConcept(),
      subtotal: 500,
      taxRate: 0.21,
      taxAmount: 105,
      totalAmount: 605,
      currency: 'EUR',
      status: InvoiceStatus.ISSUED,
      issueDate: new Date(),
      dueDate: new Date(),
      paidAt: null,
      notes: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    (mockRepository.save as jest.Mock).mockResolvedValue(savedEntity);

    const result = await adapter.save(sampleDomain);
    expect(result.getId()).toBe(sampleDomain.getId());
    expect(result.getSubtotal()).toBe(500);
  });

  it('should find invoice by id', async () => {
    (mockRepository.findOne as jest.Mock).mockResolvedValue(null);
    const result = await adapter.findById('non-existent');
    expect(result).toBeNull();
  });
});
