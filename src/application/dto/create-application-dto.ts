import { IsString, IsNotEmpty, IsEnum, IsOptional, IsUrl, IsArray, IsNumber } from 'class-validator';
import { Platform } from 'src/shared/enums/platform.enum';
import { StatusEnums } from '../../shared/enums/status.enum';

export class CreateApplicationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(StatusEnums)
  status: StatusEnums;

  @IsEnum(Platform)
  os: Platform;

  @IsString()
  @IsNotEmpty()
  packageId: string;

  @IsNumber()
  @IsNotEmpty()
  projectId: number;

  @IsOptional()
  @IsUrl()
  imageUrl: string;

  @IsOptional()
  @IsUrl()
  storeUrl: string;

  @IsOptional()
  @IsString()
  category: string;
}
