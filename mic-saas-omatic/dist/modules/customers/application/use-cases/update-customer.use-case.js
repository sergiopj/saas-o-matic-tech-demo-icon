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
exports.UpdateCustomerUseCase = void 0;
const common_1 = require("@nestjs/common");
const customer_repository_port_1 = require("../ports/out/customer-repository.port");
const domain_exception_1 = require("../../../../shared/domain/domain.exception");
const tax_id_validator_1 = require("../../domain/services/tax-id.validator");
let UpdateCustomerUseCase = class UpdateCustomerUseCase {
    customerRepository;
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    async execute(id, payload) {
        const customer = await this.customerRepository.findById(id);
        if (!customer) {
            throw new domain_exception_1.EntityNotFoundError('Customer', id);
        }
        if (payload.taxId) {
            await this.ensureUniqueTaxId(payload.taxId, customer);
        }
        const updated = customer.update(payload);
        return this.customerRepository.save(updated);
    }
    async ensureUniqueTaxId(newTaxId, currentCustomer) {
        const normalizedTax = (0, tax_id_validator_1.normalizeTaxId)(newTaxId);
        if (normalizedTax === currentCustomer.getTaxId()) {
            return;
        }
        const duplicate = await this.customerRepository.findByTaxId(normalizedTax);
        if (duplicate && duplicate.getId() !== currentCustomer.getId()) {
            throw new domain_exception_1.ConflictError(`A customer with taxId '${normalizedTax}' already exists.`);
        }
    }
};
exports.UpdateCustomerUseCase = UpdateCustomerUseCase;
exports.UpdateCustomerUseCase = UpdateCustomerUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(customer_repository_port_1.CUSTOMER_REPOSITORY_PORT)),
    __metadata("design:paramtypes", [Object])
], UpdateCustomerUseCase);
//# sourceMappingURL=update-customer.use-case.js.map