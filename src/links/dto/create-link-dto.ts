import {
  IsString,
  IsOptional,
  IsNumber,
  IsObject,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateLinkDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Package ID', example: 'com.example.app' })
  packageId: string;
  
  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: 'Domain ID', example: '1' })
  domainId: number;

  @IsString()
  @ApiPropertyOptional({ example: 'Link Name' })
  name: string;

  @IsObject()
  @ApiPropertyOptional({ example: { ref: '123', tag: 'abc' } })
  params: object;

  @IsNumber()
  @ApiPropertyOptional({ example: 1 })
  templateId: number;
}
