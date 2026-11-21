"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoicesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const customers_module_1 = require("../customers/customers.module");
const invoice_typeorm_entity_1 = require("./infrastructure/adapters/out/persistence/invoice.typeorm-entity");
const invoice_persistence_adapter_1 = require("./infrastructure/adapters/out/persistence/invoice-persistence.adapter");
const invoice_repository_port_1 = require("./application/ports/out/invoice-repository.port");
const create_invoice_use_case_1 = require("./application/use-cases/create-invoice.use-case");
const list_invoices_use_case_1 = require("./application/use-cases/list-invoices.use-case");
const get_invoice_detail_use_case_1 = require("./application/use-cases/get-invoice-detail.use-case");
const update_invoice_status_use_case_1 = require("./application/use-cases/update-invoice-status.use-case");
const invoice_controller_1 = require("./infrastructure/adapters/in/rest/invoice.controller");
let InvoicesModule = class InvoicesModule {
};
exports.InvoicesModule = InvoicesModule;
exports.InvoicesModule = InvoicesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([invoice_typeorm_entity_1.InvoiceTypeOrmEntity]),
            customers_module_1.CustomersModule,
        ],
        controllers: [invoice_controller_1.InvoiceController],
        providers: [
            create_invoice_use_case_1.CreateInvoiceUseCase,
            list_invoices_use_case_1.ListInvoicesUseCase,
            get_invoice_detail_use_case_1.GetInvoiceDetailUseCase,
            update_invoice_status_use_case_1.UpdateInvoiceStatusUseCase,
            {
                provide: invoice_repository_port_1.INVOICE_REPOSITORY_PORT,
                useClass: invoice_persistence_adapter_1.InvoicePersistenceAdapter,
            },
        ],
        exports: [invoice_repository_port_1.INVOICE_REPOSITORY_PORT, typeorm_1.TypeOrmModule],
    })
], InvoicesModule);
//# sourceMappingURL=invoices.module.js.map