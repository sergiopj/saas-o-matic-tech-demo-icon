"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoicePersistenceMapper = void 0;
const invoice_entity_1 = require("../../../domain/entities/invoice.entity");
const invoice_typeorm_entity_1 = require("./invoice.typeorm-entity");
class InvoicePersistenceMapper {
    static toDomain(entity) {
        return invoice_entity_1.Invoice.reconstitute({
            id: entity.id,
            invoiceNumber: entity.invoiceNumber,
            customerId: entity.customerId,
            customerCompanyName: entity.customerCompanyName,
            customerTaxId: entity.customerTaxId,
            customerCountry: entity.customerCountry,
            simulationId: entity.simulationId,
            concept: entity.concept,
            subtotal: Number(entity.subtotal),
            taxRate: Number(entity.taxRate),
            taxAmount: Number(entity.taxAmount),
            totalAmount: Number(entity.totalAmount),
            currency: entity.currency,
            status: entity.status,
            issueDate: entity.issueDate instanceof Date ? entity.issueDate : new Date(entity.issueDate),
            dueDate: entity.dueDate instanceof Date ? entity.dueDate : new Date(entity.dueDate),
            paidAt: entity.paidAt ? (entity.paidAt instanceof Date ? entity.paidAt : new Date(entity.paidAt)) : null,
            notes: entity.notes,
            createdAt: entity.createdAt instanceof Date ? entity.createdAt : new Date(entity.createdAt),
            updatedAt: entity.updatedAt instanceof Date ? entity.updatedAt : new Date(entity.updatedAt),
        });
    }
    static toPersistence(domain) {
        const entity = new invoice_typeorm_entity_1.InvoiceTypeOrmEntity();
        entity.id = domain.getId();
        entity.invoiceNumber = domain.getInvoiceNumber();
        entity.customerId = domain.getCustomerId();
        entity.customerCompanyName = domain.getCustomerCompanyName();
        entity.customerTaxId = domain.getCustomerTaxId();
        entity.customerCountry = domain.getCustomerCountry();
        entity.simulationId = domain.getSimulationId();
        entity.concept = domain.getConcept();
        entity.subtotal = domain.getSubtotal();
        entity.taxRate = domain.getTaxRate();
        entity.taxAmount = domain.getTaxAmount();
        entity.totalAmount = domain.getTotalAmount();
        entity.currency = domain.getCurrency();
        entity.status = domain.getStatus();
        entity.issueDate = domain.getIssueDate();
        entity.dueDate = domain.getDueDate();
        entity.paidAt = domain.getPaidAt();
        entity.notes = domain.getNotes();
        entity.createdAt = domain.getCreatedAt();
        entity.updatedAt = domain.getUpdatedAt();
        return entity;
    }
}
exports.InvoicePersistenceMapper = InvoicePersistenceMapper;
//# sourceMappingURL=invoice-persistence.mapper.js.map