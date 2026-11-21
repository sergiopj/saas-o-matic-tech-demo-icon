import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { CreateInvoiceUseCase } from '../../../../application/use-cases/create-invoice.use-case';
import { ListInvoicesUseCase } from '../../../../application/use-cases/list-invoices.use-case';
import { GetInvoiceDetailUseCase } from '../../../../application/use-cases/get-invoice-detail.use-case';
import { UpdateInvoiceStatusUseCase } from '../../../../application/use-cases/update-invoice-status.use-case';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { ListInvoicesQueryDto } from './dto/list-invoices-query.dto';
import { UpdateInvoiceStatusDto } from './dto/update-invoice-status.dto';
import { InvoiceResponseDto } from './dto/invoice-response.dto';

@Controller('invoices')
export class InvoiceController {
  constructor(
    private readonly createInvoiceUseCase: CreateInvoiceUseCase,
    private readonly listInvoicesUseCase: ListInvoicesUseCase,
    private readonly getInvoiceDetailUseCase: GetInvoiceDetailUseCase,
    private readonly updateInvoiceStatusUseCase: UpdateInvoiceStatusUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createInvoiceDto: CreateInvoiceDto,
  ): Promise<InvoiceResponseDto> {
    const invoice = await this.createInvoiceUseCase.execute(createInvoiceDto);
    return InvoiceResponseDto.fromDomain(invoice);
  }

  @Get()
  async list(
    @Query() query: ListInvoicesQueryDto,
    @Res({ passthrough: true }) res?: Response,
  ): Promise<InvoiceResponseDto[]> {
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
      if (query.page) res.setHeader('X-Page', query.page.toString());
      if (query.limit) {
        res.setHeader('X-Limit', query.limit.toString());
        res.setHeader(
          'X-Total-Pages',
          Math.max(1, Math.ceil(total / query.limit)).toString(),
        );
      }
    }

    return items.map((invoice) => InvoiceResponseDto.fromDomain(invoice));
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<InvoiceResponseDto> {
    const invoice = await this.getInvoiceDetailUseCase.execute(id);
    return InvoiceResponseDto.fromDomain(invoice);
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateInvoiceStatusDto,
  ): Promise<InvoiceResponseDto> {
    const invoice = await this.updateInvoiceStatusUseCase.execute(id, dto.status);
    return InvoiceResponseDto.fromDomain(invoice);
  }
}
