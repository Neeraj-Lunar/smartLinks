import { Expose } from 'class-transformer';
import { ApplicationModel } from 'src/application/domain/applications.model';
import { DomainModel } from 'src/domains/domain/domain.model';

export class LinkModel {
  @Expose()
  id: string; // Mongo ObjectId as string

  @Expose()
  name?: string | null;

  @Expose()
  domainId: string; // changed from number → string

  @Expose()
  domain?: DomainModel | null; // changed from domainDetails for consistency

  @Expose()
  shortUrl: string | null;

  @Expose()
  fullUrl: string | null;

  @Expose()
  androidAppId: string;

  @Expose()
  iosAppId: string;

  @Expose()
  androidApp?: ApplicationModel | null;

  @Expose()
  iosApp?: ApplicationModel | null;

  @Expose()
  params?: Record<string, any> | null;

  @Expose()
  expiredAt?: Date | null;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
