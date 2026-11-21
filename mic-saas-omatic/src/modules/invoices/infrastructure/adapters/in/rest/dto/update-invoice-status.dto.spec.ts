import { validate } from 'class-validator';
import { UpdateInvoiceStatusDto } from './update-invoice-status.dto';
import { InvoiceStatus } from '../../../../domain/enums/invoice-status.enum';

describe('UpdateInvoiceStatusDto', () => {
  it('should validate correct status', async () => {
    const dto = new UpdateInvoiceStatusDto();
    dto.status = InvoiceStatus.PAID;

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should reject invalid status', async () => {
    const dto = new UpdateInvoiceStatusDto();
    (dto as any).status = 'NOT_A_STATUS';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});
