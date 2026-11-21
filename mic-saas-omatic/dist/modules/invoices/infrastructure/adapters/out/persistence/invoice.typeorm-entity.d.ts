import { InvoiceStatus } from '../../../domain/enums/invoice-status.enum';
export declare class InvoiceTypeOrmEntity {
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
    issueDate: Date;
    dueDate: Date;
    paidAt: Date | null;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
}
