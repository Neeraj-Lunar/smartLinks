import { IsString, IsNotEmpty, IsEnum, IsOptional, IsUrl, IsArray } from 'class-validator';
import { Platform } from 'src/shared/enums/platform.enum';
import { SdkIntegrationPlatform } from 'src/application/enums/sdk-integration-platform.enum';
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

  @IsOptional()
  @IsString()
  sdkKey: string;

  @IsOptional()
  @IsArray()
  @IsEnum(SdkIntegrationPlatform, { each: true })
  sdkList: SdkIntegrationPlatform[];

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
