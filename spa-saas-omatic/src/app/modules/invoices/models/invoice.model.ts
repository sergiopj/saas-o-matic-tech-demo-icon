export type InvoiceStatus = 'DRAFT' | 'ISSUED' | 'PAID' | 'CANCELLED';

export interface Invoice {
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
}

export interface InvoiceCreate {
  customerId: string;
  simulationId?: string;
  concept: string;
  subtotal: number;
  taxRate?: number;
  currency?: string;
  notes?: string;
}

export interface InvoiceListResponse<T = Invoice> {
  items: T[];
  total: number;
}

export type InvoiceSortBy =
  | 'invoiceNumber'
  | 'totalAmount'
  | 'status'
  | 'issueDate'
  | 'dueDate'
  | 'createdAt';
