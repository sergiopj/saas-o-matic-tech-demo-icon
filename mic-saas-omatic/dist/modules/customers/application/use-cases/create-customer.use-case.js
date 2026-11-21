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
exports.CreateCustomerUseCase = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const customer_repository_port_1 = require("../ports/out/customer-repository.port");
const customer_entity_1 = require("../../domain/entities/customer.entity");
const tax_id_validator_1 = require("../../domain/services/tax-id.validator");
const domain_exception_1 = require("../../../../shared/domain/domain.exception");
let CreateCustomerUseCase = class CreateCustomerUseCase {
    customerRepository;
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    async execute(command) {
        const normalizedTax = (0, tax_id_validator_1.normalizeTaxId)(command.taxId);
        const existingCustomer = await this.customerRepository.findByTaxId(normalizedTax);
        if (existingCustomer) {
            throw new domain_exception_1.ConflictError(`Customer with taxId '${normalizedTax}' is already registered.`);
        }
        const customer = customer_entity_1.Customer.create({
            companyName: command.companyName,
            taxId: command.taxId,
            email: command.email,
            country: command.country,
            selectedPlan: command.selectedPlan,
        }, uuid_1.v4);
        return this.customerRepository.save(customer);
    }
};
exports.CreateCustomerUseCase = CreateCustomerUseCase;
exports.CreateCustomerUseCase = CreateCustomerUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(customer_repository_port_1.CUSTOMER_REPOSITORY_PORT)),
    __metadata("design:paramtypes", [Object])
], CreateCustomerUseCase);
//# sourceMappingURL=create-customer.use-case.js.map