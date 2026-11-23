import 'reflect-metadata';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
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

  it('should validate when transformed from plain object with numeric string subtotal', async () => {
    const plain = {
      customerId: '3a1290bb-821b-4f01-9a90-7d98c2134011',
      simulationId: 'f88109fe-0425-4c10-2399-0530683ec278',
      concept: 'Banco Santander S.A. - Suscripción (200 usuarios)',
      subtotal: '117000',
      taxRate: '0.21',
      notes: '',
    };
    const dto = plainToInstance(CreateInvoiceDto, plain);
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
    expect(dto.subtotal).toBe(117000);
    expect(dto.taxRate).toBe(0.21);
    expect(dto.notes).toBeUndefined();
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
