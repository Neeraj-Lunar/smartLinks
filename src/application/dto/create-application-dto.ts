import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsUrl,
  IsNumber,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Platform } from 'src/shared/enums/platform.enum';
import { StatusEnums } from '../../shared/enums/status.enum';

export class CreateApplicationDto {
  @ApiProperty({
    example: 'My App',
    description: 'The name of the application',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    enum: StatusEnums,
    example: StatusEnums.ACTIVE,
    description: 'Status of the application',
  })
  @IsEnum(StatusEnums)
  status: StatusEnums;

  @ApiProperty({
    enum: Platform,
    example: Platform.ANDROID,
    description: 'Platform of the application (ANDROID or IOS)',
  })
  @IsEnum(Platform)
  os: Platform;

  @ApiProperty({
    example: 'com.example.myapp',
    description: 'package ID of the application',
  })
  @IsString()
  @IsNotEmpty()
  packageId: string;

  @ApiProperty({
    example: 1,
    description: 'Associated project ID',
  })
  @IsNumber()
  @IsNotEmpty()
  projectId: number;

  @ApiPropertyOptional({
    example: 'https://example.com/icon.png',
    description: 'Optional image/logo URL of the app',
  })
  @IsOptional()
  @IsUrl()
  imageUrl: string;

  @ApiPropertyOptional({
    example: 'https://play.google.com/store/apps/details?id=com.example.myapp',
    description: 'URL to the app store',
  })
  @IsUrl()
  storeUrl: string;

  @ApiPropertyOptional({
    example: 'Games',
    description: 'category for the app',
  })
  @IsOptional()
  @IsString()
  category: string;
}
