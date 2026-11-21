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
exports.UpdateInvoiceStatusUseCase = void 0;
const common_1 = require("@nestjs/common");
const invoice_repository_port_1 = require("../ports/out/invoice-repository.port");
const invoice_status_enum_1 = require("../../domain/enums/invoice-status.enum");
let UpdateInvoiceStatusUseCase = class UpdateInvoiceStatusUseCase {
    invoiceRepository;
    constructor(invoiceRepository) {
        this.invoiceRepository = invoiceRepository;
    }
    async execute(id, status) {
        const invoice = await this.invoiceRepository.findById(id);
        if (!invoice) {
            throw new common_1.NotFoundException(`Invoice with id '${id}' was not found.`);
        }
        if (status === invoice_status_enum_1.InvoiceStatus.PAID) {
            invoice.markAsPaid();
        }
        else if (status === invoice_status_enum_1.InvoiceStatus.CANCELLED) {
            invoice.cancel();
        }
        return this.invoiceRepository.save(invoice);
    }
};
exports.UpdateInvoiceStatusUseCase = UpdateInvoiceStatusUseCase;
exports.UpdateInvoiceStatusUseCase = UpdateInvoiceStatusUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(invoice_repository_port_1.INVOICE_REPOSITORY_PORT)),
    __metadata("design:paramtypes", [Object])
], UpdateInvoiceStatusUseCase);
//# sourceMappingURL=update-invoice-status.use-case.js.map