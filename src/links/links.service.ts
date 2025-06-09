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
import { Platform } from 'src/shared/enums/platform.enum';
import { DomainService } from 'src/domains/domains.service';
import { createShortCode } from 'src/utils/short-code.util';


@Injectable()
export class LinkService {
  constructor(
    private readonly linkRepo: LinkRepository,
     private readonly domainService: DomainService,
  ) {}

  async create(dto: CreateLinkDto) {
    if (dto.domainId && dto.packageId) {
      throw new BadRequestException(`Provide only one of domainId or packageId, not both`);
    }
    if (dto.domainId) {
      return this.createLinkWithDomainId(dto);
    }
    if (dto.packageId) {
      return this.createLinkWithPackageId(dto);
    }
    throw new BadRequestException(`Either domainId or packageId is required`);
  }
  
  async createLinkWithDomainId(dto: CreateLinkDto): Promise<LinkModel> {
    const shortUrl = await this.generateUniqueShortUrlWithCheck();
    const fullUrl = this.buildFullUrl(shortUrl, dto.params);
  
    return await this.linkRepo.create({
      ...dto,
      shortUrl,
      fullUrl,
    });
  }

  async createLinkWithPackageId(data: CreateLinkDto) {
    const appDomain = await this.domainService.getAppDomainByPackageId(data.packageId);  
    const linkData = await this.createLinkWithDomainId({ ...data, domainId: appDomain.id });
    return {
      redirectionUrl: linkData.shortUrl,
      metaData: {
        name: linkData.name,
        shortUrl: linkData.shortUrl,
        fullUrl: linkData.fullUrl,
        params: linkData.params
      },
    };
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
    return linkDetails?.params;
  }

  async find(): Promise<LinkModel[]> {
    const links = await this.linkRepo.find();
    if (!links || links.length === 0) {
      throw new NotFoundException(`No links found`);
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
      metaData: {
        shortUrl: link.shortUrl,
        fullUrl: link.fullUrl,
        params: link.params,
        platform: deviceInfo.platform
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
