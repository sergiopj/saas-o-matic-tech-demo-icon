import { NotFoundException } from '@nestjs/common';
import { CreateInvoiceUseCase } from './create-invoice.use-case';
import { InvoiceRepositoryPort } from '../ports/out/invoice-repository.port';
import { CustomerRepositoryPort } from '../../../customers/application/ports/out/customer-repository.port';
import { Customer } from '../../../customers/domain/entities/customer.entity';
import { Invoice } from '../../domain/entities/invoice.entity';

describe('CreateInvoiceUseCase', () => {
  let useCase: CreateInvoiceUseCase;
  let mockInvoiceRepo: jest.Mocked<InvoiceRepositoryPort>;
  let mockCustomerRepo: jest.Mocked<CustomerRepositoryPort>;

  const sampleCustomer = Customer.reconstitute({
    id: 'cust-100',
    companyName: 'Omatic Telecom S.L.',
    taxId: 'B12345674',
    email: 'billing@omatic.es',
    country: 'ES',
    selectedPlan: 'Enterprise Scale',
    createdAt: new Date('2026-09-01T09:00:00Z'),
  });

  beforeEach(() => {
    mockInvoiceRepo = {
      save: jest.fn().mockImplementation((inv: Invoice) => Promise.resolve(inv)),
      findById: jest.fn(),
      findByCustomerId: jest.fn(),
      search: jest.fn(),
    };
    mockCustomerRepo = {
      save: jest.fn(),
      findById: jest.fn().mockResolvedValue(sampleCustomer),
      findByTaxId: jest.fn(),
      search: jest.fn(),
    };
    useCase = new CreateInvoiceUseCase(mockInvoiceRepo, mockCustomerRepo);
  });

  it('should successfully create and persist an invoice for an existing customer', async () => {
    const result = await useCase.execute({
      customerId: 'cust-100',
      concept: 'Annual Subscription',
      subtotal: 1000,
    });

    expect(result.getCustomerId()).toBe('cust-100');
    expect(result.getCustomerCompanyName()).toBe('Omatic Telecom S.L.');
    expect(result.getSubtotal()).toBe(1000);
    expect(result.getTaxRate()).toBe(0.21);
    expect(result.getTotalAmount()).toBe(1210);
    expect(mockInvoiceRepo.save).toHaveBeenCalledTimes(1);
  });

  it('should throw NotFoundException when customer does not exist', async () => {
    mockCustomerRepo.findById.mockResolvedValueOnce(null);

    await expect(
      useCase.execute({
        customerId: 'non-existent',
        concept: 'Subscription',
        subtotal: 500,
      }),
    ).rejects.toThrow(NotFoundException);
  });
});
