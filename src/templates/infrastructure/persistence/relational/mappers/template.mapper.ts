import { plainToInstance } from 'class-transformer';
import { TemplateEntity } from '../entities/template.entity';
import { TemplateModel } from 'src/templates/domain/template.model';
import { InstalledRedirectTemplate } from 'src/templates/domain/installed-redirect.model';
import { NotInstalledRedirectTemplate } from 'src/templates/domain/not-installed-redirect.model';
import { DesktopRedirectTemplate } from 'src/templates/domain/web-redirect.model';

export class TemplateMapper {
  static toDomain(entity: TemplateEntity): TemplateModel {
    const domain = new TemplateModel();

    domain.id = entity.id;
    domain.name = entity.name;

    domain.androidAppId = entity.androidAppId;
    domain.iosAppId = entity.iosAppId
    if (entity.androidApp) {
      domain.androidApp = entity.androidApp;
    }
    if (entity.iosApp) {
      domain.iosApp = entity.androidApp;
    }

    if (entity.installedRdt) {
      domain.installedRdt = plainToInstance(
        InstalledRedirectTemplate,
        entity.installedRdt,
      );
    }

    if (entity.notInstalledRdt) {
      domain.notInstalledRdt = plainToInstance(
        NotInstalledRedirectTemplate,
        entity.notInstalledRdt,
      );
    }

    if (entity.desktopRdt) {
      domain.desktopRdt = plainToInstance(
        DesktopRedirectTemplate,
        entity.desktopRdt,
      );
    }
    domain.status = entity.status;
    domain.createdAt = entity.createdAt;
    domain.updatedAt = entity.updatedAt;

    return domain;
  }

  static toPersistence(domain: TemplateModel): TemplateEntity {
    const entity = new TemplateEntity();

     if (domain.id) {
       entity.id = Number(domain.id);
     }
    entity.name = domain.name;
    entity.status = domain.status;

    entity.androidAppId = Number(domain.androidApp?.id) ?? null;
    entity.iosAppId = Number(domain.iosApp?.id) ?? null;

    entity.installedRdt = domain.installedRdt
      ? {
          fallback: domain.installedRdt.fallback,
          androidStoreRdt: domain.installedRdt.androidStoreRdt,
          androidAppRdt: domain.installedRdt.androidAppRdt,
          iosStoreRdt: domain.installedRdt.iosStoreRdt,
          iosAppRdt: domain.installedRdt.iosAppRdt,
        }
      : null;

    entity.notInstalledRdt = domain.notInstalledRdt
      ? {
          iosStoreRdt: domain.notInstalledRdt.iosStoreRdt,
          iosUrlRdt: domain.notInstalledRdt.iosUrlRdt,
          androidStoreRdt: domain.notInstalledRdt.androidStoreRdt,
          androidUrlRdt: domain.notInstalledRdt.androidUrlRdt,
        }
      : null;

    entity.desktopRdt = domain.desktopRdt
      ? {
          storeRdt: domain.desktopRdt.storeRdt,
          urlRdt: domain.desktopRdt.urlRdt,
        }
      : null;

    return entity;
  }
}
