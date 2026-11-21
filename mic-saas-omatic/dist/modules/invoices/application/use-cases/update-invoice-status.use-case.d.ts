import type { InvoiceRepositoryPort } from '../ports/out/invoice-repository.port';
import { Invoice } from '../../domain/entities/invoice.entity';
import { InvoiceStatus } from '../../domain/enums/invoice-status.enum';
export declare class UpdateInvoiceStatusUseCase {
    private readonly invoiceRepository;
    constructor(invoiceRepository: InvoiceRepositoryPort);
    execute(id: string, status: InvoiceStatus): Promise<Invoice>;
}
