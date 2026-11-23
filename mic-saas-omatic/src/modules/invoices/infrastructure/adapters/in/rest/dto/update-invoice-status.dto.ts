import { IsEnum, IsNotEmpty } from 'class-validator';
import { InvoiceStatus } from '../../../../../domain/enums/invoice-status.enum';

export class UpdateInvoiceStatusDto {
  @IsEnum(InvoiceStatus, {
    message: 'status must be a valid InvoiceStatus (DRAFT, ISSUED, PAID, CANCELLED)',
  })
  @IsNotEmpty({ message: 'status is required' })
  status: InvoiceStatus;
}
