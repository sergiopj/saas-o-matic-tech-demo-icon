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
exports.SimulationPersistenceAdapter = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const simulation_typeorm_entity_1 = require("./simulation.typeorm-entity");
const simulation_persistence_mapper_1 = require("./simulation-persistence.mapper");
let SimulationPersistenceAdapter = class SimulationPersistenceAdapter {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async save(simulation) {
        const typeOrmEntity = simulation_persistence_mapper_1.SimulationPersistenceMapper.toTypeOrm(simulation);
        const saved = await this.repository.save(typeOrmEntity);
        return simulation_persistence_mapper_1.SimulationPersistenceMapper.toDomain(saved);
    }
    async findByCustomerId(customerId) {
        const records = await this.repository.find({
            ...(customerId ? { where: { customerId } } : {}),
            order: { createdAt: 'DESC' },
        });
        return records.map((record) => simulation_persistence_mapper_1.SimulationPersistenceMapper.toDomain(record));
    }
};
exports.SimulationPersistenceAdapter = SimulationPersistenceAdapter;
exports.SimulationPersistenceAdapter = SimulationPersistenceAdapter = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(simulation_typeorm_entity_1.SimulationTypeOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SimulationPersistenceAdapter);
//# sourceMappingURL=simulation-persistence.adapter.js.map