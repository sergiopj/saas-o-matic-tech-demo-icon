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
exports.CustomerTypeOrmEntity = void 0;
const typeorm_1 = require("typeorm");
let CustomerTypeOrmEntity = class CustomerTypeOrmEntity {
    id;
    companyName;
    taxId;
    email;
    country;
    selectedPlan;
    createdAt;
};
exports.CustomerTypeOrmEntity = CustomerTypeOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryColumn)('varchar', { length: 36 }),
    __metadata("design:type", String)
], CustomerTypeOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 120 }),
    __metadata("design:type", String)
], CustomerTypeOrmEntity.prototype, "companyName", void 0);
__decorate([
    (0, typeorm_1.Index)({ unique: true }),
    (0, typeorm_1.Column)('varchar', { length: 20 }),
    __metadata("design:type", String)
], CustomerTypeOrmEntity.prototype, "taxId", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 150 }),
    __metadata("design:type", String)
], CustomerTypeOrmEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 2 }),
    __metadata("design:type", String)
], CustomerTypeOrmEntity.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 50 }),
    __metadata("design:type", String)
], CustomerTypeOrmEntity.prototype, "selectedPlan", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime'),
    __metadata("design:type", Date)
], CustomerTypeOrmEntity.prototype, "createdAt", void 0);
exports.CustomerTypeOrmEntity = CustomerTypeOrmEntity = __decorate([
    (0, typeorm_1.Entity)('customers')
], CustomerTypeOrmEntity);
//# sourceMappingURL=customer.typeorm-entity.js.map