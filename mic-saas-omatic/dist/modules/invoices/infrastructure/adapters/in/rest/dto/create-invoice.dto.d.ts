export declare class CreateInvoiceDto {
    customerId: string;
    simulationId?: string;
    concept: string;
    subtotal: number;
    taxRate?: number;
    currency?: string;
    notes?: string;
}
