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
exports.SimulationController = void 0;
const common_1 = require("@nestjs/common");
const create_simulation_use_case_1 = require("../../../../application/use-cases/create-simulation.use-case");
const list_simulations_by_customer_use_case_1 = require("../../../../application/use-cases/list-simulations-by-customer.use-case");
const create_simulation_dto_1 = require("./dto/create-simulation.dto");
const simulation_response_dto_1 = require("./dto/simulation-response.dto");
let SimulationController = class SimulationController {
    createSimulationUseCase;
    listSimulationsByCustomerUseCase;
    constructor(createSimulationUseCase, listSimulationsByCustomerUseCase) {
        this.createSimulationUseCase = createSimulationUseCase;
        this.listSimulationsByCustomerUseCase = listSimulationsByCustomerUseCase;
    }
    async create(createSimulationDto) {
        const simulation = await this.createSimulationUseCase.execute(createSimulationDto);
        return simulation_response_dto_1.SimulationResponseDto.fromDomain(simulation);
    }
    async findByCustomer(customerId) {
        const simulations = await this.listSimulationsByCustomerUseCase.execute(customerId);
        return simulations.map((sim) => simulation_response_dto_1.SimulationResponseDto.fromDomain(sim));
    }
};
exports.SimulationController = SimulationController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_simulation_dto_1.CreateSimulationDto]),
    __metadata("design:returntype", Promise)
], SimulationController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('customerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SimulationController.prototype, "findByCustomer", null);
exports.SimulationController = SimulationController = __decorate([
    (0, common_1.Controller)('simulations'),
    __metadata("design:paramtypes", [create_simulation_use_case_1.CreateSimulationUseCase,
        list_simulations_by_customer_use_case_1.ListSimulationsByCustomerUseCase])
], SimulationController);
//# sourceMappingURL=simulation.controller.js.map