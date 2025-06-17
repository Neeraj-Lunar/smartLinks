import { ProjectModel } from 'src/projects/domain/project.model';
import { ProjectSchemaClass } from '../entities/project.entity';

export class ProjectMapper {
  static toDomain(entity: ProjectSchemaClass): ProjectModel {
    const domain = new ProjectModel();

    domain.id = entity._id?.toString();
    domain.name = entity.name;
    domain.status = entity.status;
    domain.createdAt = entity.createdAt;
    domain.updatedAt = entity.updatedAt;

    return domain;
  }

  static toPersistence(domain: ProjectModel): Partial<ProjectSchemaClass> {
    const entity: Partial<ProjectSchemaClass> = {
      name: domain.name,
      status: domain.status,
    };

    return entity;
  }
}
