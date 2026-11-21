import { Simulation } from '../../../../domain/entities/simulation.entity';
import { SimulationTypeOrmEntity } from './simulation.typeorm-entity';
export declare class SimulationPersistenceMapper {
    static toDomain(entity: SimulationTypeOrmEntity): Simulation;
    static toTypeOrm(domain: Simulation): SimulationTypeOrmEntity;
}
