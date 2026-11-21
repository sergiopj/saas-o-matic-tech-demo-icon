import { Repository } from 'typeorm';
import type { CustomerRepositoryPort, PaginatedResult, CustomerSearchCriteria } from '../../../../application/ports/out/customer-repository.port';
import { Customer } from '../../../../domain/entities/customer.entity';
import { CustomerTypeOrmEntity } from './customer.typeorm-entity';
export declare class CustomerPersistenceAdapter implements CustomerRepositoryPort {
    private readonly repository;
    constructor(repository: Repository<CustomerTypeOrmEntity>);
    save(customer: Customer): Promise<Customer>;
    findById(id: string): Promise<Customer | null>;
    findByTaxId(taxId: string): Promise<Customer | null>;
    search(criteria?: CustomerSearchCriteria): Promise<PaginatedResult<Customer>>;
    private buildWhere;
    private normalizeCountry;
    private buildSort;
    private applyPagination;
}
