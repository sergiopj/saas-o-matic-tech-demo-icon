import { CreateSimulationUseCase } from '../../../../application/use-cases/create-simulation.use-case';
import { ListSimulationsByCustomerUseCase } from '../../../../application/use-cases/list-simulations-by-customer.use-case';
import { CreateSimulationDto } from './dto/create-simulation.dto';
import { SimulationResponseDto } from './dto/simulation-response.dto';
export declare class SimulationController {
    private readonly createSimulationUseCase;
    private readonly listSimulationsByCustomerUseCase;
    constructor(createSimulationUseCase: CreateSimulationUseCase, listSimulationsByCustomerUseCase: ListSimulationsByCustomerUseCase);
    create(createSimulationDto: CreateSimulationDto): Promise<SimulationResponseDto>;
    findByCustomer(customerId?: string): Promise<SimulationResponseDto[]>;
}
