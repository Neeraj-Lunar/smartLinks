import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { ApplicationRepository } from './infrastructure/persistence/application.repository';
import { CreateApplicationDto } from './dto/create-application-dto';
import { ApplicationModel } from './domain/applications.model';
import { UpdateApplicationDto } from './dto/update-application-dto';
import gplay from 'google-play-scraper';
import { Platform } from '../shared/enums/platform.enum';
import { AppData } from './interface/app-data.interface';
import { DomainService } from 'src/domains/domains.service';
import { DomainModel } from 'src/domains/domain/domain.model';

@Injectable()
export class ApplicationService {
  constructor(
    private readonly applicationRepo: ApplicationRepository,
    private readonly domainService: DomainService,
  ) {}

  async create(createApplicationDto: CreateApplicationDto): Promise<ApplicationModel> {
    const domainDetails = await this.domainService.findByCond({project: createApplicationDto.projectId})
    const data = {
      ...createApplicationDto,
      project: { id: createApplicationDto.projectId},
      domain: {id: domainDetails.id}
    }
    return this.applicationRepo.create(data);
  }

  async find(): Promise<ApplicationModel[]> {
    const app = await this.applicationRepo.find();
    if (!app) {
      throw new NotFoundException(`Application not found`);
    }
    return app;
  }

  async findById(id: string): Promise<ApplicationModel> {
    const app = await this.applicationRepo.findById(id);
    if (!app) {
      throw new NotFoundException(`Application not found`);
    }
    return app;
  }

  async appWellKnownInfo(subDomain: string): Promise<ApplicationModel[]> {
    const domain = await this.domainService.findByCond({domainName: subDomain})
    const app = await this.applicationRepo.findAll({domain: { id :domain.id}});
    if (!app) {
      throw new NotFoundException(`Application not found`);
    }
    return app;
  }

  async getAppDomainByPackageId(packageId: string): Promise<DomainModel> {
    if (!packageId) {
      throw new NotFoundException(`packageId is required`);
    }
    const app = await this.applicationRepo.findOne({packageId}, { withRelations: true });
    if (!app) {
      throw new NotFoundException(`Application not found`);
    }

    if (!app.project.id) {
      throw new NotFoundException(`Application not found`);
    }
    const domain = await this.domainService.findByProjectId(app.project.id)
    if (!domain) {
      throw new NotFoundException(`Domains not found`);
    }
    return domain;
  }

  async getAppDataByCond(condition: Partial<ApplicationModel>, options: { withRelations?: boolean }): Promise<ApplicationModel> {
    const app = await this.applicationRepo.findOne(condition, options);
    if (!app) {
      throw new NotFoundException(`Application not found`);
    }
    return app;
  }

  async getallAppsDataByCond(condition: Partial<ApplicationModel>, options?: { withRelations?: boolean }): Promise<ApplicationModel[]> {
    const app = await this.applicationRepo.findAll(condition, options);
    if (!app) {
      throw new NotFoundException(`Applications not found`);
    }
    return app;
  }

  async update(id:string, updateApplicationDto: UpdateApplicationDto): Promise<ApplicationModel> {
    const existing = await this.applicationRepo.findById(id);
    if (!existing) {
      throw new NotFoundException(`Application not found`);
    }
    const updated = await this.applicationRepo.update(id, updateApplicationDto);
    if (!updated) {
      throw new InternalServerErrorException('Failed to update application');
    }
    return updated
  }

  async delete(id: string): Promise<void> {
    const app = await this.applicationRepo.findById(id);
    if (!app) {
      throw new NotFoundException(`Application not found`);
    }
    await this.applicationRepo.delete(id);
  }

  async extractIosMetadata(storeUrl: string): Promise<AppData> {
    const match = storeUrl.match(/id(\d+)/);
    if (!match) {
      throw new Error('Invalid iOS App Store URL');
    }
  
    const appId = match[1];
    const res = await fetch(`https://itunes.apple.com/lookup?id=${appId}`);
    const json = await res.json();
  
    if (!json.results || json.results.length === 0) {
      throw new Error('App not found in iTunes Lookup API');
    }
  
    const app = json.results[0];
  
    return {
      name: app.trackName,
      icon: app.artworkUrl100,
      genre: app.primaryGenreName,
      os: Platform.IOS,
      packageId: app.bundleId,
      bundleId: app.trackId.toString(),
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
