import { Inject, Injectable } from '@nestjs/common';
import { INVOICE_REPOSITORY_PORT } from '../ports/out/invoice-repository.port';
import type { InvoiceRepositoryPort } from '../ports/out/invoice-repository.port';
import { Invoice } from '../../domain/entities/invoice.entity';
import {
  InvoiceSearchCriteria,
  PaginatedInvoicesResult,
} from '../../domain/models/invoice-search-criteria.model';

@Injectable()
export class ListInvoicesUseCase {
  constructor(
    @Inject(INVOICE_REPOSITORY_PORT)
    private readonly invoiceRepository: InvoiceRepositoryPort,
  ) {}

  async execute(criteria?: InvoiceSearchCriteria): Promise<PaginatedInvoicesResult<Invoice>> {
    return this.invoiceRepository.search(criteria);
  }
}
