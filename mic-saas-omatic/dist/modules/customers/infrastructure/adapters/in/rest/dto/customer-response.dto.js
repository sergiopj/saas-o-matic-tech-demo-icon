"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerResponseDto = void 0;
class CustomerResponseDto {
    id;
    companyName;
    taxId;
    email;
    country;
    selectedPlan;
    createdAt;
    static fromDomain(customer) {
        const dto = new CustomerResponseDto();
        dto.id = customer.getId();
        dto.companyName = customer.getCompanyName();
        dto.taxId = customer.getTaxId();
        dto.email = customer.getEmail();
        dto.country = customer.getCountry();
        dto.selectedPlan = customer.getSelectedPlan();
        dto.createdAt = customer.getCreatedAt().toISOString();
        return dto;
    }
}
exports.CustomerResponseDto = CustomerResponseDto;
//# sourceMappingURL=customer-response.dto.js.map