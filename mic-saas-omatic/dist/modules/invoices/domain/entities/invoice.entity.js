"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Invoice = void 0;
const node_crypto_1 = require("node:crypto");
const invoice_status_enum_1 = require("../enums/invoice-status.enum");
const domain_exception_1 = require("../../../../shared/domain/domain.exception");
class Invoice {
    id;
    invoiceNumber;
    customerId;
    customerCompanyName;
    customerTaxId;
    customerCountry;
    simulationId;
    concept;
    subtotal;
    taxRate;
    taxAmount;
    totalAmount;
    currency;
    status;
    issueDate;
    dueDate;
    paidAt;
    notes;
    createdAt;
    updatedAt;
    constructor(props) {
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
    static create(payload) {
        Invoice.validateConcept(payload.concept);
        Invoice.validateSubtotal(payload.subtotal);
        const subtotal = Math.round(payload.subtotal * 100) / 100;
        const taxRate = payload.taxRate !== undefined ? payload.taxRate : 0.21;
        const taxAmount = Math.round(subtotal * taxRate * 100) / 100;
        const totalAmount = Math.round((subtotal + taxAmount) * 100) / 100;
        const now = new Date();
        const issueDate = payload.issueDate ?? now;
        const dueDate = payload.dueDate ?? new Date(issueDate.getTime() + 30 * 24 * 60 * 60 * 1000);
        const invoiceNumber = payload.invoiceNumber ?? Invoice.generateInvoiceNumber(now);
        return new Invoice({
            id: payload.id ?? (0, node_crypto_1.randomUUID)(),
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
            status: invoice_status_enum_1.InvoiceStatus.ISSUED,
            issueDate,
            dueDate,
            paidAt: null,
            notes: payload.notes ?? null,
            createdAt: now,
            updatedAt: now,
        });
    }
    static reconstitute(props) {
        return new Invoice(props);
    }
    markAsPaid(paidAt = new Date()) {
        if (this.status === invoice_status_enum_1.InvoiceStatus.CANCELLED) {
            throw new domain_exception_1.DomainError('Cannot mark cancelled invoice as paid');
        }
        this.status = invoice_status_enum_1.InvoiceStatus.PAID;
        this.paidAt = paidAt;
        this.updatedAt = new Date();
    }
    cancel() {
        if (this.status === invoice_status_enum_1.InvoiceStatus.PAID) {
            throw new domain_exception_1.DomainError('Cannot cancel an already paid invoice');
        }
        this.status = invoice_status_enum_1.InvoiceStatus.CANCELLED;
        this.updatedAt = new Date();
    }
    getId() { return this.id; }
    getInvoiceNumber() { return this.invoiceNumber; }
    getCustomerId() { return this.customerId; }
    getCustomerCompanyName() { return this.customerCompanyName; }
    getCustomerTaxId() { return this.customerTaxId; }
    getCustomerCountry() { return this.customerCountry; }
    getSimulationId() { return this.simulationId; }
    getConcept() { return this.concept; }
    getSubtotal() { return this.subtotal; }
    getTaxRate() { return this.taxRate; }
    getTaxAmount() { return this.taxAmount; }
    getTotalAmount() { return this.totalAmount; }
    getCurrency() { return this.currency; }
    getStatus() { return this.status; }
    getIssueDate() { return this.issueDate; }
    getDueDate() { return this.dueDate; }
    getPaidAt() { return this.paidAt; }
    getNotes() { return this.notes; }
    getCreatedAt() { return this.createdAt; }
    getUpdatedAt() { return this.updatedAt; }
    static validateConcept(concept) {
        if (!concept || concept.trim().length < 3) {
            throw new domain_exception_1.DomainError('Invoice concept must contain at least 3 characters');
        }
    }
    static validateSubtotal(subtotal) {
        if (subtotal === undefined || subtotal === null || Number.isNaN(subtotal) || subtotal < 0) {
            throw new domain_exception_1.DomainError('Invoice subtotal must be a non-negative number');
        }
    }
    static generateInvoiceNumber(date) {
        const year = date.getFullYear();
        const randomSuffix = Math.floor(1000 + Math.random() * 9000);
        return `INV-${year}-${randomSuffix}`;
    }
}
exports.Invoice = Invoice;
//# sourceMappingURL=invoice.entity.js.map