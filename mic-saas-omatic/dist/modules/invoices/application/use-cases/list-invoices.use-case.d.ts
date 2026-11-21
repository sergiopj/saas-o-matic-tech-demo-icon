import type { InvoiceRepositoryPort } from '../ports/out/invoice-repository.port';
import { Invoice } from '../../domain/entities/invoice.entity';
import { InvoiceSearchCriteria, PaginatedInvoicesResult } from '../../domain/models/invoice-search-criteria.model';
export declare class ListInvoicesUseCase {
    private readonly invoiceRepository;
    constructor(invoiceRepository: InvoiceRepositoryPort);
    execute(criteria?: InvoiceSearchCriteria): Promise<PaginatedInvoicesResult<Invoice>>;
}
