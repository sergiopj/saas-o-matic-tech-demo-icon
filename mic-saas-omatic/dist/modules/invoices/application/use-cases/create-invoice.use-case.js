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
exports.CreateInvoiceUseCase = void 0;
const common_1 = require("@nestjs/common");
const invoice_repository_port_1 = require("../ports/out/invoice-repository.port");
const customer_repository_port_1 = require("../../customers/application/ports/out/customer-repository.port");
const invoice_entity_1 = require("../../domain/entities/invoice.entity");
let CreateInvoiceUseCase = class CreateInvoiceUseCase {
    invoiceRepository;
    customerRepository;
    constructor(invoiceRepository, customerRepository) {
        this.invoiceRepository = invoiceRepository;
        this.customerRepository = customerRepository;
    }
    async execute(command) {
        const customer = await this.customerRepository.findById(command.customerId);
        if (!customer) {
            throw new common_1.NotFoundException(`Customer with id '${command.customerId}' was not found.`);
        }
        let taxRate = command.taxRate;
        if (taxRate === undefined) {
            taxRate = this.resolveDefaultTaxRate(customer.getCountry());
        }
        const invoice = invoice_entity_1.Invoice.create({
            customerId: customer.getId(),
            customerCompanyName: customer.getCompanyName(),
            customerTaxId: customer.getTaxId(),
            customerCountry: customer.getCountry(),
            simulationId: command.simulationId,
            concept: command.concept,
            subtotal: command.subtotal,
            taxRate,
            currency: command.currency ?? 'EUR',
            notes: command.notes,
        });
        return this.invoiceRepository.save(invoice);
    }
    resolveDefaultTaxRate(country) {
        switch (country.toUpperCase()) {
            case 'ES': return 0.21;
            case 'DE': return 0.19;
            case 'FR': return 0.20;
            case 'IT': return 0.22;
            case 'PT': return 0.23;
            case 'GB': return 0.20;
            case 'CH': return 0.081;
            case 'US': return 0.00;
            default: return 0.21;
        }
    }
};
exports.CreateInvoiceUseCase = CreateInvoiceUseCase;
exports.CreateInvoiceUseCase = CreateInvoiceUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(invoice_repository_port_1.INVOICE_REPOSITORY_PORT)),
    __param(1, (0, common_1.Inject)(customer_repository_port_1.CUSTOMER_REPOSITORY_PORT)),
    __metadata("design:paramtypes", [Object, Object])
], CreateInvoiceUseCase);
//# sourceMappingURL=create-invoice.use-case.js.map