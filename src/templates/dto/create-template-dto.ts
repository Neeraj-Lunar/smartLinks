import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { StatusEnums } from 'src/shared/enums/status.enum';
import { InstalledRedirectTemplate } from '../domain/installed-redirect.model';
import { NotInstalledRedirectTemplate } from '../domain/not-installed-redirect.model';
import { DesktopRedirectTemplate } from '../domain/web-redirect.model';

export class CreateTemplateDto {
  @ApiProperty({ example: 'Default Template', description: 'Name of the template' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: 1, description: 'Associated Android app ID' })
  @IsOptional()
  @IsNumber()
  androidAppId?: number;

  @ApiPropertyOptional({ example: 2, description: 'Associated iOS app ID' })
  @IsOptional()
  @IsNumber()
  iosAppId?: number;

  @ApiProperty({ type: InstalledRedirectTemplate, description: 'Redirect logic when app is installed' })
  @ValidateNested()
  @Type(() => InstalledRedirectTemplate)
  installedRdt: InstalledRedirectTemplate;

  @ApiProperty({ type: NotInstalledRedirectTemplate, description: 'Redirect logic when app is not installed' })
  @ValidateNested()
  @Type(() => NotInstalledRedirectTemplate)
  notInstalledRdt: NotInstalledRedirectTemplate;

  @ApiProperty({ type: DesktopRedirectTemplate, description: 'Redirect logic for desktop users' })
  @ValidateNested()
  @Type(() => DesktopRedirectTemplate)
  desktopRdt: DesktopRedirectTemplate;

  @ApiProperty({
    enum: StatusEnums,
    example: StatusEnums.ACTIVE,
    description: 'Template status (active or inactive)',
  })
  @IsEnum(StatusEnums)
  status: StatusEnums;
}
