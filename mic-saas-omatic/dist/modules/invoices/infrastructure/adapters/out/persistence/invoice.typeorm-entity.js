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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceTypeOrmEntity = void 0;
const typeorm_1 = require("typeorm");
const invoice_status_enum_1 = require("../../../domain/enums/invoice-status.enum");
let InvoiceTypeOrmEntity = class InvoiceTypeOrmEntity {
    id;
    invoiceNumber;
    customerId;
    customerCompanyName;
    customerTaxId;
    customerCountry;
    simulationId;
    concept;
    subtotal;
    taxRate;
    taxAmount;
    totalAmount;
    currency;
    status;
    issueDate;
    dueDate;
    paidAt;
    notes;
    createdAt;
    updatedAt;
};
exports.InvoiceTypeOrmEntity = InvoiceTypeOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryColumn)('varchar', { length: 36 }),
    __metadata("design:type", String)
], InvoiceTypeOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Index)({ unique: true }),
    (0, typeorm_1.Column)('varchar', { length: 30 }),
    __metadata("design:type", String)
], InvoiceTypeOrmEntity.prototype, "invoiceNumber", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)('varchar', { length: 36 }),
    __metadata("design:type", String)
], InvoiceTypeOrmEntity.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 120 }),
    __metadata("design:type", String)
], InvoiceTypeOrmEntity.prototype, "customerCompanyName", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 20 }),
    __metadata("design:type", String)
], InvoiceTypeOrmEntity.prototype, "customerTaxId", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 2 }),
    __metadata("design:type", String)
], InvoiceTypeOrmEntity.prototype, "customerCountry", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 36, nullable: true }),
    __metadata("design:type", Object)
], InvoiceTypeOrmEntity.prototype, "simulationId", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 200 }),
    __metadata("design:type", String)
], InvoiceTypeOrmEntity.prototype, "concept", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], InvoiceTypeOrmEntity.prototype, "subtotal", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 4 }),
    __metadata("design:type", Number)
], InvoiceTypeOrmEntity.prototype, "taxRate", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], InvoiceTypeOrmEntity.prototype, "taxAmount", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], InvoiceTypeOrmEntity.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 3 }),
    __metadata("design:type", String)
], InvoiceTypeOrmEntity.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)('varchar', { length: 20 }),
    __metadata("design:type", typeof (_a = typeof invoice_status_enum_1.InvoiceStatus !== "undefined" && invoice_status_enum_1.InvoiceStatus) === "function" ? _a : Object)
], InvoiceTypeOrmEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)('datetime'),
    __metadata("design:type", Date)
], InvoiceTypeOrmEntity.prototype, "issueDate", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime'),
    __metadata("design:type", Date)
], InvoiceTypeOrmEntity.prototype, "dueDate", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', { nullable: true }),
    __metadata("design:type", Object)
], InvoiceTypeOrmEntity.prototype, "paidAt", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", Object)
], InvoiceTypeOrmEntity.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime'),
    __metadata("design:type", Date)
], InvoiceTypeOrmEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime'),
    __metadata("design:type", Date)
], InvoiceTypeOrmEntity.prototype, "updatedAt", void 0);
exports.InvoiceTypeOrmEntity = InvoiceTypeOrmEntity = __decorate([
    (0, typeorm_1.Entity)('invoices')
], InvoiceTypeOrmEntity);
//# sourceMappingURL=invoice.typeorm-entity.js.map