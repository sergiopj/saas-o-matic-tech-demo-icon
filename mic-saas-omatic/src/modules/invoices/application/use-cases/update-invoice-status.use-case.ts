import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { INVOICE_REPOSITORY_PORT } from '../ports/out/invoice-repository.port';
import type { InvoiceRepositoryPort } from '../ports/out/invoice-repository.port';
import { Invoice } from '../../domain/entities/invoice.entity';
import { InvoiceStatus } from '../../domain/enums/invoice-status.enum';

@Injectable()
export class UpdateInvoiceStatusUseCase {
  constructor(
    @Inject(INVOICE_REPOSITORY_PORT)
    private readonly invoiceRepository: InvoiceRepositoryPort,
  ) {}

  async execute(id: string, status: InvoiceStatus): Promise<Invoice> {
    const invoice = await this.invoiceRepository.findById(id);
    if (!invoice) {
      throw new NotFoundException(`Invoice with id '${id}' was not found.`);
    }

    if (status === InvoiceStatus.PAID) {
      invoice.markAsPaid();
    } else if (status === InvoiceStatus.CANCELLED) {
      invoice.cancel();
    }

    return this.invoiceRepository.save(invoice);
  }
}
