import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { LinkRepository } from './infrastructure/persistence/link.repository';
import { LinkModel } from './domain/link.model';
import { CreateLinkDto } from './dto/create-link-dto';
import { UpdateLinkDto } from './dto/update-link-dto';
import { DomainService } from 'src/domains/domains.service';
import { createShortCode } from 'src/utils/short-code.util';
import { ApplicationService } from 'src/application/application.service';
import { Platform } from 'src/shared/enums/platform.enum';
import { ApplicationModel } from 'src/application/domain/applications.model';


@Injectable()
export class LinkService {
  constructor(
    private readonly linkRepo: LinkRepository,
    private readonly domainService: DomainService,
    private readonly applicationService: ApplicationService,
  ) {}

  async createLink(data: any): Promise<LinkModel> {
    const shortUrl = await this.generateUniqueShortUrlWithCheck();
    const fullUrl = this.buildFullUrl(shortUrl, data.params);
    return await this.linkRepo.create({
      domainId: data.domainId,               
      androidAppId: data.androidAppId,           
      iosAppId: data.iosAppId,             
      params: data.params,
      shortUrl,
      fullUrl,
    });
  }

  async create(data: CreateLinkDto) {
    const { androidApp, iosApp, domain } = await this.resolveAppsAndDomain(data);
  
    const linkData = await this.createLink({
      ...data,
      androidAppId: androidApp.id,
      iosAppId: iosApp.id,
      domainId: domain.id,
    });
  
    return {
      redirectionUrl: linkData.shortUrl,
    };
  }
  
  private async resolveAppsAndDomain(data: CreateLinkDto) {
    if (data.packageId) {
      return this.resolveUsingSinglePackageId(data.packageId);
    }
  
    if (data.androidPackageId && data.iosPackageId) {
      return this.resolveUsingBothPackageIds(data.androidPackageId, data.iosPackageId);
    }
  
    throw new BadRequestException('Missing packageId');
  }
  
  private async resolveUsingSinglePackageId(packageId: string) {
    const domain = await this.domainService.getAppDomainByPackageId(packageId);
    const apps = await this.applicationService.getallAppsDataByCond({ projectId: domain.projectId });
  
    const androidApp = apps.find(app => app.os === Platform.ANDROID);
    const iosApp = apps.find(app => app.os === Platform.IOS);
  
    if (!androidApp) throw new NotFoundException('Android app not found');
    if (!iosApp) throw new NotFoundException('iOS app not found');
  
    return { androidApp, iosApp, domain };
  }
  
  private async resolveUsingBothPackageIds(androidId: string, iosId: string) {
    const androidApp = await this.applicationService.getAppDataByCond({ id: androidId }, { withRelations: true });
    const iosApp = await this.applicationService.getAppDataByCond({ id: iosId }, { withRelations: true });
    const domain = await this.domainService.getAppDomainByPackageId(androidId); 
    return { androidApp, iosApp, domain };
  }

  private async generateUniqueShortUrlWithCheck(): Promise<string> {
    let code: string;
    let exists = true;
    do {
      code = createShortCode();
      exists = !!(await this.linkRepo.findOne({ shortUrl: code }));
    } while (exists);
    return code;
  }

  private buildFullUrl(short: string, params?: Record<string, any>): string {
    if (!params || Object.keys(params).length === 0) return short;

    const query = new URLSearchParams(params as Record<string, string>).toString();
    return `${short}?${query}`;
  }

  async extractParameters(shortUrl: string) {
    const linkDetails = await this.linkRepo.findOne({shortUrl: shortUrl});
    return linkDetails?.params || null;
  }

  async find(): Promise<LinkModel[]> {
    const links = await this.linkRepo.find();
    if (!links || links.length === 0) {
      throw new NotFoundException(`No links found`);
    }
    return links;
  }

  async getRedirectionInfo(shortUrl: string, deviceInfo: { platform?: string }) {
    const link = await this.linkRepo.findOne(
      { shortUrl },
      { withRelations: true }
    );
  
    if (!link) {
      throw new NotFoundException(`Short URL not found`);
    }
  
    const { androidApp, iosApp, params } = link;
    const platform = deviceInfo.platform?.toLowerCase();
  
    const resolvePlatformUrl = (app?: ApplicationModel | null): string | null => app?.storeUrl ?? null;
    const resolveFallBackUrl = (app?: ApplicationModel | null): string | null => app?.fallbackUrl ?? null;
    const resolvePlatformPackageId = (app?: ApplicationModel | null): string | null => app?.packageId ?? null;
    if (platform === Platform.ANDROID || platform === Platform.IOS) {
      const app = platform === Platform.ANDROID ? androidApp : iosApp;
      const storeUrl = resolvePlatformUrl(app);
      const packageId = resolvePlatformPackageId(app)
      const fallbackUrl = resolveFallBackUrl(app)
      return {
        storeUrl,
        fallbackUrl,
        packageId,
        meta: {
          params,
          platform
        },
      };
    }
  
    return {
      androidstoreUrl: resolvePlatformUrl(androidApp),
      iosStoreUrl: resolvePlatformUrl(iosApp),
      fallbackUrl: androidApp?.fallbackUrl || iosApp?.fallbackUrl || '',
      androidPackageId: androidApp?.packageId || '',
      iosPackageId: iosApp?.packageId || '',
      meta: {
        params,
      },
    };
  }

  async findById(id: number): Promise<LinkModel> {
    const link = await this.linkRepo.findById(id);
    if (!link) {
      throw new NotFoundException(`Link with ID ${id} not found`);
    }
    return link;
  }

  async update(id: number, updateLinkDto: UpdateLinkDto): Promise<LinkModel> {
    const existing = await this.linkRepo.findById(id);
    if (!existing) {
      throw new NotFoundException(`Link with ID ${id} not found`);
    }

    const updated = await this.linkRepo.update(id, updateLinkDto);

    if (!updated) {
      throw new InternalServerErrorException('Failed to update link');
    }

    return updated;
  }

  async delete(id: number): Promise<void> {
    const link = await this.linkRepo.findById(id);
    if (!link) {
      throw new NotFoundException(`Link with ID ${id} not found`);
    }
    await this.linkRepo.delete(id);
  }
}
