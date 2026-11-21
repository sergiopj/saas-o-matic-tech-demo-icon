import type { Response } from 'express';
import { CreateInvoiceUseCase } from '../../../../application/use-cases/create-invoice.use-case';
import { ListInvoicesUseCase } from '../../../../application/use-cases/list-invoices.use-case';
import { GetInvoiceDetailUseCase } from '../../../../application/use-cases/get-invoice-detail.use-case';
import { UpdateInvoiceStatusUseCase } from '../../../../application/use-cases/update-invoice-status.use-case';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { ListInvoicesQueryDto } from './dto/list-invoices-query.dto';
import { UpdateInvoiceStatusDto } from './dto/update-invoice-status.dto';
import { InvoiceResponseDto } from './dto/invoice-response.dto';
export declare class InvoiceController {
    private readonly createInvoiceUseCase;
    private readonly listInvoicesUseCase;
    private readonly getInvoiceDetailUseCase;
    private readonly updateInvoiceStatusUseCase;
    constructor(createInvoiceUseCase: CreateInvoiceUseCase, listInvoicesUseCase: ListInvoicesUseCase, getInvoiceDetailUseCase: GetInvoiceDetailUseCase, updateInvoiceStatusUseCase: UpdateInvoiceStatusUseCase);
    create(createInvoiceDto: CreateInvoiceDto): Promise<InvoiceResponseDto>;
    list(query: ListInvoicesQueryDto, res?: Response): Promise<InvoiceResponseDto[]>;
    findById(id: string): Promise<InvoiceResponseDto>;
    updateStatus(id: string, dto: UpdateInvoiceStatusDto): Promise<InvoiceResponseDto>;
}
