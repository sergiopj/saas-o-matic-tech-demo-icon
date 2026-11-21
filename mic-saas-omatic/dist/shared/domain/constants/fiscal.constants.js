"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SUPPORTED_FISCAL_COUNTRIES = exports.EU_COUNTRIES = exports.TAX_RATES = exports.PRICING_TIERS = void 0;
exports.PRICING_TIERS = [
    { upTo: 10, price: 10 },
    { upTo: 50, price: 8 },
    { upTo: Infinity, price: 5 },
];
exports.TAX_RATES = {
    ES: 0.21,
    DE: 0.19,
    FR: 0.20,
    IT: 0.22,
    GB: 0.20,
    US: 0,
};
exports.EU_COUNTRIES = new Set([
    'AT', 'BE', 'BG', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE',
    'GR', 'HU', 'HR', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL',
    'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE',
]);
exports.SUPPORTED_FISCAL_COUNTRIES = [
    'CH', 'DE', 'ES', 'FR', 'GB', 'IT', 'SE', 'US',
];
//# sourceMappingURL=fiscal.constants.js.map