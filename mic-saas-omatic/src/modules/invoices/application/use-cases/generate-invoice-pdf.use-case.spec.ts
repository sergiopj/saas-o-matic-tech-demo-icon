import { NotFoundException } from '@nestjs/common';
import { GenerateInvoicePdfUseCase } from './generate-invoice-pdf.use-case';
import type { InvoiceRepositoryPort } from '../ports/out/invoice-repository.port';
import type { CustomerRepositoryPort } from '../../../customers/application/ports/out/customer-repository.port';
import type { InvoicePdfGeneratorPort } from '../ports/out/invoice-pdf-generator.port';
import { Invoice } from '../../domain/entities/invoice.entity';
import { Customer } from '../../../customers/domain/entities/customer.entity';

describe('GenerateInvoicePdfUseCase', () => {
  let useCase: GenerateInvoicePdfUseCase;
  let mockInvoiceRepo: jest.Mocked<InvoiceRepositoryPort>;
  let mockCustomerRepo: jest.Mocked<CustomerRepositoryPort>;
  let mockPdfGenerator: jest.Mocked<InvoicePdfGeneratorPort>;

  const sampleInvoice = Invoice.create({
    id: 'inv-uuid-1',
    invoiceNumber: 'INV-2026-00001',
    customerId: 'cust-uuid-1',
    customerCompanyName: 'Acme Corp',
    customerTaxId: 'B12345678',
    customerCountry: 'ES',
    concept: 'Subscription Tier 2',
    subtotal: 100,
    taxRate: 0.21,
  });

  const sampleCustomer = Customer.reconstitute({
    id: 'cust-uuid-1',
    companyName: 'Acme Corp',
    taxId: 'B12345678',
    email: 'acme@test.com',
    country: 'ES',
    selectedPlan: 'scale',
    createdAt: new Date(),
  });

  beforeEach(() => {
    mockInvoiceRepo = {
      save: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      count: jest.fn(),
    };

    mockCustomerRepo = {
      save: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      count: jest.fn(),
      findByTaxId: jest.fn(),
      delete: jest.fn(),
    };

    mockPdfGenerator = {
      generate: jest.fn(),
    };

    useCase = new GenerateInvoicePdfUseCase(
      mockInvoiceRepo,
      mockCustomerRepo,
      mockPdfGenerator,
    );
  });

  it('should generate PDF successfully when invoice and customer exist', async () => {
    const fakeBuffer = Buffer.from('%PDF-1.4 test invoice content');
    mockInvoiceRepo.findById.mockResolvedValue(sampleInvoice);
    mockCustomerRepo.findById.mockResolvedValue(sampleCustomer);
    mockPdfGenerator.generate.mockResolvedValue(fakeBuffer);

    const result = await useCase.execute('inv-uuid-1');

    expect(mockInvoiceRepo.findById).toHaveBeenCalledWith('inv-uuid-1');
    expect(mockCustomerRepo.findById).toHaveBeenCalledWith('cust-uuid-1');
    expect(mockPdfGenerator.generate).toHaveBeenCalledWith(
      sampleInvoice,
      expect.objectContaining({
        companyName: 'Acme Corp',
        taxId: 'B12345678',
        email: 'acme@test.com',
        country: 'ES',
      }),
    );
    expect(result.buffer).toEqual(fakeBuffer);
    expect(result.filename).toBe('INV-2026-00001.pdf');
  });

  it('should fall back to invoice snapshot data if customer repository throws or returns null', async () => {
    const fakeBuffer = Buffer.from('%PDF-1.4 test fallback');
    mockInvoiceRepo.findById.mockResolvedValue(sampleInvoice);
    mockCustomerRepo.findById.mockResolvedValue(null);
    mockPdfGenerator.generate.mockResolvedValue(fakeBuffer);

    const result = await useCase.execute('inv-uuid-1');

    expect(mockPdfGenerator.generate).toHaveBeenCalledWith(
      sampleInvoice,
      expect.objectContaining({
        companyName: 'Acme Corp',
        taxId: 'B12345678',
        country: 'ES',
      }),
    );
    expect(result.filename).toBe('INV-2026-00001.pdf');
  });

  it('should throw NotFoundException if invoice does not exist', async () => {
    mockInvoiceRepo.findById.mockResolvedValue(null);

    await expect(useCase.execute('non-existent')).rejects.toThrow(
      NotFoundException,
    );
    expect(mockPdfGenerator.generate).not.toHaveBeenCalled();
  });
});
