import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { DomainRepository } from 'src/domains/infrastructure/persistence/domain.repository';
import { CreateDomainDto } from 'src/domains/dto/create-domain-dto';
import { StatusEnums } from 'src/shared/enums/status.enum';
import { ProjectRepository } from './infrastructure/persistence/project.repository';
import { CreateProjectDto } from './dto/create-project-dto';
import { ProjectModel } from './domain/project.model';
import { UpdateProjectDto } from './dto/update-project-dto';
import { INTERNAL_DOMAIN_NAME } from 'src/config/constants';
import { DomainService } from 'src/domains/domains.service';


@Injectable()
export class ProjectService {
  constructor(private readonly ProjectRepo: ProjectRepository,
    private readonly domainService: DomainService
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<ProjectModel> {
    const existing = await this.ProjectRepo.findOne({ name :createProjectDto.name});
    if (existing) {
      throw new BadRequestException(`Project already exists`);
    }
    const project = await this.ProjectRepo.create(createProjectDto);
    const name = createProjectDto.name.toLowerCase().replace(/\s+/g, '');
    const domainData:CreateDomainDto = {
      domainName : `${name}.${INTERNAL_DOMAIN_NAME}`,
      status: StatusEnums.ACTIVE,
      projectId: project.id
    }
    await this.domainService.create(domainData)
    return project;
  }

  async find(): Promise<ProjectModel[]> {
    const org = await this.ProjectRepo.find();
    if (!org) {
      throw new NotFoundException(`Project not found`);
    }
    return org;
  }

  async findById(id: string): Promise<ProjectModel> {
    const org = await this.ProjectRepo.findById(id);
    if (!org) {
      throw new NotFoundException(`Project not found`);
    }
    return org;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<ProjectModel> {
    const existing = await this.ProjectRepo.findById(id);
    if (!existing) {
      throw new NotFoundException(`Project not found`);
    }
    const updated = await this.ProjectRepo.update(id, updateProjectDto);
    if (!updated) {
      throw new InternalServerErrorException('Failed to update Project');
    }
    return updated
  }

  async delete(id: string): Promise<void> {
    const org = await this.ProjectRepo.findById(id);
    if (!org) {
      throw new NotFoundException(`Project not found`);
    }
    await this.ProjectRepo.delete(id);
  }

}
