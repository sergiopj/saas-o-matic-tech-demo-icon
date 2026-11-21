import { Invoice } from '../../../../domain/entities/invoice.entity';
import { InvoiceStatus } from '../../../../domain/enums/invoice-status.enum';

export class InvoiceResponseDto {
  id: string;
  invoiceNumber: string;
  customerId: string;
  customerCompanyName: string;
  customerTaxId: string;
  customerCountry: string;
  simulationId: string | null;
  concept: string;
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  totalAmount: number;
  currency: string;
  status: InvoiceStatus;
  issueDate: string;
  dueDate: string;
  paidAt: string | null;
  notes: string | null;
  createdAt: string;

  static fromDomain(domain: Invoice): InvoiceResponseDto {
    const dto = new InvoiceResponseDto();
    dto.id = domain.getId();
    dto.invoiceNumber = domain.getInvoiceNumber();
    dto.customerId = domain.getCustomerId();
    dto.customerCompanyName = domain.getCustomerCompanyName();
    dto.customerTaxId = domain.getCustomerTaxId();
    dto.customerCountry = domain.getCustomerCountry();
    dto.simulationId = domain.getSimulationId();
    dto.concept = domain.getConcept();
    dto.subtotal = domain.getSubtotal();
    dto.taxRate = domain.getTaxRate();
    dto.taxAmount = domain.getTaxAmount();
    dto.totalAmount = domain.getTotalAmount();
    dto.currency = domain.getCurrency();
    dto.status = domain.getStatus();
    dto.issueDate = domain.getIssueDate().toISOString();
    dto.dueDate = domain.getDueDate().toISOString();
    dto.paidAt = domain.getPaidAt() ? domain.getPaidAt()!.toISOString() : null;
    dto.notes = domain.getNotes();
    dto.createdAt = domain.getCreatedAt().toISOString();
    return dto;
  }
}
