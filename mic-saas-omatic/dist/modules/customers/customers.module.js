"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const customer_typeorm_entity_1 = require("./infrastructure/adapters/out/persistence/customer.typeorm-entity");
const customer_persistence_adapter_1 = require("./infrastructure/adapters/out/persistence/customer-persistence.adapter");
const customer_repository_port_1 = require("./application/ports/out/customer-repository.port");
const create_customer_use_case_1 = require("./application/use-cases/create-customer.use-case");
const list_customers_use_case_1 = require("./application/use-cases/list-customers.use-case");
const get_customer_detail_use_case_1 = require("./application/use-cases/get-customer-detail.use-case");
const update_customer_use_case_1 = require("./application/use-cases/update-customer.use-case");
const customer_controller_1 = require("./infrastructure/adapters/in/rest/customer.controller");
let CustomersModule = class CustomersModule {
};
exports.CustomersModule = CustomersModule;
exports.CustomersModule = CustomersModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([customer_typeorm_entity_1.CustomerTypeOrmEntity])],
        controllers: [customer_controller_1.CustomerController],
        providers: [
            create_customer_use_case_1.CreateCustomerUseCase,
            list_customers_use_case_1.ListCustomersUseCase,
            get_customer_detail_use_case_1.GetCustomerDetailUseCase,
            update_customer_use_case_1.UpdateCustomerUseCase,
            {
                provide: customer_repository_port_1.CUSTOMER_REPOSITORY_PORT,
                useClass: customer_persistence_adapter_1.CustomerPersistenceAdapter,
            },
        ],
        exports: [customer_repository_port_1.CUSTOMER_REPOSITORY_PORT, typeorm_1.TypeOrmModule],
    })
], CustomersModule);
//# sourceMappingURL=customers.module.js.map