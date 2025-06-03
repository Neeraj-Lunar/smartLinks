import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { LinkRepository } from './infrastructure/persistence/link.repository';
import { LinkModel } from './domain/link.model';
import { CreateLinkDto } from './dto/create-link-dto';
import { UpdateLinkDto } from './dto/update-link-dto';
import { nanoid } from 'nanoid';
import { Platform } from 'src/shared/enums/platform.enum';
import { ApplicationService } from 'src/application/application.service';
import { LinkMapper } from './infrastructure/persistence/relational/mappers/link.mapper';
import { DomainMapper } from 'src/domains/infrastructure/persistence/relational/mappers/domain.mapper';


@Injectable()
export class LinkService {
  constructor(
    private readonly linkRepo: LinkRepository,
    private readonly applicationService: ApplicationService,
  ) {}

  async create(dto: CreateLinkDto): Promise<LinkModel> {
    const shortUrl = await this.generateUniqueShortUrl();
    const fullUrl = this.buildFullUrl(shortUrl, dto.params);

    return this.linkRepo.create({
      ...dto,
      shortUrl,
      fullUrl,
    });
  }

  async getAppLink(data: any) {
    if (!data.packageId) {
      throw new NotFoundException(`packageId is required`);
    }
    const appDomain = await this.applicationService.getAppDomain({ packageId: data.package_id });
    const onlyPackageId = Object.keys(data).length === 1;
    if (onlyPackageId) {
      return LinkMapper.toApplicationDomainData(appDomain);
    }
  
  
    const linkData = await this.create({...data, domainId:appDomain.id});
    return {
      redirectionUrl: linkData.shortUrl,
      linkMeta: {
        name: linkData.name,
        shortUrl: linkData.shortUrl,
        fullUrl: linkData.fullUrl
      }
    };
  }


  private async generateUniqueShortUrl(): Promise<string> {
    const short = nanoid(7);
    const exists = await this.linkRepo.findOne({ shortUrl: short });
    if (exists) return this.generateUniqueShortUrl();

    return short;
  }

  private buildFullUrl(short: string, params?: Record<string, any>): string {
    if (!params || Object.keys(params).length === 0) return short;

    const query = new URLSearchParams(params as Record<string, string>).toString();
    return `${short}?${query}`;
  }

  async find(): Promise<LinkModel[]> {
    const links = await this.linkRepo.find();
    if (!links || links.length === 0) {
      throw new NotFoundException(`No links found.`);
    }
    return links;
  }

  async getRedirectionInfo(short: string, deviceInfo: { platform: string }) {
    const link = await this.linkRepo.findOne(
      { shortUrl: short },
      { withRelations: true }
    );
  
    if (!link) {
      throw new NotFoundException(`No link found for ${short}`);
    }

    if (!link.template) {
      throw new NotFoundException(`No Template found for ${short}`);
    }
  
    const template = link.template || null;
    const { notInstalledRdt, desktopRdt, androidApp, iosApp } = template;
  
    let redirectionUrl: string | null = null;
  
    switch (deviceInfo.platform.toLowerCase()) {
      case Platform.ANDROID:
          redirectionUrl = androidApp?.storeUrl || notInstalledRdt.androidUrlRdt || null;
        break;
      case Platform.IOS:
          redirectionUrl = iosApp?.storeUrl || notInstalledRdt.iosUrlRdt || null;
        break;
      case Platform.DESKTOP:
      default:
        redirectionUrl = desktopRdt.urlRdt || null;
        break;
    }
  
    return {
      redirectionUrl,
      linkMeta: {
        shortUrl: link.shortUrl,
        fullUrl: link.fullUrl,
        Platform: deviceInfo.platform
      },
    };
  }

  async findById(id: number): Promise<LinkModel> {
    const link = await this.linkRepo.findById(id);
    if (!link) {
      throw new NotFoundException(`Link with ID ${id} not found.`);
    }
    return link;
  }

  async update(id: number, updateLinkDto: UpdateLinkDto): Promise<LinkModel> {
    const existing = await this.linkRepo.findById(id);
    if (!existing) {
      throw new NotFoundException(`Link with ID ${id} not found.`);
    }

    const updated = await this.linkRepo.update(id, updateLinkDto);

    if (!updated) {
      throw new InternalServerErrorException('Failed to update link.');
    }

    return updated;
  }

  async delete(id: number): Promise<void> {
    const link = await this.linkRepo.findById(id);
    if (!link) {
      throw new NotFoundException(`Link with ID ${id} not found.`);
    }
    await this.linkRepo.delete(id);
  }
}
