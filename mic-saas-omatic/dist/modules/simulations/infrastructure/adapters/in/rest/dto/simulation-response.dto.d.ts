import { Simulation } from "../../../../../domain/entities/simulation.entity";
export declare class SimulationResponseDto {
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
    static fromDomain(simulation: Simulation): SimulationResponseDto;
}
