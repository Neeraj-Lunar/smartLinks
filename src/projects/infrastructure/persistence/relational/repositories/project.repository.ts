import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CONNECTION_NAME } from '../../../../../config/constants';
import { omit } from 'lodash';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { ProjectRepository } from '../../project.repository';
import { ProjectEntity } from '../entities/project.entity';
import { ProjectModel } from 'src/projects/domain/project.model';
import { ProjectMapper } from '../mappers/project.mapper';


@Injectable()
export class PgProjectRepository implements ProjectRepository {
  constructor(
    @InjectRepository(ProjectEntity, CONNECTION_NAME)
    private readonly repo: Repository<ProjectEntity>,
  ) {}

  async create(template: ProjectModel): Promise<ProjectModel> {
    const persistenceModel = ProjectMapper.toPersistence(template);
    const entity = this.repo.create(persistenceModel);
    const saved = await this.repo.save(entity);
    return ProjectMapper.toDomain(saved);
  }

  async update(id: number, updates: Partial<ProjectModel>): Promise<ProjectModel | null> {
    const safeUpdates = omit(updates, ['id']) as QueryDeepPartialEntity<ProjectEntity>;
    await this.repo.update(id, safeUpdates);
    const updated = await this.repo.findOne({
      where: { id },
      relations: ['androidApp', 'iosApp'],
    });
    return updated ? ProjectMapper.toDomain(updated) : null;
  }

  async findById(id: number): Promise<ProjectModel | null> {
    const entity = await this.repo.findOne({
      where: { id }
    });
    return entity ? ProjectMapper.toDomain(entity) : null;
  }

  async findOne(filter: Partial<ProjectModel>): Promise<ProjectModel | null> {
    const cleanedFilter: any = Object.fromEntries(
      Object.entries(filter).filter(([_, v]) => v !== null && v !== undefined)
    );
  
    const entity = await this.repo.findOneBy(cleanedFilter);
  
    return entity ? ProjectMapper.toDomain(entity) : null;
  }

  async find(): Promise<ProjectModel[]> {
    const entities = await this.repo.find();
    return entities.map((entity) => ProjectMapper.toDomain(entity));
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
