import { Repository } from 'typeorm';
import type { SimulationRepositoryPort } from '../../../../application/ports/out/simulation-repository.port';
import { Simulation } from '../../../../domain/entities/simulation.entity';
import { SimulationTypeOrmEntity } from './simulation.typeorm-entity';
export declare class SimulationPersistenceAdapter implements SimulationRepositoryPort {
    private readonly repository;
    constructor(repository: Repository<SimulationTypeOrmEntity>);
    save(simulation: Simulation): Promise<Simulation>;
    findByCustomerId(customerId?: string): Promise<Simulation[]>;
}
