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
exports.CustomerController = void 0;
const common_1 = require("@nestjs/common");
const create_customer_use_case_1 = require("../../../../application/use-cases/create-customer.use-case");
const list_customers_use_case_1 = require("../../../../application/use-cases/list-customers.use-case");
const get_customer_detail_use_case_1 = require("../../../../application/use-cases/get-customer-detail.use-case");
const update_customer_use_case_1 = require("../../../../application/use-cases/update-customer.use-case");
const create_customer_dto_1 = require("./dto/create-customer.dto");
const update_customer_dto_1 = require("./dto/update-customer.dto");
const customer_response_dto_1 = require("./dto/customer-response.dto");
const customer_lite_response_dto_1 = require("./dto/customer-lite-response.dto");
const list_customers_query_dto_1 = require("./dto/list-customers-query.dto");
let CustomerController = class CustomerController {
    createCustomerUseCase;
    listCustomersUseCase;
    getCustomerDetailUseCase;
    updateCustomerUseCase;
    constructor(createCustomerUseCase, listCustomersUseCase, getCustomerDetailUseCase, updateCustomerUseCase) {
        this.createCustomerUseCase = createCustomerUseCase;
        this.listCustomersUseCase = listCustomersUseCase;
        this.getCustomerDetailUseCase = getCustomerDetailUseCase;
        this.updateCustomerUseCase = updateCustomerUseCase;
    }
    async create(createCustomerDto) {
        const customer = await this.createCustomerUseCase.execute(createCustomerDto);
        return customer_response_dto_1.CustomerResponseDto.fromDomain(customer);
    }
    async list(query, res) {
        const { items, total } = await this.listCustomersUseCase.execute({
            term: query.search,
            country: query.country,
            page: query.page,
            limit: query.limit,
            sortBy: query.sortBy,
            sortOrder: query.order,
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
        if (query.fields === 'lite') {
            return items.map((item) => customer_lite_response_dto_1.CustomerLiteResponseDto.fromDomain(item));
        }
        return items.map((item) => customer_response_dto_1.CustomerResponseDto.fromDomain(item));
    }
    async getById(id) {
        const customer = await this.getCustomerDetailUseCase.execute(id);
        return customer_response_dto_1.CustomerResponseDto.fromDomain(customer);
    }
    async update(id, updateCustomerDto) {
        const customer = await this.updateCustomerUseCase.execute(id, updateCustomerDto);
        return customer_response_dto_1.CustomerResponseDto.fromDomain(customer);
    }
};
exports.CustomerController = CustomerController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_customer_dto_1.CreateCustomerDto]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [list_customers_query_dto_1.ListCustomersQueryDto, Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "getById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_customer_dto_1.UpdateCustomerDto]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "update", null);
exports.CustomerController = CustomerController = __decorate([
    (0, common_1.Controller)('customers'),
    __metadata("design:paramtypes", [create_customer_use_case_1.CreateCustomerUseCase,
        list_customers_use_case_1.ListCustomersUseCase,
        get_customer_detail_use_case_1.GetCustomerDetailUseCase,
        update_customer_use_case_1.UpdateCustomerUseCase])
], CustomerController);
//# sourceMappingURL=customer.controller.js.map