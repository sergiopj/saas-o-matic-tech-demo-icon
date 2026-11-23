import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersModule } from '../customers/customers.module';
import { InvoiceTypeOrmEntity } from './infrastructure/adapters/out/persistence/invoice.typeorm-entity';
import { InvoicePersistenceAdapter } from './infrastructure/adapters/out/persistence/invoice-persistence.adapter';
import { INVOICE_REPOSITORY_PORT } from './application/ports/out/invoice-repository.port';
import { INVOICE_PDF_GENERATOR_PORT } from './application/ports/out/invoice-pdf-generator.port';
import { PdfkitInvoicePdfGeneratorAdapter } from './infrastructure/adapters/out/pdf/pdfkit-invoice-pdf-generator.adapter';
import { CreateInvoiceUseCase } from './application/use-cases/create-invoice.use-case';
import { ListInvoicesUseCase } from './application/use-cases/list-invoices.use-case';
import { GetInvoiceDetailUseCase } from './application/use-cases/get-invoice-detail.use-case';
import { UpdateInvoiceStatusUseCase } from './application/use-cases/update-invoice-status.use-case';
import { GenerateInvoicePdfUseCase } from './application/use-cases/generate-invoice-pdf.use-case';
import { InvoiceController } from './infrastructure/adapters/in/rest/invoice.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([InvoiceTypeOrmEntity]),
    CustomersModule,
  ],
  controllers: [InvoiceController],
  providers: [
    CreateInvoiceUseCase,
    ListInvoicesUseCase,
    GetInvoiceDetailUseCase,
    UpdateInvoiceStatusUseCase,
    GenerateInvoicePdfUseCase,
    {
      provide: INVOICE_REPOSITORY_PORT,
      useClass: InvoicePersistenceAdapter,
    },
    {
      provide: INVOICE_PDF_GENERATOR_PORT,
      useClass: PdfkitInvoicePdfGeneratorAdapter,
    },
  ],
  exports: [INVOICE_REPOSITORY_PORT, INVOICE_PDF_GENERATOR_PORT, TypeOrmModule],
})
export class InvoicesModule {}
