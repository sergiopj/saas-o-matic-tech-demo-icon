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
exports.InvoiceController = void 0;
const common_1 = require("@nestjs/common");
const create_invoice_use_case_1 = require("../../../../application/use-cases/create-invoice.use-case");
const list_invoices_use_case_1 = require("../../../../application/use-cases/list-invoices.use-case");
const get_invoice_detail_use_case_1 = require("../../../../application/use-cases/get-invoice-detail.use-case");
const update_invoice_status_use_case_1 = require("../../../../application/use-cases/update-invoice-status.use-case");
const create_invoice_dto_1 = require("./dto/create-invoice.dto");
const list_invoices_query_dto_1 = require("./dto/list-invoices-query.dto");
const update_invoice_status_dto_1 = require("./dto/update-invoice-status.dto");
const invoice_response_dto_1 = require("./dto/invoice-response.dto");
let InvoiceController = class InvoiceController {
    createInvoiceUseCase;
    listInvoicesUseCase;
    getInvoiceDetailUseCase;
    updateInvoiceStatusUseCase;
    constructor(createInvoiceUseCase, listInvoicesUseCase, getInvoiceDetailUseCase, updateInvoiceStatusUseCase) {
        this.createInvoiceUseCase = createInvoiceUseCase;
        this.listInvoicesUseCase = listInvoicesUseCase;
        this.getInvoiceDetailUseCase = getInvoiceDetailUseCase;
        this.updateInvoiceStatusUseCase = updateInvoiceStatusUseCase;
    }
    async create(createInvoiceDto) {
        const invoice = await this.createInvoiceUseCase.execute(createInvoiceDto);
        return invoice_response_dto_1.InvoiceResponseDto.fromDomain(invoice);
    }
    async list(query, res) {
        const { items, total } = await this.listInvoicesUseCase.execute({
            customerId: query.customerId,
            status: query.status,
            page: query.page,
            limit: query.limit,
            sortBy: query.sortBy,
            sortOrder: query.sortOrder,
        });
        if (res) {
            res.setHeader('X-Total-Count', total.toString());
            if (query.page)
                res.setHeader('X-Page', query.page.toString());
            if (query.limit) {
                res.setHeader('X-Limit', query.limit.toString());
                res.setHeader('X-Total-Pages', Math.max(1, Math.ceil(total / query.limit)).toString());
            }
        }
        return items.map((invoice) => invoice_response_dto_1.InvoiceResponseDto.fromDomain(invoice));
    }
    async findById(id) {
        const invoice = await this.getInvoiceDetailUseCase.execute(id);
        return invoice_response_dto_1.InvoiceResponseDto.fromDomain(invoice);
    }
    async updateStatus(id, dto) {
        const invoice = await this.updateInvoiceStatusUseCase.execute(id, dto.status);
        return invoice_response_dto_1.InvoiceResponseDto.fromDomain(invoice);
    }
};
exports.InvoiceController = InvoiceController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_invoice_dto_1.CreateInvoiceDto]),
    __metadata("design:returntype", Promise)
], InvoiceController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [list_invoices_query_dto_1.ListInvoicesQueryDto, Object]),
    __metadata("design:returntype", Promise)
], InvoiceController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InvoiceController.prototype, "findById", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_invoice_status_dto_1.UpdateInvoiceStatusDto]),
    __metadata("design:returntype", Promise)
], InvoiceController.prototype, "updateStatus", null);
exports.InvoiceController = InvoiceController = __decorate([
    (0, common_1.Controller)('invoices'),
    __metadata("design:paramtypes", [create_invoice_use_case_1.CreateInvoiceUseCase,
        list_invoices_use_case_1.ListInvoicesUseCase,
        get_invoice_detail_use_case_1.GetInvoiceDetailUseCase,
        update_invoice_status_use_case_1.UpdateInvoiceStatusUseCase])
], InvoiceController);
//# sourceMappingURL=invoice.controller.js.map