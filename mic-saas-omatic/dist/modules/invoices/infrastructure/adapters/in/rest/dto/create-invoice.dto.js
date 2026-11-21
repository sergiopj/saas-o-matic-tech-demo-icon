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
exports.CreateInvoiceDto = void 0;
const class_validator_1 = require("class-validator");
class CreateInvoiceDto {
    customerId;
    simulationId;
    concept;
    subtotal;
    taxRate;
    currency;
    notes;
}
exports.CreateInvoiceDto = CreateInvoiceDto;
__decorate([
    (0, class_validator_1.IsUUID)('4', { message: 'customerId must be a valid UUID v4' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'customerId is required' }),
    __metadata("design:type", String)
], CreateInvoiceDto.prototype, "customerId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('4', { message: 'simulationId must be a valid UUID v4' }),
    __metadata("design:type", String)
], CreateInvoiceDto.prototype, "simulationId", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'concept must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'concept is required' }),
    (0, class_validator_1.MaxLength)(200, { message: 'concept cannot exceed 200 characters' }),
    __metadata("design:type", String)
], CreateInvoiceDto.prototype, "concept", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: 'subtotal must be a valid number' }),
    (0, class_validator_1.Min)(0, { message: 'subtotal must be greater than or equal to 0' }),
    __metadata("design:type", Number)
], CreateInvoiceDto.prototype, "subtotal", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { message: 'taxRate must be a valid number' }),
    (0, class_validator_1.Min)(0, { message: 'taxRate cannot be negative' }),
    (0, class_validator_1.Max)(1, { message: 'taxRate cannot exceed 1.0 (100%)' }),
    __metadata("design:type", Number)
], CreateInvoiceDto.prototype, "taxRate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'currency must be a string' }),
    __metadata("design:type", String)
], CreateInvoiceDto.prototype, "currency", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'notes must be a string' }),
    (0, class_validator_1.MaxLength)(500, { message: 'notes cannot exceed 500 characters' }),
    __metadata("design:type", String)
], CreateInvoiceDto.prototype, "notes", void 0);
//# sourceMappingURL=create-invoice.dto.js.map