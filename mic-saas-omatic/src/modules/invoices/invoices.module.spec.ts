import { Test, TestingModule } from '@nestjs/testing';
import { InvoicesModule } from './invoices.module';
import { InvoiceController } from './infrastructure/adapters/in/rest/invoice.controller';
import { INVOICE_REPOSITORY_PORT } from './application/ports/out/invoice-repository.port';
import { CreateInvoiceUseCase } from './application/use-cases/create-invoice.use-case';
import { ListInvoicesUseCase } from './application/use-cases/list-invoices.use-case';
import { GetInvoiceDetailUseCase } from './application/use-cases/get-invoice-detail.use-case';
import { UpdateInvoiceStatusUseCase } from './application/use-cases/update-invoice-status.use-case';
import { getRepositoryToken } from '@nestjs/typeorm';
import { InvoiceTypeOrmEntity } from './infrastructure/adapters/out/persistence/invoice.typeorm-entity';
import { CUSTOMER_REPOSITORY_PORT } from '../customers/application/ports/out/customer-repository.port';

describe('InvoicesModule', () => {
  let moduleRef: TestingModule;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [InvoicesModule],
    })
      .overrideProvider(getRepositoryToken(InvoiceTypeOrmEntity))
      .useValue({})
      .overrideProvider(CUSTOMER_REPOSITORY_PORT)
      .useValue({})
      .compile();
  });

  it('should compile the module and resolve providers and controllers', () => {
    expect(moduleRef).toBeDefined();
    expect(moduleRef.get(InvoiceController)).toBeInstanceOf(InvoiceController);
    expect(moduleRef.get(CreateInvoiceUseCase)).toBeInstanceOf(CreateInvoiceUseCase);
    expect(moduleRef.get(ListInvoicesUseCase)).toBeInstanceOf(ListInvoicesUseCase);
    expect(moduleRef.get(GetInvoiceDetailUseCase)).toBeInstanceOf(GetInvoiceDetailUseCase);
    expect(moduleRef.get(UpdateInvoiceStatusUseCase)).toBeInstanceOf(UpdateInvoiceStatusUseCase);
    expect(moduleRef.get(INVOICE_REPOSITORY_PORT)).toBeDefined();
  });
});
