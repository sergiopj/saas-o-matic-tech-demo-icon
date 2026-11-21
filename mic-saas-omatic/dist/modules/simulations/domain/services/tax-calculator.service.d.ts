export interface TaxBreakdown {
    taxRate: number;
    taxAmount: number;
    totalCost: number;
}
export declare function getTaxRate(countryCode: string): number;
export declare function calculateTaxBreakdown(baseCost: number, taxRate: number): TaxBreakdown;
