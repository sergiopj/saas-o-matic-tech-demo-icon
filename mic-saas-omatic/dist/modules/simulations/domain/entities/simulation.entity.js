"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Simulation = void 0;
const domain_exception_1 = require("../../../../shared/domain/domain.exception");
const pricing_engine_service_1 = require("../services/pricing-engine.service");
const tax_calculator_service_1 = require("../services/tax-calculator.service");
class Simulation {
    id;
    customerId;
    activeUsers;
    storageGb;
    apiCalls;
    monthlyBaseCost;
    taxRate;
    taxAmount;
    totalCost;
    currency;
    createdAt;
    constructor(props) {
        this.id = props.id;
        this.customerId = props.customerId;
        this.activeUsers = props.activeUsers;
        this.storageGb = props.storageGb;
        this.apiCalls = props.apiCalls;
        this.monthlyBaseCost = props.monthlyBaseCost;
        this.taxRate = props.taxRate;
        this.taxAmount = props.taxAmount;
        this.totalCost = props.totalCost;
        this.currency = props.currency ?? 'EUR';
        this.createdAt = props.createdAt;
    }
    static create(payload, idGenerator) {
        const customerId = Simulation.validateCustomerId(payload.customerId);
        const customerCountry = Simulation.validateCountry(payload.customerCountry);
        const activeUsers = Simulation.validateActiveUsers(payload.activeUsers);
        const storageGb = Simulation.validateStorageGb(payload.storageGb);
        const apiCalls = Simulation.validateApiCalls(payload.apiCalls);
        const monthlyBaseCost = (0, pricing_engine_service_1.calculateTieredPrice)(activeUsers);
        const taxRate = (0, tax_calculator_service_1.getTaxRate)(customerCountry);
        const { taxAmount, totalCost } = (0, tax_calculator_service_1.calculateTaxBreakdown)(monthlyBaseCost, taxRate);
        return new Simulation({
            id: payload.id || idGenerator(),
            customerId,
            activeUsers,
            storageGb,
            apiCalls,
            monthlyBaseCost,
            taxRate,
            taxAmount,
            totalCost,
            currency: 'EUR',
            createdAt: new Date(),
        });
    }
    static reconstitute(props) {
        return new Simulation(props);
    }
    static validateCustomerId(customerId) {
        const trimmed = (customerId || '').trim();
        if (!trimmed) {
            throw new domain_exception_1.DomainError('Customer ID is required.');
        }
        return trimmed;
    }
    static validateCountry(country) {
        const normalized = (country || '').trim().toUpperCase();
        if (!/^[A-Z]{2}$/.test(normalized)) {
            throw new domain_exception_1.DomainError('Customer country must be a valid 2-letter ISO code.');
        }
        return normalized;
    }
    static validateActiveUsers(activeUsers) {
        if (!Number.isInteger(activeUsers) || activeUsers < 0) {
            throw new domain_exception_1.DomainError('Active users must be an integer greater than or equal to 0.');
        }
        return activeUsers;
    }
    static validateStorageGb(storageGb) {
        if (typeof storageGb !== 'number' ||
            Number.isNaN(storageGb) ||
            storageGb < 0) {
            throw new domain_exception_1.DomainError('Storage GB must be a number greater than or equal to 0.');
        }
        return storageGb;
    }
    static validateApiCalls(apiCalls) {
        if (!Number.isInteger(apiCalls) || apiCalls < 0) {
            throw new domain_exception_1.DomainError('API calls must be an integer greater than or equal to 0.');
        }
        return apiCalls;
    }
    getId() {
        return this.id;
    }
    getCustomerId() {
        return this.customerId;
    }
    getActiveUsers() {
        return this.activeUsers;
    }
    getStorageGb() {
        return this.storageGb;
    }
    getApiCalls() {
        return this.apiCalls;
    }
    getMonthlyBaseCost() {
        return this.monthlyBaseCost;
    }
    getTaxRate() {
        return this.taxRate;
    }
    getTaxAmount() {
        return this.taxAmount;
    }
    getTotalCost() {
        return this.totalCost;
    }
    getCurrency() {
        return this.currency;
    }
    getCreatedAt() {
        return this.createdAt;
    }
    toJSON() {
        return {
            id: this.id,
            customerId: this.customerId,
            activeUsers: this.activeUsers,
            storageGb: this.storageGb,
            apiCalls: this.apiCalls,
            monthlyBaseCost: this.monthlyBaseCost,
            taxRate: this.taxRate,
            taxAmount: this.taxAmount,
            totalCost: this.totalCost,
            currency: this.currency,
            createdAt: this.createdAt,
        };
    }
}
exports.Simulation = Simulation;
//# sourceMappingURL=simulation.entity.js.map