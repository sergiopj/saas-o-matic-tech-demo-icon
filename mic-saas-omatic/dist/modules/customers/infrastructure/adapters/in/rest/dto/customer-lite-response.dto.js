"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerLiteResponseDto = void 0;
class CustomerLiteResponseDto {
    id;
    companyName;
    country;
    static fromDomain(customer) {
        const dto = new CustomerLiteResponseDto();
        dto.id = customer.getId();
        dto.companyName = customer.getCompanyName();
        dto.country = customer.getCountry();
        return dto;
    }
}
exports.CustomerLiteResponseDto = CustomerLiteResponseDto;
//# sourceMappingURL=customer-lite-response.dto.js.map