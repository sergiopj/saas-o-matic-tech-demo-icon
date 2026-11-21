import { Repository } from 'typeorm';
import { InvoiceRepositoryPort } from '../../../application/ports/out/invoice-repository.port';
import { Invoice } from '../../../domain/entities/invoice.entity';
import { InvoiceTypeOrmEntity } from './invoice.typeorm-entity';
import { InvoiceSearchCriteria, PaginatedInvoicesResult } from '../../../domain/models/invoice-search-criteria.model';
export declare class InvoicePersistenceAdapter implements InvoiceRepositoryPort {
    private readonly repository;
    constructor(repository: Repository<InvoiceTypeOrmEntity>);
    save(invoice: Invoice): Promise<Invoice>;
    findById(id: string): Promise<Invoice | null>;
    findByCustomerId(customerId: string): Promise<Invoice[]>;
    search(criteria?: InvoiceSearchCriteria): Promise<PaginatedInvoicesResult<Invoice>>;
}
