import { validate } from 'class-validator';
import { CreateInvoiceDto } from './create-invoice.dto';

describe('CreateInvoiceDto', () => {
  it('should validate valid CreateInvoiceDto', async () => {
    const dto = new CreateInvoiceDto();
    dto.customerId = '45a8f147-2aca-4238-9b52-e91a6a343678';
    dto.concept = 'SaaS Subscription Tier 2';
    dto.subtotal = 420;
    dto.taxRate = 0.21;

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should reject invalid customerId UUID and negative subtotal', async () => {
    const dto = new CreateInvoiceDto();
    dto.customerId = 'invalid-uuid';
    dto.concept = '';
    dto.subtotal = -10;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});
