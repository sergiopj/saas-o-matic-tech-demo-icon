export declare function normalizeTaxId(rawTaxId: string): string;
export declare function isValidDni(normalizedId: string): boolean;
export declare function isValidNie(normalizedId: string): boolean;
export declare function isValidCif(normalizedId: string): boolean;
export declare function isValidGermanTaxId(normalizedTaxId: string): boolean;
export declare function isValidFrenchTaxId(normalizedTaxId: string): boolean;
export declare function isValidItalianTaxId(normalizedTaxId: string): boolean;
export declare function isValidUsTaxId(normalizedTaxId: string): boolean;
export declare function isValidTaxId(rawTaxId: string, country: string): boolean;
