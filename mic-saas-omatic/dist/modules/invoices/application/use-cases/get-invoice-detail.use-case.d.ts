import type { InvoiceRepositoryPort } from '../ports/out/invoice-repository.port';
import { Invoice } from '../../domain/entities/invoice.entity';
export declare class GetInvoiceDetailUseCase {
    private readonly invoiceRepository;
    constructor(invoiceRepository: InvoiceRepositoryPort);
    execute(id: string): Promise<Invoice>;
}
