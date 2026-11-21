import type { Invoice } from '../../domain/entities/invoice.entity';
import type {
  InvoiceSearchCriteria,
  PaginatedInvoicesResult,
} from '../../domain/models/invoice-search-criteria.model';

export const INVOICE_REPOSITORY_PORT = Symbol('INVOICE_REPOSITORY_PORT');

export interface InvoiceRepositoryPort {
  save(invoice: Invoice): Promise<Invoice>;
  findById(id: string): Promise<Invoice | null>;
  findByCustomerId(customerId: string): Promise<Invoice[]>;
  search(criteria?: InvoiceSearchCriteria): Promise<PaginatedInvoicesResult<Invoice>>;
}
