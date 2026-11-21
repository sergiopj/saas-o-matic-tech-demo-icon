"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerPersistenceMapper = void 0;
const customer_entity_1 = require("../../../../domain/entities/customer.entity");
const customer_typeorm_entity_1 = require("./customer.typeorm-entity");
class CustomerPersistenceMapper {
    static toDomain(entity) {
        return customer_entity_1.Customer.reconstitute({
            id: entity.id,
            companyName: entity.companyName,
            taxId: entity.taxId,
            email: entity.email,
            country: entity.country,
            selectedPlan: entity.selectedPlan,
            createdAt: entity.createdAt,
        });
    }
    static toTypeOrm(domain) {
        const entity = new customer_typeorm_entity_1.CustomerTypeOrmEntity();
        entity.id = domain.getId();
        entity.companyName = domain.getCompanyName();
        entity.taxId = domain.getTaxId();
        entity.email = domain.getEmail();
        entity.country = domain.getCountry();
        entity.selectedPlan = domain.getSelectedPlan();
        entity.createdAt = domain.getCreatedAt();
        return entity;
    }
}
exports.CustomerPersistenceMapper = CustomerPersistenceMapper;
//# sourceMappingURL=customer-persistence.mapper.js.map