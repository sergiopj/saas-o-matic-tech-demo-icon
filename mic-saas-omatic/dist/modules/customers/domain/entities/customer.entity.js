"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
const tax_id_validator_1 = require("../services/tax-id.validator");
const domain_exception_1 = require("../../../../shared/domain/domain.exception");
class Customer {
    id;
    companyName;
    taxId;
    email;
    country;
    selectedPlan;
    createdAt;
    constructor(props) {
        this.id = props.id;
        this.companyName = props.companyName;
        this.taxId = props.taxId;
        this.email = props.email;
        this.country = props.country;
        this.selectedPlan = props.selectedPlan;
        this.createdAt = props.createdAt;
    }
    static create(payload, idGenerator) {
        const companyName = Customer.validateCompanyName(payload.companyName);
        const country = Customer.validateCountry(payload.country);
        const taxId = Customer.validateTaxId(payload.taxId, country);
        const email = Customer.validateEmail(payload.email);
        const selectedPlan = Customer.validatePlan(payload.selectedPlan);
        return new Customer({
            id: payload.id || idGenerator(),
            companyName,
            taxId,
            email,
            country,
            selectedPlan,
            createdAt: new Date(),
        });
    }
    static reconstitute(props) {
        return new Customer(props);
    }
    update(payload) {
        const nextCompanyName = payload.companyName !== undefined
            ? Customer.validateCompanyName(payload.companyName)
            : this.companyName;
        const nextCountry = payload.country !== undefined
            ? Customer.validateCountry(payload.country)
            : this.country;
        const nextTax = payload.taxId !== undefined || payload.country !== undefined
            ? Customer.validateTaxId(payload.taxId ?? this.taxId, nextCountry)
            : this.taxId;
        const nextEmail = payload.email !== undefined
            ? Customer.validateEmail(payload.email)
            : this.email;
        const nextPlan = payload.selectedPlan !== undefined
            ? Customer.validatePlan(payload.selectedPlan)
            : this.selectedPlan;
        return new Customer({
            id: this.id,
            companyName: nextCompanyName,
            taxId: nextTax,
            email: nextEmail,
            country: nextCountry,
            selectedPlan: nextPlan,
            createdAt: this.createdAt,
        });
    }
    static validateCompanyName(companyName) {
        const trimmed = (companyName || '').trim();
        if (!trimmed || trimmed.length < 2) {
            throw new domain_exception_1.DomainError('Company name must have at least 2 characters.');
        }
        return trimmed;
    }
    static validateCountry(country) {
        const normalized = (country || '').trim().toUpperCase();
        if (!/^[A-Z]{2}$/.test(normalized)) {
            throw new domain_exception_1.DomainError('Country must be a valid 2-letter ISO 3166-1 alpha-2 code.');
        }
        return normalized;
    }
    static validateTaxId(rawTaxId, country) {
        const normalized = (0, tax_id_validator_1.normalizeTaxId)(rawTaxId);
        if (!(0, tax_id_validator_1.isValidTaxId)(normalized, country)) {
            throw new domain_exception_1.DomainError(`Invalid tax identifier '${rawTaxId}' for country '${country}'.`);
        }
        return normalized;
    }
    static validateEmail(email) {
        const trimmed = (email || '').trim().toLowerCase();
        const emailRegex = /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/;
        if (!emailRegex.test(trimmed)) {
            throw new domain_exception_1.DomainError(`Invalid email address format '${email}'.`);
        }
        return trimmed;
    }
    static validatePlan(selectedPlan) {
        const trimmed = (selectedPlan || '').trim();
        if (!trimmed || trimmed.length < 2) {
            throw new domain_exception_1.DomainError('Selected plan must have at least 2 characters.');
        }
        return trimmed;
    }
    getId() {
        return this.id;
    }
    getCompanyName() {
        return this.companyName;
    }
    getTaxId() {
        return this.taxId;
    }
    getEmail() {
        return this.email;
    }
    getCountry() {
        return this.country;
    }
    getSelectedPlan() {
        return this.selectedPlan;
    }
    getCreatedAt() {
        return this.createdAt;
    }
    toJSON() {
        return {
            id: this.id,
            companyName: this.companyName,
            taxId: this.taxId,
            email: this.email,
            country: this.country,
            selectedPlan: this.selectedPlan,
            createdAt: this.createdAt,
        };
    }
}
exports.Customer = Customer;
//# sourceMappingURL=customer.entity.js.map