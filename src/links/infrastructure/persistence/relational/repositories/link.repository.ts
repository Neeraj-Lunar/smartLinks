import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { LinkRepository } from '../../link.repository';
import { LinkModel } from 'src/links/domain/link.model';
import { LinkMapper } from '../mappers/link.mapper';
import { omit } from 'lodash';
import { LinkSchemaClass } from '../entities/link.entity';

@Injectable()
export class LinkDocumentRepository implements LinkRepository {
  constructor(
    @InjectModel(LinkSchemaClass.name)
    private readonly linkModel: Model<LinkSchemaClass>,
  ) {}

  async create(link: LinkModel): Promise<LinkModel> {
    const persistenceModel = LinkMapper.toPersistence(link);
    const created = new this.linkModel(persistenceModel);
    const saved = await created.save();

    const fullEntity = await this.linkModel
      .findById(saved._id)
      .populate(['domain', 'androidApp', 'iosApp'])
      .lean();

    if (!fullEntity) {
      throw new Error(`Link with ID ${saved._id} not found after creation`);
    }

    return LinkMapper.toDomain(fullEntity as LinkSchemaClass);
  }

  async update(
    id: string,
    updates: Omit<Partial<LinkModel>, 'domainDetails' | 'androidApp' | 'iosApp'>,
  ): Promise<LinkModel | null> {
    const safeUpdates = omit(updates, ['id']) as UpdateQuery<LinkSchemaClass>;

    await this.linkModel.updateOne({ _id: id }, safeUpdates);
    const updated = await this.linkModel
      .findById(id)
      .populate(['domain', 'androidApp', 'iosApp'])
      .lean();

    return updated ? LinkMapper.toDomain(updated as LinkSchemaClass) : null;
  }

  async findById(id: string): Promise<LinkModel | null> {
    const entity = await this.linkModel
      .findById(id)
      .populate(['domain', 'androidApp', 'iosApp'])
      .lean();

    return entity ? LinkMapper.toDomain(entity as LinkSchemaClass) : null;
  }

  async findOne(
    filter: Partial<LinkModel>,
    options?: { withRelations?: boolean },
  ): Promise<LinkModel | null> {
    const cleanedFilter = Object.fromEntries(
      Object.entries(filter).filter(([_, v]) => v !== null && v !== undefined),
    ) as FilterQuery<LinkSchemaClass>;

    const query = this.linkModel.findOne(cleanedFilter);
    if (options?.withRelations) {
      query.populate(['domain', 'androidApp', 'iosApp']);
    }

    const entity = await query.lean();
    return entity ? LinkMapper.toDomain(entity as LinkSchemaClass) : null;
  }

  async find(): Promise<LinkModel[]> {
    const entities = await this.linkModel
      .find()
      .populate('domain')
      .lean();

    return entities.map((entity) =>
      LinkMapper.toDomain(entity as LinkSchemaClass),
    );
  }

  async delete(id: string): Promise<void> {
    await this.linkModel.deleteOne({ _id: id });
  }
}
