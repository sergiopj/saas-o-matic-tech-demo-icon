import { Entity, Column, PrimaryColumn, Index } from 'typeorm';
import { InvoiceStatus } from '../../../../domain/enums/invoice-status.enum';

@Entity('invoices')
export class InvoiceTypeOrmEntity {
  @PrimaryColumn('varchar', { length: 36 })
  id: string;

  @Index({ unique: true })
  @Column('varchar', { length: 30 })
  invoiceNumber: string;

  @Index()
  @Column('varchar', { length: 36 })
  customerId: string;

  @Column('varchar', { length: 120 })
  customerCompanyName: string;

  @Column('varchar', { length: 20 })
  customerTaxId: string;

  @Column('varchar', { length: 2 })
  customerCountry: string;

  @Column('varchar', { length: 36, nullable: true })
  simulationId: string | null;

  @Column('varchar', { length: 200 })
  concept: string;

  @Column('decimal', { precision: 10, scale: 2 })
  subtotal: number;

  @Column('decimal', { precision: 10, scale: 4 })
  taxRate: number;

  @Column('decimal', { precision: 10, scale: 2 })
  taxAmount: number;

  @Column('decimal', { precision: 10, scale: 2 })
  totalAmount: number;

  @Column('varchar', { length: 3 })
  currency: string;

  @Index()
  @Column('varchar', { length: 20 })
  status: InvoiceStatus;

  @Index()
  @Column('datetime')
  issueDate: Date;

  @Column('datetime')
  dueDate: Date;

  @Column('datetime', { nullable: true })
  paidAt: Date | null;

  @Column('text', { nullable: true })
  notes: string | null;

  @Column('datetime')
  createdAt: Date;

  @Column('datetime')
  updatedAt: Date;
}
