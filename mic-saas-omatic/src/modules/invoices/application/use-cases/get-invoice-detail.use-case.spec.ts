import { NotFoundException } from '@nestjs/common';
import { GetInvoiceDetailUseCase } from './get-invoice-detail.use-case';
import { InvoiceRepositoryPort } from '../ports/out/invoice-repository.port';
import { Invoice } from '../../domain/entities/invoice.entity';

describe('GetInvoiceDetailUseCase', () => {
  let useCase: GetInvoiceDetailUseCase;
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
      save: jest.fn(),
      findById: jest.fn().mockResolvedValue(sampleInvoice),
      findByCustomerId: jest.fn(),
      search: jest.fn(),
    };
    useCase = new GetInvoiceDetailUseCase(mockInvoiceRepo);
  });

  it('should return invoice detail when found', async () => {
    const result = await useCase.execute('inv-100');
    expect(result.getId()).toBe('inv-100');
  });

  it('should throw NotFoundException when invoice does not exist', async () => {
    mockInvoiceRepo.findById.mockResolvedValueOnce(null);
    await expect(useCase.execute('non-existent')).rejects.toThrow(NotFoundException);
  });
});
