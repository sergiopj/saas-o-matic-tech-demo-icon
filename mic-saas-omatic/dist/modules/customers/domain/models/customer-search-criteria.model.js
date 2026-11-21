"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SORT_ORDER_DIRECTIONS = exports.CUSTOMER_SORTABLE_FIELDS = void 0;
exports.isCustomerSortField = isCustomerSortField;
exports.isSortOrderDirection = isSortOrderDirection;
exports.CUSTOMER_SORTABLE_FIELDS = [
    'companyName',
    'createdAt',
    'country',
    'taxId',
];
exports.SORT_ORDER_DIRECTIONS = ['ASC', 'DESC'];
function isCustomerSortField(value) {
    return (typeof value === 'string' &&
        exports.CUSTOMER_SORTABLE_FIELDS.includes(value));
}
function isSortOrderDirection(value) {
    return (typeof value === 'string' &&
        exports.SORT_ORDER_DIRECTIONS.includes(value.toUpperCase()));
}
//# sourceMappingURL=customer-search-criteria.model.js.map