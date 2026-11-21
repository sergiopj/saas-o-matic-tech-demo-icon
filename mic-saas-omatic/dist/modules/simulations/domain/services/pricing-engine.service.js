"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateTieredPrice = calculateTieredPrice;
const domain_exception_1 = require("../../../../shared/domain/domain.exception");
const fiscal_constants_1 = require("../../../../shared/domain/constants/fiscal.constants");
function calculateTieredPrice(activeUsers) {
    if (!Number.isInteger(activeUsers) || activeUsers < 0) {
        throw new domain_exception_1.DomainError('Active users must be an integer greater than or equal to 0.');
    }
    let total = 0;
    let remaining = activeUsers;
    let previousLimit = 0;
    for (const tier of fiscal_constants_1.PRICING_TIERS) {
        if (remaining <= 0)
            break;
        const usersInTier = Math.min(remaining, tier.upTo - previousLimit);
        total += usersInTier * tier.price;
        remaining -= usersInTier;
        previousLimit = tier.upTo;
    }
    return total;
}
//# sourceMappingURL=pricing-engine.service.js.map