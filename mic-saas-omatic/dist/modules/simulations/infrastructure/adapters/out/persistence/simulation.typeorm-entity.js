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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimulationTypeOrmEntity = void 0;
const typeorm_1 = require("typeorm");
let SimulationTypeOrmEntity = class SimulationTypeOrmEntity {
    id;
    customerId;
    activeUsers;
    storageGb;
    apiCalls;
    monthlyBaseCost;
    taxRate;
    taxAmount;
    totalCost;
    createdAt;
};
exports.SimulationTypeOrmEntity = SimulationTypeOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryColumn)('varchar', { length: 36 }),
    __metadata("design:type", String)
], SimulationTypeOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)('varchar', { length: 36 }),
    __metadata("design:type", String)
], SimulationTypeOrmEntity.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.Column)('integer'),
    __metadata("design:type", Number)
], SimulationTypeOrmEntity.prototype, "activeUsers", void 0);
__decorate([
    (0, typeorm_1.Column)('float'),
    __metadata("design:type", Number)
], SimulationTypeOrmEntity.prototype, "storageGb", void 0);
__decorate([
    (0, typeorm_1.Column)('integer'),
    __metadata("design:type", Number)
], SimulationTypeOrmEntity.prototype, "apiCalls", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], SimulationTypeOrmEntity.prototype, "monthlyBaseCost", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 5, scale: 4 }),
    __metadata("design:type", Number)
], SimulationTypeOrmEntity.prototype, "taxRate", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], SimulationTypeOrmEntity.prototype, "taxAmount", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], SimulationTypeOrmEntity.prototype, "totalCost", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime'),
    __metadata("design:type", Date)
], SimulationTypeOrmEntity.prototype, "createdAt", void 0);
exports.SimulationTypeOrmEntity = SimulationTypeOrmEntity = __decorate([
    (0, typeorm_1.Entity)('simulations')
], SimulationTypeOrmEntity);
//# sourceMappingURL=simulation.typeorm-entity.js.map