import { InvoiceResponseDto } from './invoice-response.dto';
import { Invoice } from '../../../../../domain/entities/invoice.entity';
import { InvoiceStatus } from '../../../../../domain/enums/invoice-status.enum';

describe('InvoiceResponseDto', () => {
  it('should map domain Invoice to InvoiceResponseDto correctly', () => {
    const invoice = Invoice.create({
      customerId: 'cust-10',
      customerCompanyName: 'Omatic Telecom S.L.',
      customerTaxId: 'B12345674',
      customerCountry: 'ES',
      concept: 'Annual Subscription',
      subtotal: 1000,
      taxRate: 0.21,
    });

    const dto = InvoiceResponseDto.fromDomain(invoice);
    expect(dto.id).toBe(invoice.getId());
    expect(dto.invoiceNumber).toBe(invoice.getInvoiceNumber());
    expect(dto.subtotal).toBe(1000);
    expect(dto.totalAmount).toBe(1210);
    expect(dto.status).toBe(InvoiceStatus.ISSUED);
  });
});
