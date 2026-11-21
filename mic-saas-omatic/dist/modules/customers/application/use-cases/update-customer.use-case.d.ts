import type { CustomerRepositoryPort } from '../ports/out/customer-repository.port';
import { Customer, UpdateCustomerPayload } from '../../domain/entities/customer.entity';
export declare class UpdateCustomerUseCase {
    private readonly customerRepository;
    constructor(customerRepository: CustomerRepositoryPort);
    execute(id: string, payload: UpdateCustomerPayload): Promise<Customer>;
    private ensureUniqueTaxId;
}
