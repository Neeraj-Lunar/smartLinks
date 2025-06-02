import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TemplateRepository } from '../../template.repository';
import { TemplateEntity } from '../entities/template.entity';
import { TemplateModel } from '../../../../domain/template.model';
import { CONNECTION_NAME } from '../../../../../config/constants';
import { TemplateMapper } from '../mappers/template.mapper';
import { omit } from 'lodash';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class PgTemplateRepository implements TemplateRepository {
  constructor(
    @InjectRepository(TemplateEntity, CONNECTION_NAME)
    private readonly repo: Repository<TemplateEntity>,
  ) {}

  async create(template: TemplateModel): Promise<TemplateModel> {
    const persistenceModel = TemplateMapper.toPersistence(template);
    const entity = this.repo.create(persistenceModel);
    const saved = await this.repo.save(entity);
    return TemplateMapper.toDomain(saved);
  }

  async update(id: number, updates: Partial<TemplateModel>): Promise<TemplateModel | null> {
    const safeUpdates = omit(updates, ['id']) as QueryDeepPartialEntity<TemplateEntity>;
    await this.repo.update(id, safeUpdates);
    const updated = await this.repo.findOne({
      where: { id },
      relations: ['androidApp', 'iosApp'],
    });
    return updated ? TemplateMapper.toDomain(updated) : null;
  }

  async findById(id: number): Promise<TemplateModel | null> {
    const entity = await this.repo.findOne({
      where: { id },
      relations: ['androidApp', 'iosApp'],
    });
    return entity ? TemplateMapper.toDomain(entity) : null;
  }

  async find(): Promise<TemplateModel[]> {
    const entities = await this.repo.find();
    return entities.map((entity) => TemplateMapper.toDomain(entity));
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
