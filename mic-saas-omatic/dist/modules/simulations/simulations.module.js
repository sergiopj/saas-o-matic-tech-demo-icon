"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimulationsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const customers_module_1 = require("../customers/customers.module");
const simulation_typeorm_entity_1 = require("./infrastructure/adapters/out/persistence/simulation.typeorm-entity");
const simulation_persistence_adapter_1 = require("./infrastructure/adapters/out/persistence/simulation-persistence.adapter");
const simulation_repository_port_1 = require("./application/ports/out/simulation-repository.port");
const create_simulation_use_case_1 = require("./application/use-cases/create-simulation.use-case");
const list_simulations_by_customer_use_case_1 = require("./application/use-cases/list-simulations-by-customer.use-case");
const simulation_controller_1 = require("./infrastructure/adapters/in/rest/simulation.controller");
let SimulationsModule = class SimulationsModule {
};
exports.SimulationsModule = SimulationsModule;
exports.SimulationsModule = SimulationsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([simulation_typeorm_entity_1.SimulationTypeOrmEntity]),
            customers_module_1.CustomersModule,
        ],
        controllers: [simulation_controller_1.SimulationController],
        providers: [
            create_simulation_use_case_1.CreateSimulationUseCase,
            list_simulations_by_customer_use_case_1.ListSimulationsByCustomerUseCase,
            {
                provide: simulation_repository_port_1.SIMULATION_REPOSITORY_PORT,
                useClass: simulation_persistence_adapter_1.SimulationPersistenceAdapter,
            },
        ],
        exports: [simulation_repository_port_1.SIMULATION_REPOSITORY_PORT, typeorm_1.TypeOrmModule],
    })
], SimulationsModule);
//# sourceMappingURL=simulations.module.js.map