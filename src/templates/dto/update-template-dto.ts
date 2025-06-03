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

export class UpdateTemplateDto {
  @ApiProperty({ example: 'Updated Redirect Template', description: 'Name of the template' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: 101, description: 'Updated Android app ID' })
  @IsOptional()
  @IsNumber()
  androidAppId?: number;

  @ApiPropertyOptional({ example: 202, description: 'Updated iOS app ID' })
  @IsOptional()
  @IsNumber()
  iosAppId?: number;

  @ApiProperty({ type: InstalledRedirectTemplate, description: 'Updated redirect when app is installed' })
  @ValidateNested()
  @Type(() => InstalledRedirectTemplate)
  installedRdt: InstalledRedirectTemplate;

  @ApiProperty({ type: NotInstalledRedirectTemplate, description: 'Updated redirect when app is not installed' })
  @ValidateNested()
  @Type(() => NotInstalledRedirectTemplate)
  notInstalledRdt: NotInstalledRedirectTemplate;

  @ApiProperty({ type: DesktopRedirectTemplate, description: 'Updated redirect for desktop users' })
  @ValidateNested()
  @Type(() => DesktopRedirectTemplate)
  desktopRdt: DesktopRedirectTemplate;

  @ApiPropertyOptional({
    enum: StatusEnums,
    example: StatusEnums.INACTIVE,
    description: 'Updated status of the template',
  })
  @IsEnum(StatusEnums)
  @IsOptional()
  status?: StatusEnums;
}
