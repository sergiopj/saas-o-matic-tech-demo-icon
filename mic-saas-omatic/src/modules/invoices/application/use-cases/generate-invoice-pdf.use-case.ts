import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  INVOICE_REPOSITORY_PORT,
  type InvoiceRepositoryPort,
} from '../ports/out/invoice-repository.port';
import {
  CUSTOMER_REPOSITORY_PORT,
  type CustomerRepositoryPort,
} from '../../../customers/application/ports/out/customer-repository.port';
import {
  INVOICE_PDF_GENERATOR_PORT,
  type InvoicePdfGeneratorPort,
  type InvoicePdfCustomerData,
} from '../ports/out/invoice-pdf-generator.port';

@Injectable()
export class GenerateInvoicePdfUseCase {
  constructor(
    @Inject(INVOICE_REPOSITORY_PORT)
    private readonly invoiceRepository: InvoiceRepositoryPort,
    @Inject(CUSTOMER_REPOSITORY_PORT)
    private readonly customerRepository: CustomerRepositoryPort,
    @Inject(INVOICE_PDF_GENERATOR_PORT)
    private readonly invoicePdfGenerator: InvoicePdfGeneratorPort,
  ) {}

  async execute(invoiceId: string): Promise<{ buffer: Buffer; filename: string }> {
    const invoice = await this.invoiceRepository.findById(invoiceId);
    if (!invoice) {
      throw new NotFoundException(`Invoice with ID '${invoiceId}' was not found`);
    }

    let customerData: InvoicePdfCustomerData | undefined;
    try {
      const customer = await this.customerRepository.findById(invoice.getCustomerId());
      if (customer) {
        customerData = {
          companyName: customer.getCompanyName(),
          taxId: customer.getTaxId(),
          email: customer.getEmail(),
          country: customer.getCountry(),
        };
      }
    } catch {
      // Fallback if customer lookup is not available
    }

    if (!customerData) {
      customerData = {
        companyName: invoice.getCustomerCompanyName(),
        taxId: invoice.getCustomerTaxId(),
        email: 'billing@client.com',
        country: invoice.getCustomerCountry(),
      };
    }

    const buffer = await this.invoicePdfGenerator.generate(invoice, customerData);
    const filename = `${invoice.getInvoiceNumber()}.pdf`;

    return { buffer, filename };
  }
}
