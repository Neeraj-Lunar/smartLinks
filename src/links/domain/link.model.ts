import { Expose } from 'class-transformer';
import { ApplicationModel } from 'src/application/domain/applications.model';
import { DomainModel } from 'src/domains/domain/domain.model';

export class LinkModel {
  @Expose()
  id: number;

  @Expose()
  name?: string | null;

  @Expose()
  domainId: number;

  @Expose()
  domainDetails?: DomainModel | null;

  @Expose()
  shortUrl: string | null;

  @Expose()
  fullUrl: string | null;

  @Expose()
  androidAppId: number;

  @Expose()
  iosAppId: number;

  @Expose()
  androidApp?: ApplicationModel | null;

  @Expose()
  iosApp?: ApplicationModel | null;

  @Expose()
  params?: Record<string, any> | null;

  @Expose()
  expiredAt?: Date;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
