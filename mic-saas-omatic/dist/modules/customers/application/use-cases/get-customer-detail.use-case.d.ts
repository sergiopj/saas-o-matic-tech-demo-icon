import type { CustomerRepositoryPort } from '../ports/out/customer-repository.port';
import { Customer } from '../../domain/entities/customer.entity';
export declare class GetCustomerDetailUseCase {
    private readonly customerRepository;
    constructor(customerRepository: CustomerRepositoryPort);
    execute(id: string): Promise<Customer>;
}
