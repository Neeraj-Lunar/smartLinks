import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  HttpCode,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { CreateTemplateDto } from './dto/create-template-dto';
import { UpdateTemplateDto } from './dto/update-template-dto';
import { TemplateService } from './templates.service';

@Controller('templates')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createTemplateDto: CreateTemplateDto,
  ) {
    const applications = await this.templateService.create(createTemplateDto);
    return {
      result : applications
    }
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    const application = await this.templateService.findById(id);
    return {
      result : application
    }
  }

  @Get()
  async findAll() {
    const applications = await this.templateService.find();
    return {
      result: applications
    }
  }

  @Post(':id')
  async update(
    @Param('id') id: number,
    @Body() updateTemplateDto: UpdateTemplateDto,
  ){
    const data = await this.templateService.update(id, updateTemplateDto);
    return {
      result : data
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.templateService.delete(id);
    return {
      message : "application deleted successfully"
    }
  }
}
