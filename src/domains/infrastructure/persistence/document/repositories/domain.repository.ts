import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { omit } from 'lodash';
import { DomainModel } from 'src/domains/domain/domain.model';
import { DomainRepository } from '../../domain.repository';
import { DomainSchemaClass } from '../entities/domain.entity';
import { DomainMapper } from '../mappers/domain.mapper';

@Injectable()
export class DomainDocumentRepository implements DomainRepository {
  constructor(
    @InjectModel(DomainSchemaClass.name)
    private readonly domainModel: Model<DomainSchemaClass>,
  ) {}

  async create(domain: DomainModel): Promise<DomainModel> {
    const persistenceModel = DomainMapper.toPersistence(domain);
    const created = new this.domainModel(persistenceModel);
    const saved = await created.save();
    return DomainMapper.toDomain(saved);
  }

  async update(id: string, updates: Partial<DomainModel>): Promise<DomainModel | null> {
    const safeUpdates = omit(updates, ['id']) as UpdateQuery<DomainSchemaClass>;
    await this.domainModel.updateOne({ _id: id }, safeUpdates);
    const updated = await this.domainModel.findById(id).lean();
    return updated ? DomainMapper.toDomain(updated as DomainSchemaClass) : null;
  }

  async findById(id: string): Promise<DomainModel | null> {
    const entity = await this.domainModel.findById(id).populate('project').lean();
    return entity ? DomainMapper.toDomain(entity as DomainSchemaClass) : null;
  }

  async findOne(
    filter: Partial<DomainModel>,
    options?: { withRelations?: boolean },
  ): Promise<DomainModel | null> {
    const cleanedFilter = Object.fromEntries(
      Object.entries(filter).filter(([_, v]) => v !== null && v !== undefined)
    ) as FilterQuery<DomainSchemaClass>;

    if (cleanedFilter.project && typeof cleanedFilter.project === 'string') {
      cleanedFilter.project = new Types.ObjectId(cleanedFilter.project);
    }
  
    if (cleanedFilter.domain && typeof cleanedFilter.domain === 'string') {
      cleanedFilter.domain = new Types.ObjectId(cleanedFilter.domain);
    }

    const query = this.domainModel.findOne(cleanedFilter);
    if (options?.withRelations) {
      query.populate('project');
    }

    const entity = await query.lean();
    return entity ? DomainMapper.toDomain(entity as DomainSchemaClass) : null;
  }

  async find(): Promise<DomainModel[]> {
    const entities = await this.domainModel.find().populate('project').lean();
    return entities.map((entity) =>
      DomainMapper.toDomain(entity as DomainSchemaClass),
    );
  }

  async delete(id: string): Promise<void> {
    await this.domainModel.deleteOne({ _id: id });
  }
}
