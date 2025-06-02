import { Expose, Type } from 'class-transformer';
import { ApplicationModel } from 'src/application/domain/applications.model';
import { StatusEnums } from 'src/shared/enums/status.enum';
import { InstalledRedirectTemplate } from './installed-redirect.model';
import { NotInstalledRedirectTemplate } from './not-installed-redirect.model';
import { DesktopRedirectTemplate } from './web-redirect.model';

export class TemplateModel {
  @Expose()
  id: string | number;

  @Expose()
  name: string;

  @Expose()
  androidApp: ApplicationModel | null;

  @Expose()
  androidAppId: number | null;

  @Expose()
  iosApp: ApplicationModel | null;

  @Expose()
  iosAppId: number | null;

  @Expose()
  @Type(() => InstalledRedirectTemplate)
  installedRdt: InstalledRedirectTemplate;

  @Expose()
  @Type(() => NotInstalledRedirectTemplate)
  notInstalledRdt: NotInstalledRedirectTemplate;

  @Expose()
  @Type(() => DesktopRedirectTemplate)
  desktopRdt: DesktopRedirectTemplate;

  @Expose()
  status: StatusEnums;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
