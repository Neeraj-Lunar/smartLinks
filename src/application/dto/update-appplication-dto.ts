import { IsString, IsOptional, IsEnum, IsUrl, IsArray, IsNotEmpty, IsNumber } from 'class-validator';
import { Platform } from 'src/shared/enums/platform.enum';
import { StatusEnums } from 'src/shared/enums/status.enum';

export class UpdateApplicationDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum(Platform)
  os?: Platform;

  @IsOptional()
  @IsEnum(StatusEnums)
  status?: StatusEnums;

  @IsOptional()
  @IsString()
  packageId?: string;

  @IsOptional()
  @IsNumber()
  projectId: number;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @IsOptional()
  @IsUrl()
  storeUrl?: string;

  @IsOptional()
  @IsString()
  category?: string;
}
