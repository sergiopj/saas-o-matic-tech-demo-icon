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
exports.EmailController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const send_email_dto_1 = require("./dto/send-email.dto");
const send_email_use_case_1 = require("../../../../application/use-cases/send-email.use-case");
let EmailController = class EmailController {
    sendEmailUseCase;
    constructor(sendEmailUseCase) {
        this.sendEmailUseCase = sendEmailUseCase;
    }
    async sendEmail(dto) {
        return this.sendEmailUseCase.execute(dto);
    }
};
exports.EmailController = EmailController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Dispatch transactional or commercial email with rich HTML content',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Email successfully processed, sanitized, and dispatched',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Invalid email payload or malformed recipient address',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [send_email_dto_1.SendEmailDto]),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "sendEmail", null);
exports.EmailController = EmailController = __decorate([
    (0, swagger_1.ApiTags)('Emails'),
    (0, common_1.Controller)('emails'),
    __metadata("design:paramtypes", [send_email_use_case_1.SendEmailUseCase])
], EmailController);
//# sourceMappingURL=email.controller.js.map