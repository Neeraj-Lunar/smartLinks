import {
  IsString,
  IsOptional,
  IsUrl,
  IsDate,
  IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateLinkDto {
  @ApiPropertyOptional({ example: 'Updated Link Name' })
  @IsOptional()
  @IsString()
  name?: string;
  
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Updated Package ID', example: 'com.example.app' })
  packageId: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Updated Android Package ID', example: 'com.example.app' })
  iosPackageId: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Updated Ios Package ID', example: 'id123456789' })
  androidPackageId: string;

  @ApiPropertyOptional({ example: 1, description: 'Updated domain ID if needed' })
  @IsOptional()
  @IsString()
  domainId: string;

  @ApiPropertyOptional({ example: 'xyz123', description: 'Short code to update' })
  @IsOptional()
  @IsString()
  shortUrl?: string;

  @ApiPropertyOptional({
    example: 'https://yourdomain.com/redirect?utm_source=email',
    description: 'Updated final full URL if required',
  })
  @IsOptional()
  @IsUrl()
  fullUrl?: string;

  @ApiPropertyOptional({
    example: { utm_medium: 'cpc', ref: 'partner1' },
    description: 'Optional updated parameters',
  })
  @IsOptional()
  @IsObject()
  params?: Record<string, any>;

  @ApiPropertyOptional({
    example: '2025-08-15T00:00:00.000Z',
    description: 'New expiration date, if updating',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  expiredAt?: Date;
}
