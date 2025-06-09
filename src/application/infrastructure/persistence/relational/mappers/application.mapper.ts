import { ApplicationEntity } from '../entities/application.entity';
import { Platform } from 'src/shared/enums/platform.enum';
import { StatusEnums } from 'src/shared/enums/status.enum';
import { ApplicationModel } from 'src/application/domain/applications.model';

export class ApplicationMapper {
  static toDomain(raw: ApplicationEntity): ApplicationModel {
    const domain = new ApplicationModel();
    domain.id = raw.id;
    domain.name = raw.name;
    domain.os = raw.os as Platform;
    domain.status = raw.status as StatusEnums;
    domain.packageId = raw.packageId;
    domain.projectId = raw.projectId;
    if(raw.project) {
      domain.project = raw.project;
    }
    domain.imageUrl = raw.imageUrl ?? null;
    domain.storeUrl = raw.storeUrl ?? null;
    domain.category = raw.category ?? null;
    domain.fallbackUrl = raw.fallbackUrl ?? null;
    domain.createdAt = raw.createdAt;
    domain.updatedAt = raw.updatedAt;
    return domain;
  }

  static toPersistence(domain: ApplicationModel): ApplicationEntity {
    const entity = new ApplicationEntity();

    if (domain.id) {
      entity.id = domain.id;
    }

    entity.name = domain.name;
    entity.os = domain.os;
    entity.status = domain.status;
    entity.packageId = domain.packageId;
    entity.projectId = domain.projectId;
    entity.imageUrl = domain.imageUrl;
    entity.storeUrl = domain.storeUrl;
    entity.category = domain.category;
    entity.fallbackUrl = domain.fallbackUrl;
    entity.createdAt = domain.createdAt;
    entity.updatedAt = domain.updatedAt;

    return entity;
  }
}
