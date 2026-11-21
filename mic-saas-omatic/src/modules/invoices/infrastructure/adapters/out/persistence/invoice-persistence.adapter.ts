import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvoiceRepositoryPort } from '../../../application/ports/out/invoice-repository.port';
import { Invoice } from '../../../domain/entities/invoice.entity';
import { InvoiceTypeOrmEntity } from './invoice.typeorm-entity';
import { InvoicePersistenceMapper } from './invoice-persistence.mapper';
import {
  InvoiceSearchCriteria,
  PaginatedInvoicesResult,
} from '../../../domain/models/invoice-search-criteria.model';

@Injectable()
export class InvoicePersistenceAdapter implements InvoiceRepositoryPort {
  constructor(
    @InjectRepository(InvoiceTypeOrmEntity)
    private readonly repository: Repository<InvoiceTypeOrmEntity>,
  ) {}

  async save(invoice: Invoice): Promise<Invoice> {
    const entity = InvoicePersistenceMapper.toPersistence(invoice);
    const saved = await this.repository.save(entity);
    return InvoicePersistenceMapper.toDomain(saved);
  }

  async findById(id: string): Promise<Invoice | null> {
    const found = await this.repository.findOne({ where: { id } });
    return found ? InvoicePersistenceMapper.toDomain(found) : null;
  }

  async findByCustomerId(customerId: string): Promise<Invoice[]> {
    const found = await this.repository.find({
      where: { customerId },
      order: { issueDate: 'DESC' },
    });
    return found.map((item) => InvoicePersistenceMapper.toDomain(item));
  }

  async search(criteria?: InvoiceSearchCriteria): Promise<PaginatedInvoicesResult<Invoice>> {
    const queryBuilder = this.repository.createQueryBuilder('invoice');

    if (criteria?.customerId) {
      queryBuilder.andWhere('invoice.customerId = :customerId', {
        customerId: criteria.customerId,
      });
    }

    if (criteria?.status) {
      queryBuilder.andWhere('invoice.status = :status', {
        status: criteria.status,
      });
    }

    const sortBy = criteria?.sortBy ?? 'issueDate';
    const sortOrder = criteria?.sortOrder ?? 'DESC';
    queryBuilder.orderBy(`invoice.${sortBy}`, sortOrder);

    const page = criteria?.page && criteria.page > 0 ? criteria.page : 1;
    const limit = criteria?.limit && criteria.limit > 0 ? criteria.limit : 20;
    queryBuilder.skip((page - 1) * limit).take(limit);

    const [entities, total] = await queryBuilder.getManyAndCount();

    return {
      items: entities.map((item) => InvoicePersistenceMapper.toDomain(item)),
      total,
    };
  }
}
