import { InvoiceStatus } from '../enums/invoice-status.enum';
export interface InvoiceSearchCriteria {
    customerId?: string;
    status?: InvoiceStatus;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'ASC' | 'DESC';
}
export interface PaginatedInvoicesResult<T> {
    items: T[];
    total: number;
}
