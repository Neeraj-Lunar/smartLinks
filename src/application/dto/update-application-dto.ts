import {
  IsString,
  IsOptional,
  IsEnum,
  IsUrl
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Platform } from 'src/shared/enums/platform.enum';
import { StatusEnums } from 'src/shared/enums/status.enum';

export class UpdateApplicationDto {
  @ApiPropertyOptional({
    example: 'Updated App Name',
    description: 'New name of the application',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    enum: Platform,
    example: Platform.IOS,
    description: 'Updated platform type',
  })
  @IsOptional()
  @IsEnum(Platform)
  os?: Platform;

  @ApiPropertyOptional({
    enum: StatusEnums,
    example: StatusEnums.INACTIVE,
    description: 'Updated status',
  })
  @IsOptional()
  @IsEnum(StatusEnums)
  status?: StatusEnums;

  @ApiPropertyOptional({
    example: 'com.updated.app',
    description: 'Updated package identifier',
  })
  @IsOptional()
  @IsString()
  packageId?: string;

  @ApiPropertyOptional({
    example: 'id123456789',
    description: 'bundle ID of the application',
  })
  @IsOptional()
  @IsString()
  bundleId?: string;

  @ApiPropertyOptional({
    example: 'YOUR_TEAM_ID',
    description: 'Ios Team ID of the application',
  })
  @IsOptional()
  @IsString()
  iosTeamId?: string;

  @ApiPropertyOptional({
    example: 'https://example.com/new-icon.png',
    description: 'Updated image/logo URL',
  })
  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @ApiPropertyOptional({
    example: 'https://play.google.com/store/apps/details?id=com.updated.app',
    description: 'Updated store link',
  })
  @IsOptional()
  @IsUrl()
  storeUrl?: string;

  @ApiPropertyOptional({
    example: 'https://example.com/fallback',
    description: 'Fallback URL for application',
  })
  @IsString()
  @IsOptional()
  fallbackUrl: string;

  @ApiPropertyOptional({
    example: 'Productivity',
    description: 'Updated application category',
  })
  @IsOptional()
  @IsString()
  category?: string;
}
