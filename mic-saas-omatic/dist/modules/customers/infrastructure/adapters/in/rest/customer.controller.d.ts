import type { Response } from 'express';
import { CreateCustomerUseCase } from '../../../../application/use-cases/create-customer.use-case';
import { ListCustomersUseCase } from '../../../../application/use-cases/list-customers.use-case';
import { GetCustomerDetailUseCase } from '../../../../application/use-cases/get-customer-detail.use-case';
import { UpdateCustomerUseCase } from '../../../../application/use-cases/update-customer.use-case';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerResponseDto } from './dto/customer-response.dto';
import { CustomerLiteResponseDto } from './dto/customer-lite-response.dto';
import { ListCustomersQueryDto } from './dto/list-customers-query.dto';
export declare class CustomerController {
    private readonly createCustomerUseCase;
    private readonly listCustomersUseCase;
    private readonly getCustomerDetailUseCase;
    private readonly updateCustomerUseCase;
    constructor(createCustomerUseCase: CreateCustomerUseCase, listCustomersUseCase: ListCustomersUseCase, getCustomerDetailUseCase: GetCustomerDetailUseCase, updateCustomerUseCase: UpdateCustomerUseCase);
    create(createCustomerDto: CreateCustomerDto): Promise<CustomerResponseDto>;
    list(query: ListCustomersQueryDto, res?: Response): Promise<CustomerResponseDto[] | CustomerLiteResponseDto[]>;
    getById(id: string): Promise<CustomerResponseDto>;
    update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<CustomerResponseDto>;
}
