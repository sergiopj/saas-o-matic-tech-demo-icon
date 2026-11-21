"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerPersistenceAdapter = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const tax_id_validator_1 = require("../../../../domain/services/tax-id.validator");
const customer_typeorm_entity_1 = require("./customer.typeorm-entity");
const customer_persistence_mapper_1 = require("./customer-persistence.mapper");
let CustomerPersistenceAdapter = class CustomerPersistenceAdapter {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async save(customer) {
        const typeOrmEntity = customer_persistence_mapper_1.CustomerPersistenceMapper.toTypeOrm(customer);
        const saved = await this.repository.save(typeOrmEntity);
        return customer_persistence_mapper_1.CustomerPersistenceMapper.toDomain(saved);
    }
    async findById(id) {
        const found = await this.repository.findOne({ where: { id } });
        return found ? customer_persistence_mapper_1.CustomerPersistenceMapper.toDomain(found) : null;
    }
    async findByTaxId(taxId) {
        const found = await this.repository.findOne({ where: { taxId } });
        return found ? customer_persistence_mapper_1.CustomerPersistenceMapper.toDomain(found) : null;
    }
    async search(criteria = {}) {
        const options = {
            order: this.buildSort(criteria),
        };
        const where = this.buildWhere(criteria);
        if (where) {
            options.where = where;
        }
        this.applyPagination(options, criteria);
        const [entities, total] = await this.repository.findAndCount(options);
        return {
            items: entities.map((entity) => customer_persistence_mapper_1.CustomerPersistenceMapper.toDomain(entity)),
            total,
        };
    }
    buildWhere(criteria) {
        const term = criteria.term?.trim();
        const country = this.normalizeCountry(criteria.country);
        if (!term) {
            return country ? { country } : undefined;
        }
        const cleanTerm = `%${term}%`;
        const normalizedTaxTerm = `%${(0, tax_id_validator_1.normalizeTaxId)(term)}%`;
        if (country) {
            return [
                { companyName: (0, typeorm_2.Like)(cleanTerm), country },
                { taxId: (0, typeorm_2.Like)(normalizedTaxTerm), country },
                { email: (0, typeorm_2.Like)(cleanTerm), country },
            ];
        }
        return [
            { companyName: (0, typeorm_2.Like)(cleanTerm) },
            { taxId: (0, typeorm_2.Like)(normalizedTaxTerm) },
            { email: (0, typeorm_2.Like)(cleanTerm) },
        ];
    }
    normalizeCountry(country) {
        const normalized = country?.trim().toUpperCase();
        return normalized && normalized !== 'ALL' ? normalized : undefined;
    }
    buildSort(criteria) {
        const field = criteria.sortBy ?? 'createdAt';
        const defaultDirection = field === 'companyName' ? 'ASC' : 'DESC';
        const direction = criteria.sortOrder ?? defaultDirection;
        return { [field]: direction };
    }
    applyPagination(options, criteria) {
        if (criteria.page &&
            criteria.limit &&
            criteria.page > 0 &&
            criteria.limit > 0) {
            options.skip = (criteria.page - 1) * criteria.limit;
            options.take = criteria.limit;
        }
    }
};
exports.CustomerPersistenceAdapter = CustomerPersistenceAdapter;
exports.CustomerPersistenceAdapter = CustomerPersistenceAdapter = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(customer_typeorm_entity_1.CustomerTypeOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CustomerPersistenceAdapter);
//# sourceMappingURL=customer-persistence.adapter.js.map