"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerDetailResponseDto = void 0;
class CustomerDetailResponseDto {
    id;
    companyName;
    taxId;
    email;
    country;
    selectedPlan;
    createdAt;
    simulations;
    static fromDomain(customer, simulations = []) {
        const dto = new CustomerDetailResponseDto();
        dto.id = customer.getId();
        dto.companyName = customer.getCompanyName();
        dto.taxId = customer.getTaxId();
        dto.email = customer.getEmail();
        dto.country = customer.getCountry();
        dto.selectedPlan = customer.getSelectedPlan();
        dto.createdAt = customer.getCreatedAt().toISOString();
        dto.simulations = simulations;
        return dto;
    }
}
exports.CustomerDetailResponseDto = CustomerDetailResponseDto;
//# sourceMappingURL=customer-detail-response.dto.js.map