import {
  IsString,
  IsOptional,
  IsUrl,
  IsNumber,
  IsDate,
  IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateLinkDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  shortUrl?: string;

  @IsOptional()
  @IsUrl()
  fullUrl?: string;

  @IsOptional()
  @IsNumber()
  templateId?: number;

  @IsOptional()
  @IsObject()
  params?: Record<string, any>;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  expiredAt?: Date;
}
