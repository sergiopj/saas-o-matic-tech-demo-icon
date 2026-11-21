import type { CustomerSortField, SortOrderDirection } from '../../../../../domain/models/customer-search-criteria.model';
export declare class ListCustomersQueryDto {
    search?: string;
    country?: string;
    page?: number;
    limit?: number;
    sortBy?: CustomerSortField;
    order?: SortOrderDirection;
    fields?: 'lite' | 'full';
}
