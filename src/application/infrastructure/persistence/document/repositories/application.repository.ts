import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { omit } from 'lodash';
import { ApplicationModel } from '../../../../domain/applications.model';
import { ApplicationRepository } from '../../application.repository';
import { ApplicationSchemaClass } from '../entities/application.entity';
import { ApplicationMapper } from '../mappers/application.mapper';

@Injectable()
export class ApplicationDocumentRepository implements ApplicationRepository {
  constructor(
    @InjectModel(ApplicationSchemaClass.name)
    private readonly applicationModel: Model<ApplicationSchemaClass>,
  ) {}

  async create(application: ApplicationModel): Promise<ApplicationModel> {
    const persistenceModel = ApplicationMapper.toPersistence(application);
    const created = new this.applicationModel(persistenceModel);
    const saved = await created.save();
    return ApplicationMapper.toDomain(saved);
  }

  async update(
    id: string,
    updates: Omit<Partial<ApplicationModel>, 'project'>,
  ): Promise<ApplicationModel | null> {
    const safeUpdates = omit(updates, ['id']) as UpdateQuery<ApplicationSchemaClass>;
    await this.applicationModel.updateOne({ _id: id }, safeUpdates);
    const updated = await this.applicationModel.findById(id).lean();
    return updated ? ApplicationMapper.toDomain(updated as ApplicationSchemaClass) : null;
  }

  async findById(id: string): Promise<ApplicationModel | null> {
    const entity = await this.applicationModel.findById(id).populate(['project', 'domain']).lean();
    return entity ? ApplicationMapper.toDomain(entity as ApplicationSchemaClass) : null;
  }

  async findOne(
    filter: Partial<ApplicationModel>,
    options?: { withRelations?: boolean },
  ): Promise<ApplicationModel | null> {
    const cleanedFilter = Object.fromEntries(
      Object.entries(filter).filter(([_, v]) => v !== null && v !== undefined),
    ) as FilterQuery<ApplicationSchemaClass>;

    if (filter.project?.id) {
      cleanedFilter['project'] = new Types.ObjectId(filter.project.id);
    }
  
    if (filter.domain?.id) {
      cleanedFilter['domain'] = new Types.ObjectId(filter.domain.id);
    }

    const query = this.applicationModel.findOne(cleanedFilter);
    if (options?.withRelations) {
      query.populate(['project', 'domain']);
    }

    const entity = await query.lean();
    return entity ? ApplicationMapper.toDomain(entity as ApplicationSchemaClass) : null;
  }

  async findAll(
    filter: Partial<ApplicationModel>,
    options?: { withRelations?: boolean },
  ): Promise<ApplicationModel[]> {
    const cleanedFilter: FilterQuery<ApplicationSchemaClass> = Object.fromEntries(
      Object.entries(filter).filter(([_, v]) => v != null),
    );
  
    if (filter.project?.id) {
      cleanedFilter['project'] = new Types.ObjectId(filter.project.id);
    }
  
    if (filter.domain?.id) {
      cleanedFilter['domain'] = new Types.ObjectId(filter.domain.id);
    }
  
    const query = this.applicationModel.find(cleanedFilter);
  
    if (options?.withRelations) {
      query.populate(['project', 'domain']);
    }
  
    const entities = await query.lean();
    return entities.map(entity =>
      ApplicationMapper.toDomain(entity as ApplicationSchemaClass),
    );
  }

  async find(): Promise<ApplicationModel[]> {
    const entities = await this.applicationModel.find().lean();
    return entities.map((entity) =>
      ApplicationMapper.toDomain(entity as ApplicationSchemaClass),
    );
  }

  async delete(id: string): Promise<void> {
    await this.applicationModel.deleteOne({ _id: id });
  }
}
