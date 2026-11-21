import { Invoice } from '../../../domain/entities/invoice.entity';
import { InvoiceTypeOrmEntity } from './invoice.typeorm-entity';
export declare class InvoicePersistenceMapper {
    static toDomain(entity: InvoiceTypeOrmEntity): Invoice;
    static toPersistence(domain: Invoice): InvoiceTypeOrmEntity;
}
