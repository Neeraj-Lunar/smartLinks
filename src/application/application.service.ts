import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { ApplicationRepository } from './infrastructure/persistence/application.repository';
import { CreateApplicationDto } from './dto/create-application-dto';
import { ApplicationModel } from './domain/applications.model';
import { UpdateApplicationDto } from './dto/update-application-dto';
import * as appStore from 'app-store-scraper';
import gplay from 'google-play-scraper';
import { Platform } from '../shared/enums/platform.enum';
import { AppData } from './interface/app-data.interface';
import { DomainService } from 'src/domains/domains.service';
import { DomainModel } from 'src/domains/domain/domain.model';

@Injectable()
export class ApplicationService {
  constructor(
    private readonly applicationRepo: ApplicationRepository,
    private readonly domainService: DomainService
  ) {}

  async create(createApplicationDto: CreateApplicationDto): Promise<ApplicationModel> {
    const existing = await this.applicationRepo.findOne({packageId: createApplicationDto.packageId});
    if (existing) {
      throw new BadRequestException(`Application already exists.`);
    }
    return this.applicationRepo.create(createApplicationDto);
  }

  async getAppData(storeUrl: string): Promise<any> {
    const decodedUrl = decodeURIComponent(storeUrl);

    let appleAppId: string | null = null;
    let androidPackageId: string | null = null;

    if (decodedUrl.includes('apps.apple.com')) {
      const match = decodedUrl.match(/id(\d+)/);
      appleAppId = match ? match[1] : null;
    }

    if (decodedUrl.includes('play.google.com')) {
      const match = decodedUrl.match(/id=([a-zA-Z0-9_.]+)/);
      androidPackageId = match ? match[1] : null;
    }

    return {
      originalUrl: storeUrl,
      decodedUrl,
      appleAppId,
      androidPackageId,
    };
  }

  async find(): Promise<ApplicationModel[]> {
    const app = await this.applicationRepo.find();
    if (!app) {
      throw new NotFoundException(`Application not found.`);
    }
    return app;
  }

  async findById(id: number): Promise<ApplicationModel> {
    const app = await this.applicationRepo.findById(id);
    if (!app) {
      throw new NotFoundException(`Application not found.`);
    }
    return app;
  }

  async getAppDomain(cond: any): Promise<DomainModel> {
    const app = await this.applicationRepo.findOne(cond, { withRelations: true });
    if (!app) {
      throw new NotFoundException(`Application not found.`);
    }
    const domain = await this.domainService.findByCond({projectId: app.projectId})
    return domain;
  }

  async update(id:string, updateApplicationDto: UpdateApplicationDto): Promise<ApplicationModel> {
    const existing = await this.applicationRepo.findById(id);
    if (!existing) {
      throw new NotFoundException(`Application not found.`);
    }
    const updated = await this.applicationRepo.update(id, updateApplicationDto);
    if (!updated) {
      throw new InternalServerErrorException('Failed to update application');
    }
    return updated
  }

  async delete(id: number): Promise<void> {
    const app = await this.applicationRepo.findById(id);
    if (!app) {
      throw new NotFoundException(`Application not found.`);
    }
    await this.applicationRepo.delete(id);
  }

  async extractIosMetadata(storeUrl: string): Promise<AppData> {
    const match = storeUrl.match(/id(\d+)/);
    if (!match) throw new Error('Invalid iOS App Store URL');
    const appId = match[1];

    const app = await appStore.app({ id: appId });
  
    return {
      name: app.title,
      icon: app.icon,
      genre: app.primaryGenre,
      os: Platform.IOS,
      packageId: match[0],
      storeUrl,
    };
  }

  async extractAndroidMetadata(storeUrl: string): Promise<AppData> {
    const url = new URL(storeUrl);
    const packageId = url.searchParams.get('id');
    if (!packageId) throw new Error('Invalid Google Play Store URL');
  
    const app = await gplay.app({ appId: packageId });
  
    return {
      name: app.title,
      icon: app.icon,
      genre: app.genre,
      os: Platform.ANDROID,
      packageId,
      storeUrl,
    };
  }


  async getAppMetadata(storeUrl: string): Promise<AppData> {
    if (!storeUrl || typeof storeUrl !== 'string') {
      throw new BadRequestException('Invalid or empty store URL');
    }
  
    try {
      const url = new URL(storeUrl);
      if (url.hostname.includes('apps.apple.com')) {
        return this.extractIosMetadata(storeUrl);
      }
      if (url.hostname.includes('play.google.com')) {
        return this.extractAndroidMetadata(storeUrl);
      }
      throw new BadRequestException('Unsupported store URL');
    } catch (error) {
      throw new BadRequestException('Malformed or unsupported store URL');
    }
  }
}
