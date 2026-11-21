import type { SimulationRepositoryPort } from '../ports/out/simulation-repository.port';
import { Simulation } from '../../domain/entities/simulation.entity';
export declare class ListSimulationsByCustomerUseCase {
    private readonly simulationRepository;
    constructor(simulationRepository: SimulationRepositoryPort);
    execute(customerId?: string): Promise<Simulation[]>;
}
