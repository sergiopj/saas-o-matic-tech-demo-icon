import type { CustomerRepositoryPort } from '../ports/out/customer-repository.port';
import { Customer } from '../../domain/entities/customer.entity';
export interface CreateCustomerCommand {
    companyName: string;
    taxId: string;
    email: string;
    country: string;
    selectedPlan: string;
}
export declare class CreateCustomerUseCase {
    private readonly customerRepository;
    constructor(customerRepository: CustomerRepositoryPort);
    execute(command: CreateCustomerCommand): Promise<Customer>;
}
