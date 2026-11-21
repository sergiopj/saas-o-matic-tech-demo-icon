import { NotFoundException } from '@nestjs/common';
import { UpdateInvoiceStatusUseCase } from './update-invoice-status.use-case';
import { InvoiceRepositoryPort } from '../ports/out/invoice-repository.port';
import { Invoice } from '../../domain/entities/invoice.entity';
import { InvoiceStatus } from '../../domain/enums/invoice-status.enum';

describe('UpdateInvoiceStatusUseCase', () => {
  let useCase: UpdateInvoiceStatusUseCase;
  let mockInvoiceRepo: jest.Mocked<InvoiceRepositoryPort>;

  const sampleInvoice = Invoice.create({
    id: 'inv-100',
    customerId: 'cust-1',
    customerCompanyName: 'Omatic Telecom S.L.',
    customerTaxId: 'B12345674',
    customerCountry: 'ES',
    concept: 'Subscription',
    subtotal: 500,
  });

  beforeEach(() => {
    mockInvoiceRepo = {
      save: jest.fn().mockImplementation((inv: Invoice) => Promise.resolve(inv)),
      findById: jest.fn().mockResolvedValue(sampleInvoice),
      findByCustomerId: jest.fn(),
      search: jest.fn(),
    };
    useCase = new UpdateInvoiceStatusUseCase(mockInvoiceRepo);
  });

  it('should mark invoice as PAID and persist', async () => {
    const result = await useCase.execute('inv-100', InvoiceStatus.PAID);
    expect(result.getStatus()).toBe(InvoiceStatus.PAID);
    expect(mockInvoiceRepo.save).toHaveBeenCalledTimes(1);
  });

  it('should throw NotFoundException when invoice does not exist', async () => {
    mockInvoiceRepo.findById.mockResolvedValueOnce(null);
    await expect(useCase.execute('unknown', InvoiceStatus.PAID)).rejects.toThrow(NotFoundException);
  });
});
