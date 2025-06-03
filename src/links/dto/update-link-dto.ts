import {
  IsString,
  IsOptional,
  IsUrl,
  IsNumber,
  IsDate,
  IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateLinkDto {
  @ApiPropertyOptional({ example: 'Updated Promo Link' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 1, description: 'Updated domain ID if needed' })
  @IsOptional()
  @IsNumber()
  domainId: number;

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

  @ApiPropertyOptional({ example: 2, description: 'New template ID if changing the redirect rules' })
  @IsOptional()
  @IsNumber()
  templateId?: number;

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
