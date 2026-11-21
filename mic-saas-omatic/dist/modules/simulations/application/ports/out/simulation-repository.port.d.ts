import { Simulation } from "../../../domain/entities/simulation.entity";
export declare const SIMULATION_REPOSITORY_PORT: unique symbol;
export interface SimulationRepositoryPort {
    save(simulation: Simulation): Promise<Simulation>;
    findByCustomerId(customerId?: string): Promise<Simulation[]>;
}
