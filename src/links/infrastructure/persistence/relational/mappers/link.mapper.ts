import { LinkModel } from 'src/links/domain/link.model';
import { LinkEntity } from '../entities/link.entity';
import { TemplateMapper } from 'src/templates/infrastructure/persistence/relational/mappers/template.mapper';
import { DomainEntity } from 'src/domains/infrastructure/persistence/relational/entities/domain.entity';
import { DomainModel } from 'src/domains/domain/domain.model';

export class LinkMapper {
  static toDomain(raw: LinkEntity): LinkModel {
    const domain = new LinkModel();
    domain.id = raw.id;
    domain.name = raw.name;
    domain.domainId = raw.domainId;
    domain.shortUrl = `http://${raw.domainDetails.domainName}/${raw.shortUrl}`;
    domain.fullUrl = `http://${raw.domainDetails.domainName}/${raw.fullUrl}`;
    domain.templateId = raw.templateId;
    if(raw.template){
      domain.template = raw.template ? TemplateMapper.toDomain(raw.template) : null;
    }
    
    domain.params = raw.params ?? null;
    domain.createdAt = raw.createdAt;
    domain.updatedAt = raw.updatedAt;
    return domain;
  }

  static toPersistence(domain: LinkModel): LinkEntity {
    const entity = new LinkEntity();

    if (domain.id) {
      entity.id = domain.id;
    }

    entity.name = domain.name;
    entity.domainId = domain.domainId;
    entity.shortUrl = domain.shortUrl;
    entity.fullUrl = domain.fullUrl;
    entity.templateId = domain.templateId;
    entity.params = domain.params || null;

    return entity;
  }

  static toApplicationDomainData (raw: DomainModel): LinkModel {
    const domain = new LinkModel();
    if(raw.project) {
      domain.name = raw?.project.name;
    }
    domain.fullUrl = `https://${raw.domainName}`;
    return domain;
  }
}
