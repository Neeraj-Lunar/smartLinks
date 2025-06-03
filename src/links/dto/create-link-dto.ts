import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsUrl,
  IsDate,
  IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateLinkDto {
  @ApiProperty({ example: 'Promo' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 1, description: 'Domain ID this link belongs to' })
  @IsNumber()
  @IsNotEmpty()
  domainId: number;

  @ApiProperty({ example: 2, description: 'Template ID to be used for redirection rules' })
  @IsNumber()
  @IsNotEmpty()
  templateId: number;

  @ApiPropertyOptional({
    example: { campaign: 'summer2025', utm_source: 'newsletter' },
    description: 'Optional key-value parameters to append in the link',
  })
  @IsOptional()
  @IsObject()
  params?: Record<string, any>;

  @ApiPropertyOptional({
    example: '2025-07-01T00:00:00.000Z',
    description: 'Optional expiry date for the link',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  expiredAt?: Date;
}
