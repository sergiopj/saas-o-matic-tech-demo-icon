export declare const CUSTOMER_SORTABLE_FIELDS: readonly ["companyName", "createdAt", "country", "taxId"];
export type CustomerSortField = (typeof CUSTOMER_SORTABLE_FIELDS)[number];
export declare const SORT_ORDER_DIRECTIONS: readonly ["ASC", "DESC"];
export type SortOrderDirection = (typeof SORT_ORDER_DIRECTIONS)[number];
export declare function isCustomerSortField(value: unknown): value is CustomerSortField;
export declare function isSortOrderDirection(value: unknown): value is SortOrderDirection;
export interface CustomerSortOptions {
    field: CustomerSortField;
    order: SortOrderDirection;
}
export interface CustomerSearchCriteria {
    term?: string;
    country?: string;
    page?: number;
    limit?: number;
    sortBy?: CustomerSortField;
    sortOrder?: SortOrderDirection;
}
export interface PaginatedResult<T> {
    items: T[];
    total: number;
}
