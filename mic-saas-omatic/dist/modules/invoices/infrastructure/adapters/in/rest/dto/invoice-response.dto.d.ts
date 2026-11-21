import { Invoice } from '../../../../domain/entities/invoice.entity';
import { InvoiceStatus } from '../../../../domain/enums/invoice-status.enum';
export declare class InvoiceResponseDto {
    id: string;
    invoiceNumber: string;
    customerId: string;
    customerCompanyName: string;
    customerTaxId: string;
    customerCountry: string;
    simulationId: string | null;
    concept: string;
    subtotal: number;
    taxRate: number;
    taxAmount: number;
    totalAmount: number;
    currency: string;
    status: InvoiceStatus;
    issueDate: string;
    dueDate: string;
    paidAt: string | null;
    notes: string | null;
    createdAt: string;
    static fromDomain(domain: Invoice): InvoiceResponseDto;
}
