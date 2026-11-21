export interface PricingTier {
    upTo: number;
    price: number;
}
export declare const PRICING_TIERS: ReadonlyArray<PricingTier>;
export declare const TAX_RATES: Readonly<Record<string, number>>;
export declare const EU_COUNTRIES: ReadonlySet<string>;
export declare const SUPPORTED_FISCAL_COUNTRIES: readonly string[];
