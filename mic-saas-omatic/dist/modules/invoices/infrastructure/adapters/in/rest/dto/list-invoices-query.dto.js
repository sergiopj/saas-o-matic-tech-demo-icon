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
exports.ListInvoicesQueryDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const invoice_status_enum_1 = require("../../../../domain/enums/invoice-status.enum");
class ListInvoicesQueryDto {
    customerId;
    status;
    page;
    limit;
    sortBy;
    sortOrder;
}
exports.ListInvoicesQueryDto = ListInvoicesQueryDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ListInvoicesQueryDto.prototype, "customerId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(invoice_status_enum_1.InvoiceStatus, { message: 'status must be a valid InvoiceStatus (DRAFT, ISSUED, PAID, CANCELLED)' }),
    __metadata("design:type", typeof (_a = typeof invoice_status_enum_1.InvoiceStatus !== "undefined" && invoice_status_enum_1.InvoiceStatus) === "function" ? _a : Object)
], ListInvoicesQueryDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)({ message: 'page must be an integer' }),
    (0, class_validator_1.Min)(1, { message: 'page must be at least 1' }),
    __metadata("design:type", Number)
], ListInvoicesQueryDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)({ message: 'limit must be an integer' }),
    (0, class_validator_1.Min)(1, { message: 'limit must be at least 1' }),
    __metadata("design:type", Number)
], ListInvoicesQueryDto.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ListInvoicesQueryDto.prototype, "sortBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ListInvoicesQueryDto.prototype, "sortOrder", void 0);
//# sourceMappingURL=list-invoices-query.dto.js.map