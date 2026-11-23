import { Injectable } from '@nestjs/common';
import PDFDocument from 'pdfkit';
import type { Invoice } from '../../../../domain/entities/invoice.entity';
import type {
  InvoicePdfCustomerData,
  InvoicePdfGeneratorPort,
} from '../../../../application/ports/out/invoice-pdf-generator.port';

@Injectable()
export class PdfkitInvoicePdfGeneratorAdapter implements InvoicePdfGeneratorPort {
  async generate(invoice: Invoice, customer?: InvoicePdfCustomerData): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
      try {
        const doc = new PDFDocument({
          size: 'A4',
          margin: 48,
          info: {
            Title: `Invoice ${invoice.getInvoiceNumber()}`,
            Author: 'SaaS-O-Matic',
            Subject: invoice.getConcept(),
          },
        });

        const chunks: Buffer[] = [];
        doc.on('data', (chunk: Buffer) => chunks.push(chunk));
        doc.on('end', () => resolve(Buffer.concat(chunks)));
        doc.on('error', (err) => reject(err));

        // Header Accent Stripe
        doc.rect(0, 0, doc.page.width, 8).fill('#1061e2');

        // Brand & Company Info
        doc.fillColor('#1061e2').fontSize(22).font('Helvetica-Bold').text('SaaS-O-Matic', 48, 40);
        doc.fillColor('#64748b').fontSize(9).font('Helvetica').text('Dynamic Billing & Subscription Optimizer', 48, 66);

        // Issuer Details (Right Side)
        const issuerRight = doc.page.width - 48;
        doc.fillColor('#0f172a').fontSize(10).font('Helvetica-Bold').text('SaaS-O-Matic Tech S.L.', 300, 40, { align: 'right', width: issuerRight - 300 });
        doc.fillColor('#64748b').fontSize(8.5).font('Helvetica')
          .text('NIF/CIF: B-87654321', 300, 54, { align: 'right', width: issuerRight - 300 })
          .text('Calle Gran Vía 28, 28013 Madrid (España)', 300, 66, { align: 'right', width: issuerRight - 300 })
          .text('billing@saasomatic.io | https://saas-o-matic.io', 300, 78, { align: 'right', width: issuerRight - 300 });

        // Divider
        doc.strokeColor('#e2e8f0').lineWidth(1).moveTo(48, 100).lineTo(issuerRight, 100).stroke();

        // Invoice Title & Status Badge
        doc.fillColor('#0f172a').fontSize(16).font('Helvetica-Bold').text('FACTURA / INVOICE', 48, 115);
        doc.fillColor('#1061e2').fontSize(12).font('Helvetica-Bold').text(invoice.getInvoiceNumber(), 48, 136);

        // Status pill
        // cspell:ignore CANCELADA EMITIDA
        let statusLabel: string;
        let statusColor: string;
        switch (invoice.getStatus()) {
          case 'PAID':
            statusLabel = 'PAGADA / PAID';
            statusColor = '#16a34a';
            break;
          case 'CANCELLED':
            statusLabel = 'CANCELADA / CANCELLED';
            statusColor = '#dc2626';
            break;
          default:
            statusLabel = 'EMITIDA / ISSUED';
            statusColor = '#2563eb';
        }
        doc.roundedRect(doc.page.width - 150, 118, 102, 22, 4).fill(statusColor);
        doc.fillColor('#ffffff').fontSize(8.5).font('Helvetica-Bold').text(statusLabel, doc.page.width - 150, 124, { width: 102, align: 'center' });

        // Dates Grid
        const issueDateStr = invoice.getIssueDate() instanceof Date ? invoice.getIssueDate().toISOString().split('T')[0] : String(invoice.getIssueDate()).slice(0, 10);
        const dueDateStr = invoice.getDueDate() instanceof Date ? invoice.getDueDate().toISOString().split('T')[0] : String(invoice.getDueDate()).slice(0, 10);

        doc.fillColor('#64748b').fontSize(8).font('Helvetica-Bold').text('FECHA DE EMISIÓN', 48, 160);
        doc.fillColor('#0f172a').fontSize(9.5).font('Helvetica').text(issueDateStr, 48, 172);

        doc.fillColor('#64748b').fontSize(8).font('Helvetica-Bold').text('FECHA DE VENCIMIENTO', 180, 160);
        doc.fillColor('#0f172a').fontSize(9.5).font('Helvetica').text(dueDateStr, 180, 172);

        // Customer (Bill To) Box
        const billToTop = 202;
        doc.roundedRect(48, billToTop, doc.page.width - 96, 75, 4).fillAndStroke('#f8fafc', '#e2e8f0');

        doc.fillColor('#1061e2').fontSize(9).font('Helvetica-Bold').text('DATOS FISCALES DEL CLIENTE (BILL TO)', 60, billToTop + 10);
        doc.fillColor('#0f172a').fontSize(11).font('Helvetica-Bold').text(customer?.companyName ?? invoice.getCustomerCompanyName(), 60, billToTop + 24);
        
        doc.fillColor('#475569').fontSize(8.5).font('Helvetica')
          .text(`NIF / CIF / Tax ID: ${customer?.taxId ?? invoice.getCustomerTaxId()}`, 60, billToTop + 40)
          .text(`País / Country: ${customer?.country ?? invoice.getCustomerCountry()}`, 60, billToTop + 54);

        if (customer?.email) {
          doc.fillColor('#475569').fontSize(8.5).font('Helvetica')
            .text(`Email de Contacto: ${customer.email}`, 300, billToTop + 40);
        }

        // Table Header
        const tableTop = 295;
        doc.rect(48, tableTop, doc.page.width - 96, 24).fill('#1061e2');

        doc.fillColor('#ffffff').fontSize(8.5).font('Helvetica-Bold')
          .text('CONCEPTO / DESCRIPCIÓN', 58, tableTop + 7, { width: 220 })
          .text('BASE IMPONIBLE', 285, tableTop + 7, { width: 80, align: 'right' })
          .text('% IVA', 375, tableTop + 7, { width: 50, align: 'right' })
          .text('CUOTA IVA', 435, tableTop + 7, { width: 50, align: 'right' })
          .text('TOTAL', 495, tableTop + 7, { width: doc.page.width - 48 - 495 - 10, align: 'right' });

        // Table Item Row
        const rowTop = tableTop + 24;
        doc.rect(48, rowTop, doc.page.width - 96, 32).fillAndStroke('#ffffff', '#e2e8f0');

        const formatCurrency = (val: number) => `${val.toFixed(2)} €`;
        const taxRatePct = `${(invoice.getTaxRate() * 100).toFixed(0)}%`;

        doc.fillColor('#0f172a').fontSize(9).font('Helvetica-Bold')
          .text(invoice.getConcept(), 58, rowTop + 8, { width: 220, ellipsis: true });
        if (invoice.getNotes()) {
          doc.fillColor('#64748b').fontSize(7.5).font('Helvetica')
            .text(invoice.getNotes()!, 58, rowTop + 20, { width: 220, ellipsis: true });
        }

        doc.fillColor('#0f172a').fontSize(9).font('Helvetica')
          .text(formatCurrency(invoice.getSubtotal()), 285, rowTop + 10, { width: 80, align: 'right' })
          .text(taxRatePct, 375, rowTop + 10, { width: 50, align: 'right' })
          .text(formatCurrency(invoice.getTaxAmount()), 435, rowTop + 10, { width: 50, align: 'right' });

        doc.fillColor('#1061e2').fontSize(9.5).font('Helvetica-Bold')
          .text(formatCurrency(invoice.getTotalAmount()), 495, rowTop + 10, { width: doc.page.width - 48 - 495 - 10, align: 'right' });

        // Totals Box (Right Side)
        const totalsTop = rowTop + 50;
        const totalsLeft = doc.page.width - 48 - 220;

        doc.rect(totalsLeft, totalsTop, 220, 85).fillAndStroke('#f8fafc', '#e2e8f0');

        doc.fillColor('#64748b').fontSize(8.5).font('Helvetica').text('Subtotal (Base Imponible):', totalsLeft + 12, totalsTop + 12);
        doc.fillColor('#0f172a').fontSize(8.5).font('Helvetica-Bold').text(formatCurrency(invoice.getSubtotal()), totalsLeft + 110, totalsTop + 12, { width: 98, align: 'right' });

        doc.fillColor('#64748b').fontSize(8.5).font('Helvetica').text(`Impuestos / VAT (${taxRatePct}):`, totalsLeft + 12, totalsTop + 28);
        doc.fillColor('#0f172a').fontSize(8.5).font('Helvetica-Bold').text(formatCurrency(invoice.getTaxAmount()), totalsLeft + 110, totalsTop + 28, { width: 98, align: 'right' });

        doc.strokeColor('#cbd5e1').lineWidth(0.5).moveTo(totalsLeft + 12, totalsTop + 44).lineTo(totalsLeft + 208, totalsTop + 44).stroke();

        doc.fillColor('#0f172a').fontSize(10).font('Helvetica-Bold').text('TOTAL FACTURA:', totalsLeft + 12, totalsTop + 54);
        doc.fillColor('#1061e2').fontSize(12).font('Helvetica-Bold').text(formatCurrency(invoice.getTotalAmount()), totalsLeft + 110, totalsTop + 52, { width: 98, align: 'right' });

        // Legal & Fiscal Notes
        const legalTop = totalsTop + 105;
        doc.strokeColor('#e2e8f0').lineWidth(0.5).moveTo(48, legalTop).lineTo(doc.page.width - 48, legalTop).stroke();

        doc.fillColor('#64748b').fontSize(7.5).font('Helvetica')
          .text('Régimen fiscal: Factura emitida de conformidad con la Directiva 2006/112/CE y la Ley 37/1992 del Impuesto sobre el Valor Añadido.', 48, legalTop + 12, { width: doc.page.width - 96 })
          .text('Medio de pago preferente: Transferencia Bancaria (IBAN: ES91 2100 0418 4502 0005 1332 - SWIFT/BIC: CAIXESBBXXX).', 48, legalTop + 24, { width: doc.page.width - 96 })
          .text('Este documento es un comprobante fiscal oficial generado automáticamente por SaaS-O-Matic Subscription Platform.', 48, legalTop + 36, { width: doc.page.width - 96 });

        // Bottom Footer
        doc.rect(0, doc.page.height - 20, doc.page.width, 20).fill('#f1f5f9');
        doc.fillColor('#94a3b8').fontSize(7.5).font('Helvetica')
          .text(`SaaS-O-Matic · Factura ${invoice.getInvoiceNumber()} · Página 1 de 1 · Generado el ${new Date().toISOString()}`, 48, doc.page.height - 14, { align: 'center', width: doc.page.width - 96 });

        doc.end();
      } catch (error) {
        reject(error);
      }
    });
  }
}
