import type { CustomerRepositoryPort } from '../../../customers/application/ports/out/customer-repository.port';
import type { SimulationRepositoryPort } from '../ports/out/simulation-repository.port';
import { Simulation } from '../../domain/entities/simulation.entity';
export interface CreateSimulationCommand {
    customerId: string;
    activeUsers: number;
    storageGb: number;
    apiCalls: number;
}
export declare class CreateSimulationUseCase {
    private readonly customerRepository;
    private readonly simulationRepository;
    constructor(customerRepository: CustomerRepositoryPort, simulationRepository: SimulationRepositoryPort);
    execute(command: CreateSimulationCommand): Promise<Simulation>;
}
