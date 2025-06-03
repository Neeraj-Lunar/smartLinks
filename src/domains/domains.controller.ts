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
import { CreateDomainDto } from './dto/create-domain-dto';
import { DomainService } from './domains.service';
import { UpdateDomainDto } from './dto/update-domain-dto';

@Controller('domains')
export class DomainController {
  constructor(private readonly domainService: DomainService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createDomainDto: CreateDomainDto,
  ) {
    const applications = await this.domainService.create(createDomainDto);
    return {
      result : applications
    }
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    const application = await this.domainService.findById(id);
    return {
      result : application
    }
  }

  @Get()
  async findAll() {
    const applications = await this.domainService.find();
    return {
      result: applications
    }
  }

  @Post(':id')
  async update(
    @Param('id') id: number,
    @Body() updateDomainDto: UpdateDomainDto,
  ){
    const data = await this.domainService.update(id, updateDomainDto);
    return {
      result : data
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.domainService.delete(id);
    return {
      message : "Domain deleted successfully"
    }
  }
}
