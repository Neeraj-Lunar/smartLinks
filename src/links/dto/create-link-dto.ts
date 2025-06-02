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

export class CreateLinkDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  domainName: string;

  @IsNumber()
  @IsNotEmpty()
  templateId: number;

  @IsOptional()
  @IsObject()
  params?: Record<string, any>;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  expiredAt?: Date;
}
