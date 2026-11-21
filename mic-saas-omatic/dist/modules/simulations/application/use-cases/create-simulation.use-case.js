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
exports.CreateSimulationUseCase = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const customer_repository_port_1 = require("../../../customers/application/ports/out/customer-repository.port");
const simulation_repository_port_1 = require("../ports/out/simulation-repository.port");
const simulation_entity_1 = require("../../domain/entities/simulation.entity");
const domain_exception_1 = require("../../../../shared/domain/domain.exception");
let CreateSimulationUseCase = class CreateSimulationUseCase {
    customerRepository;
    simulationRepository;
    constructor(customerRepository, simulationRepository) {
        this.customerRepository = customerRepository;
        this.simulationRepository = simulationRepository;
    }
    async execute(command) {
        const customer = await this.customerRepository.findById(command.customerId);
        if (!customer) {
            throw new domain_exception_1.EntityNotFoundError('Customer', command.customerId);
        }
        const simulation = simulation_entity_1.Simulation.create({
            customerId: customer.getId(),
            customerCountry: customer.getCountry(),
            activeUsers: command.activeUsers,
            storageGb: command.storageGb,
            apiCalls: command.apiCalls,
        }, uuid_1.v4);
        return this.simulationRepository.save(simulation);
    }
};
exports.CreateSimulationUseCase = CreateSimulationUseCase;
exports.CreateSimulationUseCase = CreateSimulationUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(customer_repository_port_1.CUSTOMER_REPOSITORY_PORT)),
    __param(1, (0, common_1.Inject)(simulation_repository_port_1.SIMULATION_REPOSITORY_PORT)),
    __metadata("design:paramtypes", [Object, Object])
], CreateSimulationUseCase);
//# sourceMappingURL=create-simulation.use-case.js.map