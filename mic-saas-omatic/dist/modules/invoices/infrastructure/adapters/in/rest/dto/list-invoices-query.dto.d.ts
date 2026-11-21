import { InvoiceStatus } from '../../../../domain/enums/invoice-status.enum';
export declare class ListInvoicesQueryDto {
    customerId?: string;
    status?: InvoiceStatus;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'ASC' | 'DESC';
}
