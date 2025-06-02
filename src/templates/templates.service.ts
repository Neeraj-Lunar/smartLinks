import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { TemplateRepository } from './infrastructure/persistence/template.repository';
import { CreateTemplateDto } from './dto/create-template-dto';
import { UpdateTemplateDto } from './dto/update-template-dto';
import { ApplicationService } from 'src/application/application.service';
import { TemplateModel } from './domain/template.model';
import { ApplicationModel } from 'src/application/domain/applications.model';


@Injectable()
export class TemplateService {
  constructor(
    private readonly templateRepo: TemplateRepository,
    private readonly applicationService: ApplicationService
  ) {}

  async create(createTemplateDto: CreateTemplateDto): Promise<TemplateModel> {
    const {
      name,
      androidAppId,
      iosAppId,
      installedRdt,
      notInstalledRdt,
      desktopRdt,
      status,
    } = createTemplateDto;
  
    if (!androidAppId && !iosAppId) {
      throw new BadRequestException('Either androidAppId or iosAppId must be provided');
    }
  
    let androidApp: ApplicationModel | null = null;
    let iosApp: ApplicationModel | null = null;
  
    if (androidAppId) {
      androidApp = await this.applicationService.findById(androidAppId);
      if (!androidApp) throw new BadRequestException('Invalid androidAppId');
    }
  
    if (iosAppId) {
      iosApp = await this.applicationService.findById(iosAppId);
      if (!iosApp) throw new BadRequestException('Invalid iosAppId');
    }
  
    const domainModel = new TemplateModel();
    domainModel.name = name;
    domainModel.status = status;
    domainModel.androidApp = androidApp;
    domainModel.iosApp = iosApp;
    domainModel.installedRdt = installedRdt;
    domainModel.notInstalledRdt = notInstalledRdt;
    domainModel.desktopRdt = desktopRdt;
  
    return this.templateRepo.create(domainModel);
  }

  async find(): Promise<TemplateModel[]> {
    const app = await this.templateRepo.find();
    if (!app) {
      throw new NotFoundException(`Application not found.`);
    }
    return app;
  }

  async findById(id: number): Promise<TemplateModel> {
    const template = await this.templateRepo.findById(id);
    if (!template) {
      throw new NotFoundException('Template not found');
    }
    return template;
  }

  async update(id: number, updateTemplateDto: UpdateTemplateDto): Promise<TemplateModel> {
    const existing = await this.templateRepo.findById(id);
    if (!existing) {
      throw new NotFoundException('Template not found');
    }

    const updated = await this.templateRepo.update(id, updateTemplateDto);
    if (!updated) {
      throw new InternalServerErrorException('Failed to update template');
    }

    return updated;
  }

  async delete(id: number): Promise<void> {
    const existing = await this.templateRepo.findById(id);
    if (!existing) {
      throw new NotFoundException('Template not found');
    }

    await this.templateRepo.delete(id);
  }
}
