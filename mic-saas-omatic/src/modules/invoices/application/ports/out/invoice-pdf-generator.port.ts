import type { Invoice } from '../../../domain/entities/invoice.entity';

export const INVOICE_PDF_GENERATOR_PORT = Symbol('INVOICE_PDF_GENERATOR_PORT');

export interface InvoicePdfCustomerData {
  companyName: string;
  taxId: string;
  email: string;
  country: string;
}

export interface InvoicePdfGeneratorPort {
  generate(invoice: Invoice, customer?: InvoicePdfCustomerData): Promise<Buffer>;
}
