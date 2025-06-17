import { LinkModel } from 'src/links/domain/link.model';
import { Types } from 'mongoose';
import { LinkSchemaClass } from '../entities/link.entity';
import { ApplicationMapper } from 'src/application/infrastructure/persistence/document/mappers/application.mapper';
import { isPopulated } from 'src/utils/is-populated-ref';

export class LinkMapper {
  static toDomain(raw: LinkSchemaClass): LinkModel {
    const domain = new LinkModel();

    domain.id = raw._id?.toString();
    domain.name = raw.name;
    domain.shortUrl = raw.shortUrl;
    domain.fullUrl = raw.fullUrl;
    domain.params = raw.params ?? null;
    domain.expiredAt = raw.expiredAt;
    domain.createdAt = raw.createdAt;
    domain.updatedAt = raw.updatedAt;

    if (isPopulated(raw.domain)) {
      domain.shortUrl = `http://${raw.domain.domainName}/${raw.shortUrl}`;
      domain.fullUrl = `http://${raw.domain.domainName}/${raw.fullUrl}`;
    }

    if (isPopulated(raw.androidApp)) {
      domain.androidApp = ApplicationMapper.toDomain(raw.androidApp);
    }

    if (isPopulated(raw.iosApp)) {
      domain.iosApp = ApplicationMapper.toDomain(raw.iosApp);
    }

    return domain;
  }

  static toPersistence(domain: LinkModel): Partial<LinkSchemaClass> {
    const persistence: Partial<LinkSchemaClass> = {};

    if (domain.id) {
      persistence._id = domain.id;
    }

    persistence.name = domain.name;
    persistence.shortUrl = domain.shortUrl;
    persistence.fullUrl = domain.fullUrl;
    persistence.params = domain.params ?? null;
    persistence.expiredAt = domain.expiredAt ?? null;
    persistence.createdAt = domain.createdAt;
    persistence.updatedAt = domain.updatedAt;

    if (domain.domainId) {
      persistence.domain = new Types.ObjectId(domain.domainId);
    }

    if (domain.androidAppId) {
      persistence.androidApp = new Types.ObjectId(domain.androidAppId);
    }

    if (domain.iosAppId) {
      persistence.iosApp = new Types.ObjectId(domain.iosAppId);
    }

    return persistence;
  }
}
