import { Expose } from 'class-transformer';
import { DomainModel } from 'src/domains/domain/domain.model';
import { TemplateModel } from 'src/templates/domain/template.model';

export class LinkModel {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  domainId: number;

  @Expose()
  domainDetails?: DomainModel | null;

  @Expose()
  shortUrl: string | null;

  @Expose()
  fullUrl: string | null;

  @Expose()
  templateId: number;

  @Expose()
  template?: TemplateModel | null;

  @Expose()
  params?: Record<string, any> | null;

  @Expose()
  expiredAt?: Date;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
