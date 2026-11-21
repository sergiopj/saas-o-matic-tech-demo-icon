import { Customer } from '../../../../domain/entities/customer.entity';
import { CustomerTypeOrmEntity } from './customer.typeorm-entity';
export declare class CustomerPersistenceMapper {
    static toDomain(entity: CustomerTypeOrmEntity): Customer;
    static toTypeOrm(domain: Customer): CustomerTypeOrmEntity;
}
