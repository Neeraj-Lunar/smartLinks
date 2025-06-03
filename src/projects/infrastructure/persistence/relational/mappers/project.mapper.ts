import { ProjectModel } from "src/projects/domain/project.model";
import { ProjectEntity } from "../entities/project.entity";



export class ProjectMapper {
  static toDomain(entity: ProjectEntity): ProjectModel {
    const domain = new ProjectModel();

    domain.id = entity.id;
    domain.name = entity.name;
    domain.status = entity.status;
    domain.createdAt = entity.createdAt;
    domain.updatedAt = entity.updatedAt;

    return domain;
  }

  static toPersistence(domain: ProjectModel): ProjectEntity {
    const entity = new ProjectEntity();

    if (domain.id) {
      entity.id = Number(domain.id);
    }
    entity.name = domain.name;
    entity.status = domain.status;

    return entity;
  }
}
