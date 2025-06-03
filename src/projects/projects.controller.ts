import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project-dto';
import { UpdateProjectDto } from './dto/update-project-dto';
import { ProjectService } from './projects.service';


@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createProjectDto: CreateProjectDto,
  ) {
    const applications = await this.projectService.create(createProjectDto);
    return {
      result : applications
    }
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    const application = await this.projectService.findById(id);
    return {
      result : application
    }
  }

  @Get()
  async findAll() {
    const applications = await this.projectService.find();
    return {
      result: applications
    }
  }

  @Post(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProjectDto: UpdateProjectDto,
  ){
    const data = await this.projectService.update(id, updateProjectDto);
    return {
      result : data
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.projectService.delete(id);
    return {
      message : "Project deleted successfully"
    }
  }
}
