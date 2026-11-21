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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSimulationDto = void 0;
const class_validator_1 = require("class-validator");
class CreateSimulationDto {
    customerId;
    activeUsers;
    storageGb;
    apiCalls;
}
exports.CreateSimulationDto = CreateSimulationDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'customerId must be a string.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'customerId is required.' }),
    (0, class_validator_1.Matches)(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/, { message: 'customerId must be a valid UUID.' }),
    __metadata("design:type", String)
], CreateSimulationDto.prototype, "customerId", void 0);
__decorate([
    (0, class_validator_1.IsInt)({ message: 'activeUsers must be an integer.' }),
    (0, class_validator_1.Min)(0, { message: 'activeUsers must be greater than or equal to 0.' }),
    __metadata("design:type", Number)
], CreateSimulationDto.prototype, "activeUsers", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: 'storageGb must be a valid number.' }),
    (0, class_validator_1.Min)(0, { message: 'storageGb must be greater than or equal to 0.' }),
    __metadata("design:type", Number)
], CreateSimulationDto.prototype, "storageGb", void 0);
__decorate([
    (0, class_validator_1.IsInt)({ message: 'apiCalls must be an integer.' }),
    (0, class_validator_1.Min)(0, { message: 'apiCalls must be greater than or equal to 0.' }),
    __metadata("design:type", Number)
], CreateSimulationDto.prototype, "apiCalls", void 0);
//# sourceMappingURL=create-simulation.dto.js.map