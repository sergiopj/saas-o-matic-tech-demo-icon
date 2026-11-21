"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimulationResponseDto = void 0;
class SimulationResponseDto {
    id;
    customerId;
    activeUsers;
    storageGb;
    apiCalls;
    monthlyBaseCost;
    taxRate;
    taxAmount;
    totalCost;
    currency;
    createdAt;
    static fromDomain(simulation) {
        const dto = new SimulationResponseDto();
        dto.id = simulation.getId();
        dto.customerId = simulation.getCustomerId();
        dto.activeUsers = simulation.getActiveUsers();
        dto.storageGb = simulation.getStorageGb();
        dto.apiCalls = simulation.getApiCalls();
        dto.monthlyBaseCost = simulation.getMonthlyBaseCost();
        dto.taxRate = simulation.getTaxRate();
        dto.taxAmount = simulation.getTaxAmount();
        dto.totalCost = simulation.getTotalCost();
        dto.currency = simulation.getCurrency();
        dto.createdAt = simulation.getCreatedAt().toISOString();
        return dto;
    }
}
exports.SimulationResponseDto = SimulationResponseDto;
//# sourceMappingURL=simulation-response.dto.js.map