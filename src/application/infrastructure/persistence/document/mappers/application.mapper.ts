
import { ApplicationModel } from 'src/application/domain/applications.model';
import { ApplicationSchemaClass } from '../entities/application.entity';
import { ProjectMapper } from 'src/projects/infrastructure/persistence/document/mappers/project.mapper';
import { DomainMapper } from 'src/domains/infrastructure/persistence/document/mappers/domain.mapper';
import { DomainSchemaClass } from 'src/domains/infrastructure/persistence/document/entities/domain.entity';
import { ProjectSchemaClass } from 'src/projects/infrastructure/persistence/document/entities/project.entity';
import { isPopulated } from 'src/utils/is-populated-ref';

export class ApplicationMapper {
  static toDomain(entity: ApplicationSchemaClass): ApplicationModel {

    const domainEntity = new ApplicationModel();

    domainEntity.id = entity._id.toString();
    domainEntity.name = entity.name;
    domainEntity.os = entity.os;
    domainEntity.status = entity.status;
    domainEntity.packageId = entity.packageId;
    domainEntity.bundleId = entity.bundleId;
    domainEntity.iosTeamId = entity.iosTeamId;
    domainEntity.imageUrl = entity.imageUrl;
    domainEntity.storeUrl = entity.storeUrl;
    domainEntity.fallbackUrl = entity.fallbackUrl;
    domainEntity.category = entity.category;

    if (isPopulated(entity.project)) {
      domainEntity.project = ProjectMapper.toDomain(entity.project);
    } else if (entity.project) {
      domainEntity.project = { id: entity.project.toString() }
    }

    if (isPopulated(entity.domain)) {
      domainEntity.domain = DomainMapper.toDomain(entity.domain);
    } else if (entity.domain) {
      domainEntity.domain = { id: entity.domain.toString() }
    }

    return domainEntity;
  }

  static toPersistence(domain: ApplicationModel): ApplicationSchemaClass {
    const entity = new ApplicationSchemaClass();

    if (domain.id) {
      entity._id = domain.id;
    }

    entity.name = domain.name;
    entity.os = domain.os;
    entity.status = domain.status;
    entity.packageId = domain.packageId;
    entity.bundleId = domain.bundleId;
    entity.iosTeamId = domain.iosTeamId;
    entity.imageUrl = domain.imageUrl;
    entity.storeUrl = domain.storeUrl;
    entity.fallbackUrl = domain.fallbackUrl;
    entity.category = domain.category;

    if (domain.project?.id) {
      const projectEntity = new ProjectSchemaClass();
      projectEntity._id = domain.project.id;
      entity.project = projectEntity;
    }

    if (domain.domain?.id) {
      const domainEntity = new DomainSchemaClass();
      domainEntity._id = domain.domain.id;
      entity.domain = domainEntity;
    }

    return entity;
  }
}
