import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { StatusEnums } from 'src/shared/enums/status.enum';
import { InstalledRedirectTemplate } from '../domain/installed-redirect.model';
import { NotInstalledRedirectTemplate } from '../domain/not-installed-redirect.model';
import { DesktopRedirectTemplate } from '../domain/web-redirect.model';

export class UpdateTemplateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNumber()
  androidAppId?: number;

  @IsOptional()
  @IsNumber()
  iosAppId?: number;

  @ValidateNested()
  @Type(() => InstalledRedirectTemplate)
  installedRdt: InstalledRedirectTemplate;

  @ValidateNested()
  @Type(() => NotInstalledRedirectTemplate)
  notInstalledRdt: NotInstalledRedirectTemplate;

  @ValidateNested()
  @Type(() => DesktopRedirectTemplate)
  desktopRdt: DesktopRedirectTemplate;

  @IsEnum(StatusEnums)
  @IsOptional()
  status?: StatusEnums;
}
