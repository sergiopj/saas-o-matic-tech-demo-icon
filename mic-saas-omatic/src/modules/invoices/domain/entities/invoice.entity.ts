import { randomUUID } from 'node:crypto';
import { InvoiceStatus } from '../enums/invoice-status.enum';
import { DomainError } from '../../../../shared/domain/domain.exception';

export interface InvoiceProperties {
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
  issueDate: Date;
  dueDate: Date;
  paidAt: Date | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateInvoicePayload {
  id?: string;
  invoiceNumber?: string;
  customerId: string;
  customerCompanyName: string;
  customerTaxId: string;
  customerCountry: string;
  simulationId?: string | null;
  concept: string;
  subtotal: number;
  taxRate?: number;
  currency?: string;
  issueDate?: Date;
  dueDate?: Date;
  notes?: string | null;
}

export class Invoice {
  private readonly id: string;
  private readonly invoiceNumber: string;
  private readonly customerId: string;
  private readonly customerCompanyName: string;
  private readonly customerTaxId: string;
  private readonly customerCountry: string;
  private readonly simulationId: string | null;
  private readonly concept: string;
  private readonly subtotal: number;
  private readonly taxRate: number;
  private readonly taxAmount: number;
  private readonly totalAmount: number;
  private readonly currency: string;
  private status: InvoiceStatus;
  private readonly issueDate: Date;
  private readonly dueDate: Date;
  private paidAt: Date | null;
  private readonly notes: string | null;
  private readonly createdAt: Date;
  private updatedAt: Date;

  private constructor(props: InvoiceProperties) {
    this.id = props.id;
    this.invoiceNumber = props.invoiceNumber;
    this.customerId = props.customerId;
    this.customerCompanyName = props.customerCompanyName;
    this.customerTaxId = props.customerTaxId;
    this.customerCountry = props.customerCountry;
    this.simulationId = props.simulationId;
    this.concept = props.concept;
    this.subtotal = props.subtotal;
    this.taxRate = props.taxRate;
    this.taxAmount = props.taxAmount;
    this.totalAmount = props.totalAmount;
    this.currency = props.currency;
    this.status = props.status;
    this.issueDate = props.issueDate;
    this.dueDate = props.dueDate;
    this.paidAt = props.paidAt;
    this.notes = props.notes;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static create(payload: CreateInvoicePayload): Invoice {
    Invoice.validateConcept(payload.concept);
    Invoice.validateSubtotal(payload.subtotal);

    const subtotal = Math.round(payload.subtotal * 100) / 100;
    const taxRate = payload.taxRate !== undefined ? payload.taxRate : 0.21;
    const taxAmount = Math.round(subtotal * taxRate * 100) / 100;
    const totalAmount = Math.round((subtotal + taxAmount) * 100) / 100;

    const now = new Date();
    const issueDate = payload.issueDate ?? now;
    const dueDate = payload.dueDate ?? new Date(issueDate.getTime() + 30 * 24 * 60 * 60 * 1000); // Net 30 days
    const invoiceNumber = payload.invoiceNumber ?? Invoice.generateInvoiceNumber(now);

    return new Invoice({
      id: payload.id ?? randomUUID(),
      invoiceNumber,
      customerId: payload.customerId,
      customerCompanyName: payload.customerCompanyName,
      customerTaxId: payload.customerTaxId,
      customerCountry: payload.customerCountry,
      simulationId: payload.simulationId ?? null,
      concept: payload.concept.trim(),
      subtotal,
      taxRate,
      taxAmount,
      totalAmount,
      currency: payload.currency ?? 'EUR',
      status: InvoiceStatus.ISSUED,
      issueDate,
      dueDate,
      paidAt: null,
      notes: payload.notes ?? null,
      createdAt: now,
      updatedAt: now,
    });
  }

  static reconstitute(props: InvoiceProperties): Invoice {
    return new Invoice(props);
  }

  markAsPaid(paidAt: Date = new Date()): void {
    if (this.status === InvoiceStatus.CANCELLED) {
      throw new DomainError('Cannot mark cancelled invoice as paid');
    }
    this.status = InvoiceStatus.PAID;
    this.paidAt = paidAt;
    this.updatedAt = new Date();
  }

  cancel(): void {
    if (this.status === InvoiceStatus.PAID) {
      throw new DomainError('Cannot cancel an already paid invoice');
    }
    this.status = InvoiceStatus.CANCELLED;
    this.updatedAt = new Date();
  }

  // Getters
  getId(): string { return this.id; }
  getInvoiceNumber(): string { return this.invoiceNumber; }
  getCustomerId(): string { return this.customerId; }
  getCustomerCompanyName(): string { return this.customerCompanyName; }
  getCustomerTaxId(): string { return this.customerTaxId; }
  getCustomerCountry(): string { return this.customerCountry; }
  getSimulationId(): string | null { return this.simulationId; }
  getConcept(): string { return this.concept; }
  getSubtotal(): number { return this.subtotal; }
  getTaxRate(): number { return this.taxRate; }
  getTaxAmount(): number { return this.taxAmount; }
  getTotalAmount(): number { return this.totalAmount; }
  getCurrency(): string { return this.currency; }
  getStatus(): InvoiceStatus { return this.status; }
  getIssueDate(): Date { return this.issueDate; }
  getDueDate(): Date { return this.dueDate; }
  getPaidAt(): Date | null { return this.paidAt; }
  getNotes(): string | null { return this.notes; }
  getCreatedAt(): Date { return this.createdAt; }
  getUpdatedAt(): Date { return this.updatedAt; }

  // Private static helpers
  private static validateConcept(concept: string): void {
    if (!concept || concept.trim().length < 3) {
      throw new DomainError('Invoice concept must contain at least 3 characters');
    }
  }

  private static validateSubtotal(subtotal: number): void {
    if (subtotal === undefined || subtotal === null || Number.isNaN(subtotal) || subtotal < 0) {
      throw new DomainError('Invoice subtotal must be a non-negative number');
    }
  }

  private static generateInvoiceNumber(date: Date): string {
    const year = date.getFullYear();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    return `INV-${year}-${randomSuffix}`;
  }
}
