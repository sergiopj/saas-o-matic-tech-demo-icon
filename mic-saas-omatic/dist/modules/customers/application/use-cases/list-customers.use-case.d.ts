import type { CustomerRepositoryPort, PaginatedResult, CustomerSearchCriteria } from '../ports/out/customer-repository.port';
import type { Customer } from '../../domain/entities/customer.entity';
export declare class ListCustomersUseCase {
    private readonly customerRepository;
    constructor(customerRepository: CustomerRepositoryPort);
    execute(criteria?: CustomerSearchCriteria): Promise<PaginatedResult<Customer>>;
}
