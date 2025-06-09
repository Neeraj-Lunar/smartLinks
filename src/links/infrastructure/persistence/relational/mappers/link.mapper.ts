import { LinkModel } from 'src/links/domain/link.model';
import { LinkEntity } from '../entities/link.entity';

export class LinkMapper {
  static toDomain(raw: LinkEntity): LinkModel {
    const domain = new LinkModel();
    domain.id = raw.id;
    domain.name = raw.name;
    domain.domainId = raw.domainId;
    if(raw.domainDetails) {
      domain.shortUrl = `http://${raw.domainDetails.domainName}/${raw.shortUrl}`;
      domain.fullUrl = `http://${raw.domainDetails.domainName}/${raw.fullUrl}`;
    }
    if(raw.androidApp){
      domain.androidApp = raw.androidApp
    }
    if(raw.iosApp){
      domain.iosApp = raw.iosApp
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
    if(domain.name){
      entity.name = domain.name;
    }
    entity.domainId = domain.domainId;
    entity.androidAppId = domain.androidAppId;
    entity.iosAppId = domain.iosAppId;
    entity.domainId = domain.domainId;
    entity.shortUrl = domain.shortUrl;
    entity.fullUrl = domain.fullUrl;
    entity.params = domain.params || null;

    return entity;
  }
}
