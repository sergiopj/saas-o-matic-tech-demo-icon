"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceResponseDto = void 0;
class InvoiceResponseDto {
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
    static fromDomain(domain) {
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
        dto.paidAt = domain.getPaidAt() ? domain.getPaidAt().toISOString() : null;
        dto.notes = domain.getNotes();
        dto.createdAt = domain.getCreatedAt().toISOString();
        return dto;
    }
}
exports.InvoiceResponseDto = InvoiceResponseDto;
//# sourceMappingURL=invoice-response.dto.js.map