"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimulationPersistenceMapper = void 0;
const simulation_entity_1 = require("../../../../domain/entities/simulation.entity");
const simulation_typeorm_entity_1 = require("./simulation.typeorm-entity");
class SimulationPersistenceMapper {
    static toDomain(entity) {
        return simulation_entity_1.Simulation.reconstitute({
            id: entity.id,
            customerId: entity.customerId,
            activeUsers: entity.activeUsers,
            storageGb: entity.storageGb,
            apiCalls: entity.apiCalls,
            monthlyBaseCost: Number(entity.monthlyBaseCost),
            taxRate: Number(entity.taxRate),
            taxAmount: Number(entity.taxAmount),
            totalCost: Number(entity.totalCost),
            currency: 'EUR',
            createdAt: entity.createdAt,
        });
    }
    static toTypeOrm(domain) {
        const entity = new simulation_typeorm_entity_1.SimulationTypeOrmEntity();
        entity.id = domain.getId();
        entity.customerId = domain.getCustomerId();
        entity.activeUsers = domain.getActiveUsers();
        entity.storageGb = domain.getStorageGb();
        entity.apiCalls = domain.getApiCalls();
        entity.monthlyBaseCost = domain.getMonthlyBaseCost();
        entity.taxRate = domain.getTaxRate();
        entity.taxAmount = domain.getTaxAmount();
        entity.totalCost = domain.getTotalCost();
        entity.createdAt = domain.getCreatedAt();
        return entity;
    }
}
exports.SimulationPersistenceMapper = SimulationPersistenceMapper;
//# sourceMappingURL=simulation-persistence.mapper.js.map