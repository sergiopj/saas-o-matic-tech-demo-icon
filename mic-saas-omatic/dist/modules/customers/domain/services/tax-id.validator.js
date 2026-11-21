"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeTaxId = normalizeTaxId;
exports.isValidDni = isValidDni;
exports.isValidNie = isValidNie;
exports.isValidCif = isValidCif;
exports.isValidGermanTaxId = isValidGermanTaxId;
exports.isValidFrenchTaxId = isValidFrenchTaxId;
exports.isValidItalianTaxId = isValidItalianTaxId;
exports.isValidUsTaxId = isValidUsTaxId;
exports.isValidTaxId = isValidTaxId;
function normalizeTaxId(rawTaxId) {
    if (!rawTaxId || typeof rawTaxId !== 'string') {
        return '';
    }
    return rawTaxId.trim().toUpperCase().replace(/[\s-]/g, '');
}
const DNI_LETTERS = 'TRWAGMYFPDXBNJZSQVHLCKE';
const CIF_CONTROL_LETTERS = 'JABCDEFGHI';
const DNI_REGEX = /^\d{8}[A-Z]$/;
const NIE_REGEX = /^[XYZ]\d{7}[A-Z]$/;
const CIF_REGEX = /^[ABCDEFGHJKLMNPQRSUVW]\d{7}[0-9A-J]$/;
const INTERNATIONAL_TAX_ID_REGEX = /^[A-Z0-9]{5,20}$/;
const CIF_STRICTLY_LETTER_TYPES = new Set(['K', 'P', 'Q', 'S']);
const CIF_STRICTLY_DIGIT_TYPES = new Set(['A', 'B', 'E', 'H']);
const NIE_PREFIX_MAP = {
    X: '0',
    Y: '1',
    Z: '2',
};
function getDniControlLetter(numericPart) {
    return DNI_LETTERS[numericPart % 23] ?? '';
}
function isValidDni(normalizedId) {
    if (!DNI_REGEX.test(normalizedId)) {
        return false;
    }
    const numericPart = Number.parseInt(normalizedId.substring(0, 8), 10);
    const actualLetter = normalizedId.charAt(8);
    return getDniControlLetter(numericPart) === actualLetter;
}
function isValidNie(normalizedId) {
    if (!NIE_REGEX.test(normalizedId)) {
        return false;
    }
    const prefixDigit = NIE_PREFIX_MAP[normalizedId.charAt(0)] ?? '2';
    const numericString = prefixDigit + normalizedId.substring(1, 8);
    const numericPart = Number.parseInt(numericString, 10);
    const actualLetter = normalizedId.charAt(8);
    return getDniControlLetter(numericPart) === actualLetter;
}
function calculateCifChecksum(digits) {
    const evenSum = Number.parseInt(digits.charAt(1), 10) +
        Number.parseInt(digits.charAt(3), 10) +
        Number.parseInt(digits.charAt(5), 10);
    let oddSum = 0;
    for (const idx of [0, 2, 4, 6]) {
        const multiplied = Number.parseInt(digits.charAt(idx), 10) * 2;
        oddSum += multiplied > 9 ? multiplied - 9 : multiplied;
    }
    const totalSum = evenSum + oddSum;
    const controlDigit = (10 - (totalSum % 10)) % 10;
    const controlLetter = CIF_CONTROL_LETTERS[controlDigit] ?? '';
    return { controlDigit, controlLetter };
}
function matchesCifControl(firstLetter, controlChar, checksum) {
    const { controlDigit, controlLetter } = checksum;
    if (CIF_STRICTLY_LETTER_TYPES.has(firstLetter)) {
        return controlChar === controlLetter;
    }
    if (CIF_STRICTLY_DIGIT_TYPES.has(firstLetter)) {
        return controlChar === controlDigit.toString();
    }
    return controlChar === controlDigit.toString() || controlChar === controlLetter;
}
function isValidCif(normalizedId) {
    if (!CIF_REGEX.test(normalizedId)) {
        return false;
    }
    const firstLetter = normalizedId.charAt(0);
    const digits = normalizedId.substring(1, 8);
    const controlChar = normalizedId.charAt(8);
    const checksum = calculateCifChecksum(digits);
    return matchesCifControl(firstLetter, controlChar, checksum);
}
function isValidGermanTaxId(normalizedTaxId) {
    return /^DE\d{9}$/.test(normalizedTaxId) || /^\d{10,11}$/.test(normalizedTaxId);
}
function isValidFrenchTaxId(normalizedTaxId) {
    return /^FR[A-Z0-9]{2}\d{9}$/.test(normalizedTaxId) || /^\d{9}$/.test(normalizedTaxId);
}
function isValidItalianTaxId(normalizedTaxId) {
    return (/^IT\d{11}$/.test(normalizedTaxId) ||
        /^\d{11}$/.test(normalizedTaxId) ||
        /^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/.test(normalizedTaxId));
}
function isValidUsTaxId(normalizedTaxId) {
    return /^\d{9}$/.test(normalizedTaxId) || /^US(EIN)?\d{6,9}$/.test(normalizedTaxId);
}
function isValidSpanishTaxId(normalizedTaxId) {
    return (isValidDni(normalizedTaxId) ||
        isValidNie(normalizedTaxId) ||
        isValidCif(normalizedTaxId));
}
function isValidInternationalTaxId(normalizedTaxId) {
    return INTERNATIONAL_TAX_ID_REGEX.test(normalizedTaxId);
}
function isValidTaxId(rawTaxId, country) {
    const normalized = normalizeTaxId(rawTaxId);
    const normalizedCountry = country ? country.trim().toUpperCase() : '';
    if (!normalized || !normalizedCountry) {
        return false;
    }
    switch (normalizedCountry) {
        case 'ES':
            return isValidSpanishTaxId(normalized);
        case 'DE':
            return isValidGermanTaxId(normalized);
        case 'FR':
            return isValidFrenchTaxId(normalized);
        case 'IT':
            return isValidItalianTaxId(normalized);
        case 'US':
            return isValidUsTaxId(normalized);
        default:
            return isValidInternationalTaxId(normalized);
    }
}
//# sourceMappingURL=tax-id.validator.js.map