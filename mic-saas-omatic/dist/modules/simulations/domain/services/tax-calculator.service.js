"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTaxRate = getTaxRate;
exports.calculateTaxBreakdown = calculateTaxBreakdown;
const domain_exception_1 = require("../../../../shared/domain/domain.exception");
const fiscal_constants_1 = require("../../../../shared/domain/constants/fiscal.constants");
function getTaxRate(countryCode) {
    const normalizedCode = countryCode.trim().toUpperCase();
    if (fiscal_constants_1.TAX_RATES[normalizedCode] !== undefined) {
        return fiscal_constants_1.TAX_RATES[normalizedCode];
    }
    if (fiscal_constants_1.EU_COUNTRIES.has(normalizedCode)) {
        return 0;
    }
    return 0;
}
function calculateTaxBreakdown(baseCost, taxRate) {
    if (baseCost < 0 || taxRate < 0) {
        throw new domain_exception_1.DomainError('Base cost and tax rate must be greater than or equal to 0.');
    }
    const taxAmount = Math.round(baseCost * taxRate * 100) / 100;
    const totalCost = Math.round((baseCost + taxAmount) * 100) / 100;
    return { taxRate, taxAmount, totalCost };
}
//# sourceMappingURL=tax-calculator.service.js.map