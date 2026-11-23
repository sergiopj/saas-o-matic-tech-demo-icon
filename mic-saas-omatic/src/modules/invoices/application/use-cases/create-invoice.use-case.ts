import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { INVOICE_REPOSITORY_PORT } from '../ports/out/invoice-repository.port';
import type { InvoiceRepositoryPort } from '../ports/out/invoice-repository.port';
import { CUSTOMER_REPOSITORY_PORT } from '../../../customers/application/ports/out/customer-repository.port';
import type { CustomerRepositoryPort } from '../../../customers/application/ports/out/customer-repository.port';
import { Invoice } from '../../domain/entities/invoice.entity';

export interface CreateInvoiceCommand {
  customerId: string;
  simulationId?: string | null;
  concept: string;
  subtotal: number;
  taxRate?: number;
  currency?: string;
  notes?: string | null;
}

@Injectable()
export class CreateInvoiceUseCase {
  constructor(
    @Inject(INVOICE_REPOSITORY_PORT)
    private readonly invoiceRepository: InvoiceRepositoryPort,
    @Inject(CUSTOMER_REPOSITORY_PORT)
    private readonly customerRepository: CustomerRepositoryPort,
  ) {}

  async execute(command: CreateInvoiceCommand): Promise<Invoice> {
    const customer = await this.customerRepository.findById(command.customerId);
    if (!customer) {
      throw new NotFoundException(`Customer with id '${command.customerId}' was not found.`);
    }

    // Default tax rate based on country if not explicitly provided
    let taxRate = command.taxRate;
    if (taxRate === undefined) {
      taxRate = this.resolveDefaultTaxRate(customer.getCountry());
    }

    const invoice = Invoice.create({
      customerId: customer.getId(),
      customerCompanyName: customer.getCompanyName(),
      customerTaxId: customer.getTaxId(),
      customerCountry: customer.getCountry(),
      simulationId: command.simulationId,
      concept: command.concept,
      subtotal: command.subtotal,
      taxRate,
      currency: command.currency ?? 'EUR',
      notes: command.notes,
    });

    return this.invoiceRepository.save(invoice);
  }

  private resolveDefaultTaxRate(country: string): number {
    switch (country.toUpperCase()) {
      case 'ES': return 0.21;
      case 'DE': return 0.19;
      case 'FR': return 0.20;
      case 'IT': return 0.22;
      case 'PT': return 0.23;
      case 'GB': return 0.20;
      case 'CH': return 0.081;
      case 'US': return 0.00;
      default: return 0.21;
    }
  }
}
