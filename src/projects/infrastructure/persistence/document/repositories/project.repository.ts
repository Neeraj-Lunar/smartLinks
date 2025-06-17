import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { ProjectModel } from 'src/projects/domain/project.model';
import { ProjectMapper } from '../mappers/project.mapper';
import { ProjectRepository } from '../../project.repository';
import { omit } from 'lodash';
import { ProjectSchemaClass } from '../entities/project.entity';

@Injectable()
export class ProjectDocumentRepository implements ProjectRepository {
  constructor(
    @InjectModel(ProjectSchemaClass.name)
    private readonly projectModel: Model<ProjectSchemaClass>,
  ) {}

  async create(template: ProjectModel): Promise<ProjectModel> {
    const persistenceModel = ProjectMapper.toPersistence(template);
    const created = new this.projectModel(persistenceModel);
    const saved = await created.save();
    return ProjectMapper.toDomain(saved);
  }

  async update(id: string, updates: Partial<ProjectModel>): Promise<ProjectModel | null> {
    const safeUpdates = omit(updates, ['id']) as UpdateQuery<ProjectSchemaClass>;
    await this.projectModel.updateOne({ _id: id }, safeUpdates);
    const updated = await this.projectModel.findById(id).lean();
    return updated ? ProjectMapper.toDomain(updated as ProjectSchemaClass) : null;
  }

  async findById(id: string): Promise<ProjectModel | null> {
    const entity = await this.projectModel.findById(id).lean();
    return entity ? ProjectMapper.toDomain(entity as ProjectSchemaClass) : null;
  }

  async findOne(filter: Partial<ProjectModel>): Promise<ProjectModel | null> {
    const cleanedFilter = Object.fromEntries(
      Object.entries(filter).filter(([_, v]) => v !== null && v !== undefined)
    ) as FilterQuery<ProjectSchemaClass>;

    const entity = await this.projectModel.findOne(cleanedFilter).lean();
    return entity ? ProjectMapper.toDomain(entity as ProjectSchemaClass) : null;
  }

  async find(): Promise<ProjectModel[]> {
    const entities = await this.projectModel.find().lean();
    return entities.map(entity => ProjectMapper.toDomain(entity as ProjectSchemaClass));
  }

  async delete(id: string): Promise<void> {
    await this.projectModel.deleteOne({ _id: id });
  }
}
