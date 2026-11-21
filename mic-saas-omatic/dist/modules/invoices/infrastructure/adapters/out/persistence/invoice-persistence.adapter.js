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
exports.InvoicePersistenceAdapter = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const invoice_typeorm_entity_1 = require("./invoice.typeorm-entity");
const invoice_persistence_mapper_1 = require("./invoice-persistence.mapper");
let InvoicePersistenceAdapter = class InvoicePersistenceAdapter {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async save(invoice) {
        const entity = invoice_persistence_mapper_1.InvoicePersistenceMapper.toPersistence(invoice);
        const saved = await this.repository.save(entity);
        return invoice_persistence_mapper_1.InvoicePersistenceMapper.toDomain(saved);
    }
    async findById(id) {
        const found = await this.repository.findOne({ where: { id } });
        return found ? invoice_persistence_mapper_1.InvoicePersistenceMapper.toDomain(found) : null;
    }
    async findByCustomerId(customerId) {
        const found = await this.repository.find({
            where: { customerId },
            order: { issueDate: 'DESC' },
        });
        return found.map((item) => invoice_persistence_mapper_1.InvoicePersistenceMapper.toDomain(item));
    }
    async search(criteria) {
        const queryBuilder = this.repository.createQueryBuilder('invoice');
        if (criteria?.customerId) {
            queryBuilder.andWhere('invoice.customerId = :customerId', {
                customerId: criteria.customerId,
            });
        }
        if (criteria?.status) {
            queryBuilder.andWhere('invoice.status = :status', {
                status: criteria.status,
            });
        }
        const sortBy = criteria?.sortBy ?? 'issueDate';
        const sortOrder = criteria?.sortOrder ?? 'DESC';
        queryBuilder.orderBy(`invoice.${sortBy}`, sortOrder);
        const page = criteria?.page && criteria.page > 0 ? criteria.page : 1;
        const limit = criteria?.limit && criteria.limit > 0 ? criteria.limit : 20;
        queryBuilder.skip((page - 1) * limit).take(limit);
        const [entities, total] = await queryBuilder.getManyAndCount();
        return {
            items: entities.map((item) => invoice_persistence_mapper_1.InvoicePersistenceMapper.toDomain(item)),
            total,
        };
    }
};
exports.InvoicePersistenceAdapter = InvoicePersistenceAdapter;
exports.InvoicePersistenceAdapter = InvoicePersistenceAdapter = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(invoice_typeorm_entity_1.InvoiceTypeOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], InvoicePersistenceAdapter);
//# sourceMappingURL=invoice-persistence.adapter.js.map