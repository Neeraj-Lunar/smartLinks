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
import { LinkService } from './links.service';
import { UpdateLinkDto } from './dto/update-link-dto';
import { ResolveUrlDto } from './dto/resolve-url-dto';
import { CreateLinkDto } from './dto/create-link-dto';

@Controller('links')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createLinkDto: CreateLinkDto) {
    const link = await this.linkService.create(createLinkDto);
    return {
      result: link,
    };
  }

  @Get()
  async findAll() {
    const links = await this.linkService.find();
    return {
      result: links,
    };
  }

  @Get('/parameters/:shortUrl')
  async extractLinkParameters(
    @Param('shortUrl') shortUrl: string,
  ) {
    const result = await this.linkService.extractParameters(shortUrl);
    return { result };
  }

  @Post('resolve/:shortUrl')
  async resolveLink(
    @Param('shortUrl') shortUrl: string,
    @Body() deviceInfo: ResolveUrlDto = {},
  ) {
    const links = await this.linkService.getRedirectionInfo(shortUrl, deviceInfo);
    return {
      result: links,
    };
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const link = await this.linkService.findById(id);
    return {
      result: link,
    };
  }

  @Post(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLinkDto: UpdateLinkDto,
  ) {
    const link = await this.linkService.update(id, updateLinkDto);
    return {
      result: link,
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.linkService.delete(id);
    return {
      message: 'Link deleted successfully',
    };
  }
}
