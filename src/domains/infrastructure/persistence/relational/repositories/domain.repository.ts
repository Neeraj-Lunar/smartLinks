import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CONNECTION_NAME } from '../../../../../config/constants';
import { omit } from 'lodash';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { DomainRepository } from '../../domain.repository';
import { DomainEntity } from '../entities/domain.entity';
import { DomainModel } from 'src/domains/domain/domain.model';
import { DomainMapper } from '../mappers/domain.mapper';

@Injectable()
export class PgDomainRepository implements DomainRepository {
  constructor(
    @InjectRepository(DomainEntity, CONNECTION_NAME)
    private readonly repo: Repository<DomainEntity>,
  ) {}

  async create(template: DomainModel): Promise<DomainModel> {
    const persistenceModel = DomainMapper.toPersistence(template);
    const entity = this.repo.create(persistenceModel);
    const saved = await this.repo.save(entity);
    return DomainMapper.toDomain(saved);
  }

  async update(id: number, updates: Partial<DomainModel>): Promise<DomainModel | null> {
    const safeUpdates = omit(updates, ['id']) as QueryDeepPartialEntity<DomainEntity>;
    await this.repo.update(id, safeUpdates);
    const updated = await this.repo.findOne({
      where: { id }
    });
    return updated ? DomainMapper.toDomain(updated) : null;
  }

  async findById(id: number): Promise<DomainModel | null> {
    const entity = await this.repo.findOne({
      where: { id },
      relations: ['project'],
    });
    return entity ? DomainMapper.toDomain(entity) : null;
  }

  async findOne(filter: Partial<DomainModel>, options?: { withRelations?: boolean }): Promise<DomainModel | null> {
    const cleanedFilter: any = Object.fromEntries(
      Object.entries(filter).filter(([_, v]) => v !== null && v !== undefined)
    );
  
    const entity = options?.withRelations
      ? await this.repo.findOne({
          where: cleanedFilter,
          relations: ['project'],
        })
      : await this.repo.findOneBy(cleanedFilter);
  
    return entity ? DomainMapper.toDomain(entity) : null;
  }

  async find(): Promise<DomainModel[]> {
    const entities = await this.repo.find();
    return entities.map((entity) => DomainMapper.toDomain(entity));
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
