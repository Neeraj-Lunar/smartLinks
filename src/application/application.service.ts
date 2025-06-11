import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { ApplicationRepository } from './infrastructure/persistence/application.repository';
import { CreateApplicationDto } from './dto/create-application-dto';
import { ApplicationModel } from './domain/applications.model';
import { UpdateApplicationDto } from './dto/update-application-dto';
import gplay from 'google-play-scraper';
import { Platform } from '../shared/enums/platform.enum';
import { AppData } from './interface/app-data.interface';

@Injectable()
export class ApplicationService {
  constructor(
    private readonly applicationRepo: ApplicationRepository,
  ) {}

  async create(createApplicationDto: CreateApplicationDto): Promise<ApplicationModel> {
    return this.applicationRepo.create(createApplicationDto);
  }

  async find(): Promise<ApplicationModel[]> {
    const app = await this.applicationRepo.find();
    if (!app) {
      throw new NotFoundException(`Application not found`);
    }
    return app;
  }

  async findById(id: number): Promise<ApplicationModel> {
    const app = await this.applicationRepo.findById(id);
    if (!app) {
      throw new NotFoundException(`Application not found`);
    }
    return app;
  }

  async getAppDataByCond(cond: any, options: any): Promise<ApplicationModel> {
    const app = await this.applicationRepo.findOne(cond, options);
    if (!app) {
      throw new NotFoundException(`Application not found`);
    }
    return app;
  }

  async getallAppsDataByCond(cond: any, options?: any): Promise<ApplicationModel[]> {
    const app = await this.applicationRepo.findAll(cond, options);
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

  async delete(id: number): Promise<void> {
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
