import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceController } from './invoice.controller';
import { CreateInvoiceUseCase } from '../../../../application/use-cases/create-invoice.use-case';
import { ListInvoicesUseCase } from '../../../../application/use-cases/list-invoices.use-case';
import { GetInvoiceDetailUseCase } from '../../../../application/use-cases/get-invoice-detail.use-case';
import { UpdateInvoiceStatusUseCase } from '../../../../application/use-cases/update-invoice-status.use-case';
import { GenerateInvoicePdfUseCase } from '../../../../application/use-cases/generate-invoice-pdf.use-case';
import { Invoice } from '../../../../domain/entities/invoice.entity';
import { InvoiceStatus } from '../../../../domain/enums/invoice-status.enum';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { ListInvoicesQueryDto } from './dto/list-invoices-query.dto';
import { UpdateInvoiceStatusDto } from './dto/update-invoice-status.dto';

describe('InvoiceController (Primary Adapter)', () => {
  let controller: InvoiceController;
  let createInvoiceUseCase: jest.Mocked<CreateInvoiceUseCase>;
  let listInvoicesUseCase: jest.Mocked<ListInvoicesUseCase>;
  let getInvoiceDetailUseCase: jest.Mocked<GetInvoiceDetailUseCase>;
  let updateInvoiceStatusUseCase: jest.Mocked<UpdateInvoiceStatusUseCase>;
  let generateInvoicePdfUseCase: jest.Mocked<GenerateInvoicePdfUseCase>;

  const mockInvoice = Invoice.reconstitute({
    id: 'inv-123',
    invoiceNumber: 'INV-2026-00001',
    customerId: 'cust-456',
    customerCompanyName: 'Acme Corp',
    customerTaxId: 'B12345674',
    customerCountry: 'ES',
    simulationId: 'sim-789',
    concept: 'Cloud Infrastructure Plan',
    subtotal: 100.0,
    taxRate: 0.21,
    taxAmount: 21.0,
    totalAmount: 121.0,
    currency: 'EUR',
    status: InvoiceStatus.ISSUED,
    issueDate: new Date('2026-03-01T10:00:00Z'),
    dueDate: new Date('2026-03-31T10:00:00Z'),
    paidAt: null,
    notes: 'Q1 Billing',
    createdAt: new Date('2026-03-01T10:00:00Z'),
    updatedAt: new Date('2026-03-01T10:00:00Z'),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvoiceController],
      providers: [
        {
          provide: CreateInvoiceUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(mockInvoice),
          },
        },
        {
          provide: ListInvoicesUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue({
              items: [mockInvoice],
              total: 1,
            }),
          },
        },
        {
          provide: GetInvoiceDetailUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(mockInvoice),
          },
        },
        {
          provide: UpdateInvoiceStatusUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(mockInvoice),
          },
        },
        {
          provide: GenerateInvoicePdfUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue({
              buffer: Buffer.from('%PDF-1.4 mock content'),
              filename: 'INV-2026-00001.pdf',
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<InvoiceController>(InvoiceController);
    createInvoiceUseCase = module.get(CreateInvoiceUseCase);
    listInvoicesUseCase = module.get(ListInvoicesUseCase);
    getInvoiceDetailUseCase = module.get(GetInvoiceDetailUseCase);
    updateInvoiceStatusUseCase = module.get(UpdateInvoiceStatusUseCase);
    generateInvoicePdfUseCase = module.get(GenerateInvoicePdfUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should delegate creation to CreateInvoiceUseCase and return mapped DTO', async () => {
      const dto: CreateInvoiceDto = {
        customerId: 'cust-456',
        concept: 'Cloud Infrastructure Plan',
        subtotal: 100.0,
        taxRate: 0.21,
      };

      const result = await controller.create(dto);

      expect(createInvoiceUseCase.execute).toHaveBeenCalledWith(dto);
      expect(result.id).toBe('inv-123');
      expect(result.invoiceNumber).toBe('INV-2026-00001');
      expect(result.totalAmount).toBe(121.0);
    });
  });

  describe('list', () => {
    it('should list invoices and set response headers when response object is provided', async () => {
      const query: ListInvoicesQueryDto = {
        page: 1,
        limit: 10,
        status: InvoiceStatus.ISSUED,
      };

      const setHeaderMock = jest.fn();
      const mockRes = { setHeader: setHeaderMock } as any;

      const result = await controller.list(query, mockRes);

      expect(listInvoicesUseCase.execute).toHaveBeenCalledWith({
        customerId: undefined,
        status: InvoiceStatus.ISSUED,
        page: 1,
        limit: 10,
        sortBy: undefined,
        sortOrder: undefined,
      });

      expect(setHeaderMock).toHaveBeenCalledWith('X-Total-Count', '1');
      expect(setHeaderMock).toHaveBeenCalledWith('X-Page', '1');
      expect(setHeaderMock).toHaveBeenCalledWith('X-Limit', '10');
      expect(setHeaderMock).toHaveBeenCalledWith('X-Total-Pages', '1');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('inv-123');
    });

    it('should list invoices correctly without res object', async () => {
      const query: ListInvoicesQueryDto = {};
      const result = await controller.list(query);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('inv-123');
    });
  });

  describe('findById', () => {
    it('should return invoice detail mapped DTO', async () => {
      const result = await controller.findById('inv-123');
      expect(getInvoiceDetailUseCase.execute).toHaveBeenCalledWith('inv-123');
      expect(result.id).toBe('inv-123');
      expect(result.concept).toBe('Cloud Infrastructure Plan');
    });
  });

  describe('updateStatus', () => {
    it('should delegate status update and return updated DTO', async () => {
      const dto: UpdateInvoiceStatusDto = { status: InvoiceStatus.PAID };
      const result = await controller.updateStatus('inv-123', dto);
      expect(updateInvoiceStatusUseCase.execute).toHaveBeenCalledWith('inv-123', InvoiceStatus.PAID);
      expect(result.id).toBe('inv-123');
    });
  });

  describe('downloadPdf', () => {
    it('should delegate to GenerateInvoicePdfUseCase and set attachment headers', async () => {
      const setHeaderMock = jest.fn();
      const endMock = jest.fn();
      const mockRes = {
        setHeader: setHeaderMock,
        end: endMock,
      } as any;

      await controller.downloadPdf('inv-123', mockRes);

      expect(generateInvoicePdfUseCase.execute).toHaveBeenCalledWith('inv-123');
      expect(setHeaderMock).toHaveBeenCalledWith('Content-Type', 'application/pdf');
      expect(setHeaderMock).toHaveBeenCalledWith('Content-Disposition', 'attachment; filename="INV-2026-00001.pdf"');
      expect(setHeaderMock).toHaveBeenCalledWith('Content-Length', expect.any(String));
      expect(endMock).toHaveBeenCalledWith(expect.any(Buffer));
    });
  });
});
