import { OnApplicationBootstrap } from '@nestjs/common';
import type { CustomerRepositoryPort } from '../../../modules/customers/application/ports/out/customer-repository.port';
import type { SimulationRepositoryPort } from '../../../modules/simulations/application/ports/out/simulation-repository.port';
export interface SeedCustomerDefinition {
    id: string;
    companyName: string;
    taxId: string;
    email: string;
    country: string;
    selectedPlan: string;
    createdAt: Date;
    simulations: Array<{
        id: string;
        activeUsers: number;
        storageGb: number;
        apiCalls: number;
        createdAt: Date;
    }>;
}
export declare const SEED_CUSTOMERS: SeedCustomerDefinition[];
export declare class DatabaseSeederService implements OnApplicationBootstrap {
    private readonly customerRepository;
    private readonly simulationRepository;
    private readonly logger;
    constructor(customerRepository: CustomerRepositoryPort, simulationRepository: SimulationRepositoryPort);
    onApplicationBootstrap(): Promise<void>;
    seed(force?: boolean): Promise<{
        customersCount: number;
        simulationsCount: number;
    }>;
}
