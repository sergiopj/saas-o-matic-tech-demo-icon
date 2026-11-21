export interface SimulationProperties {
    id: string;
    customerId: string;
    activeUsers: number;
    storageGb: number;
    apiCalls: number;
    monthlyBaseCost: number;
    taxRate: number;
    taxAmount: number;
    totalCost: number;
    currency: string;
    createdAt: Date;
}
export interface CreateSimulationPayload {
    id?: string;
    customerId: string;
    customerCountry: string;
    activeUsers: number;
    storageGb: number;
    apiCalls: number;
}
export declare class Simulation {
    private readonly id;
    private readonly customerId;
    private readonly activeUsers;
    private readonly storageGb;
    private readonly apiCalls;
    private readonly monthlyBaseCost;
    private readonly taxRate;
    private readonly taxAmount;
    private readonly totalCost;
    private readonly currency;
    private readonly createdAt;
    private constructor();
    static create(payload: CreateSimulationPayload, idGenerator: () => string): Simulation;
    static reconstitute(props: SimulationProperties): Simulation;
    private static validateCustomerId;
    private static validateCountry;
    private static validateActiveUsers;
    private static validateStorageGb;
    private static validateApiCalls;
    getId(): string;
    getCustomerId(): string;
    getActiveUsers(): number;
    getStorageGb(): number;
    getApiCalls(): number;
    getMonthlyBaseCost(): number;
    getTaxRate(): number;
    getTaxAmount(): number;
    getTotalCost(): number;
    getCurrency(): string;
    getCreatedAt(): Date;
    toJSON(): SimulationProperties;
}
