import { DomainModel } from 'src/domains/domain/domain.model';
import { DomainEntity } from '../entities/domain.entity';
import { ProjectMapper } from 'src/projects/infrastructure/persistence/relational/mappers/project.mapper';

export class DomainMapper {
  static toDomain(entity: DomainEntity): DomainModel {
    const domain = new DomainModel();

    domain.id = entity.id;
    domain.domainName = entity.domainName;
    domain.status = entity.status;
    domain.projectId = entity.projectId;
    if(entity.project) {
      domain.project = ProjectMapper.toDomain(entity.project);
    }
    domain.createdAt = entity.createdAt;
    domain.updatedAt = entity.updatedAt;

    return domain;
  }

  static toPersistence(domain: DomainModel): DomainEntity {
    const entity = new DomainEntity();

    if (domain.id) {
      entity.id = Number(domain.id);
    }
    entity.domainName = domain.domainName;
    entity.status = domain.status;
    entity.projectId = domain.projectId;

    return entity;
  }
}
