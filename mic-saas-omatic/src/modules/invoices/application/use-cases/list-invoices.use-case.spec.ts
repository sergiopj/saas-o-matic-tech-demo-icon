import { ListInvoicesUseCase } from './list-invoices.use-case';
import { InvoiceRepositoryPort } from '../ports/out/invoice-repository.port';
import { Invoice } from '../../domain/entities/invoice.entity';

describe('ListInvoicesUseCase', () => {
  let useCase: ListInvoicesUseCase;
  let mockInvoiceRepo: jest.Mocked<InvoiceRepositoryPort>;

  beforeEach(() => {
    mockInvoiceRepo = {
      save: jest.fn(),
      findById: jest.fn(),
      findByCustomerId: jest.fn(),
      search: jest.fn().mockResolvedValue({ items: [], total: 0 }),
    };
    useCase = new ListInvoicesUseCase(mockInvoiceRepo);
  });

  it('should list invoices delegating to search', async () => {
    const result = await useCase.execute({ page: 1, limit: 10 });
    expect(result.items).toEqual([]);
    expect(result.total).toBe(0);
    expect(mockInvoiceRepo.search).toHaveBeenCalledWith({ page: 1, limit: 10 });
  });
});
