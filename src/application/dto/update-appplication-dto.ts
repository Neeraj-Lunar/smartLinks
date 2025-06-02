import { IsString, IsOptional, IsEnum, IsUrl, IsArray, IsNotEmpty } from 'class-validator';
import { Platform } from 'src/shared/enums/platform.enum';
import { StatusEnums } from 'src/shared/enums/status.enum';
import { SdkIntegrationPlatform } from 'src/application/enums/sdk-integration-platform.enum';

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
  @IsString()
  sdkKey?: string;

  @IsOptional()
  @IsArray()
  @IsEnum(SdkIntegrationPlatform, { each: true })
  sdkList?: SdkIntegrationPlatform[];

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
