import { Customer } from "../../../../../domain/entities/customer.entity";
export interface SimulationSummaryDto {
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
    createdAt: string;
}
export declare class CustomerDetailResponseDto {
    id: string;
    companyName: string;
    taxId: string;
    email: string;
    country: string;
    selectedPlan: string;
    createdAt: string;
    simulations: SimulationSummaryDto[];
    static fromDomain(customer: Customer, simulations?: SimulationSummaryDto[]): CustomerDetailResponseDto;
}
