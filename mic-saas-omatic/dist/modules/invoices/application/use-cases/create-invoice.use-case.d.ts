import type { InvoiceRepositoryPort } from '../ports/out/invoice-repository.port';
import type { CustomerRepositoryPort } from '../../customers/application/ports/out/customer-repository.port';
import { Invoice } from '../../domain/entities/invoice.entity';
export interface CreateInvoiceCommand {
    customerId: string;
    simulationId?: string | null;
    concept: string;
    subtotal: number;
    taxRate?: number;
    currency?: string;
    notes?: string | null;
}
export declare class CreateInvoiceUseCase {
    private readonly invoiceRepository;
    private readonly customerRepository;
    constructor(invoiceRepository: InvoiceRepositoryPort, customerRepository: CustomerRepositoryPort);
    execute(command: CreateInvoiceCommand): Promise<Invoice>;
    private resolveDefaultTaxRate;
}
