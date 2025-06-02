import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  HttpCode,
  HttpStatus,
  Req,
  Res,
} from '@nestjs/common';
import { LinkService } from './links.service';
import { CreateLinkDto } from './dto/create-link-dto';
import { UpdateLinkDto } from './dto/update-link-dto';
import { Response, Request } from 'express';

@Controller('links')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Get()
  async findAll() {
    const links = await this.linkService.find();
    return {
      result: links,
    };
  }

  @Get('resolve/:shortCode')
  async resolveLink(
    @Param('shortCode') shortUrl: string,
    @Body() deviceInfo: any,
  ) {
    const links = await this.linkService.getRedirectionInfo(shortUrl, deviceInfo);
    return {
      result: links,
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createLinkDto: CreateLinkDto) {
    const link = await this.linkService.create(createLinkDto);
    return {
      result: link,
    };
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    const link = await this.linkService.findById(id);
    return {
      result: link,
    };
  }

  @Post(':id')
  async update(
    @Param('id') id: number,
    @Body() updateLinkDto: UpdateLinkDto,
  ) {
    const link = await this.linkService.update(id, updateLinkDto);
    return {
      result: link,
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.linkService.delete(id);
    return {
      message: 'Link deleted successfully',
    };
  }
}
