import { validate } from 'class-validator';
import { ListInvoicesQueryDto } from './list-invoices-query.dto';
import { InvoiceStatus } from '../../../../domain/enums/invoice-status.enum';

describe('ListInvoicesQueryDto', () => {
  it('should validate empty or valid query parameters', async () => {
    const dto = new ListInvoicesQueryDto();
    dto.status = InvoiceStatus.PAID;
    dto.page = 1;
    dto.limit = 10;

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail validation on invalid status enum', async () => {
    const dto = new ListInvoicesQueryDto();
    (dto as any).status = 'INVALID_STATUS';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});
