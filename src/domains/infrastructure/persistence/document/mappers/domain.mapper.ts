import { DomainModel } from 'src/domains/domain/domain.model';
import { Types } from 'mongoose';
import { DomainSchemaClass } from '../entities/domain.entity';
import { ProjectMapper } from 'src/projects/infrastructure/persistence/document/mappers/project.mapper';
import { isPopulated } from 'src/utils/is-populated-ref';

export class DomainMapper {
  static toDomain(entity: DomainSchemaClass): DomainModel {
    const domain = new DomainModel();

    domain.id = entity._id?.toString();
    domain.domainName = entity.domainName;
    domain.status = entity.status;
    
    if(isPopulated(entity.project)) {
      domain.project = ProjectMapper.toDomain(entity.project);
    } else if(entity.project) {
      domain.projectId = entity.project?.toString?.() ?? '';
    }
    domain.createdAt = entity.createdAt;
    domain.updatedAt = entity.updatedAt;

    return domain;
  }

  static toPersistence(domain: DomainModel): DomainSchemaClass {
    const entity = new DomainSchemaClass();
    entity.domainName = domain.domainName;
    entity.status = domain.status;
    entity.project = new Types.ObjectId(domain.projectId);
    return entity;
  }
}
