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
import { CreateApplicationDto } from './dto/create-application-dto';
import { UpdateApplicationDto } from './dto/update-application-dto';
import { ApplicationService } from './application.service';

@Controller('applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createApplicationDto: CreateApplicationDto,
  ) {
    const applications = await this.applicationService.create(createApplicationDto);
    return {
      result: applications
    }
  }

  @Get('/getUrlData')
  @HttpCode(HttpStatus.CREATED)
  async getAppData(@Body() body: { storeUrl: string }) {
    const applicationData = await this.applicationService.getAppMetadata(body.storeUrl);
    return {
      result: applicationData,
    };
  }

  @Get()
  async findAll() {
    const applications = await this.applicationService.find();
    return {
      result: applications
    }
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    const application = await this.applicationService.findById(id);
    return {
      result: application
    }
  }

  @Post('/:id')
  async update(
    @Param('id') id: string, 
    @Body() updateApplicationDto: UpdateApplicationDto,
  ) {
    const data =  await this.applicationService.update(id, updateApplicationDto);
    return {
       result: data
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.applicationService.delete(id);
    return {
      message : "application deleted successfully"
    }
  }
}
