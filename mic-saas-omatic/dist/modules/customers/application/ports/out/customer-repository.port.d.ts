import type { Customer } from '../../../domain/entities/customer.entity';
import type { CustomerSearchCriteria, CustomerSortField, PaginatedResult, SortOrderDirection } from '../../../domain/models/customer-search-criteria.model';
export declare const CUSTOMER_REPOSITORY_PORT: unique symbol;
export type { CustomerSearchCriteria, CustomerSortField, PaginatedResult, SortOrderDirection, };
export interface CustomerRepositoryPort {
    save(customer: Customer): Promise<Customer>;
    findById(id: string): Promise<Customer | null>;
    findByTaxId(taxId: string): Promise<Customer | null>;
    search(criteria?: CustomerSearchCriteria): Promise<PaginatedResult<Customer>>;
}
