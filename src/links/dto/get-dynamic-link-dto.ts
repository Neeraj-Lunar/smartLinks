import {
  IsString,
  IsOptional,
  IsUrl,
  IsNumber,
  IsObject,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GetDynamicLinkDto {
  @IsString()
  @ApiProperty({ description: 'Package ID', example: 'com.example.app' })
  packageId: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'Link Name' })
  name?: string;

  @IsOptional()
  @IsObject()
  @ApiPropertyOptional({ example: { ref: '123', tag: 'abc' } })
  params?: object;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ example: 1 })
  templateId?: number;
}
