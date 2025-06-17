import {
  IsString,
  IsOptional,
  IsObject,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateLinkDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Package ID', example: 'com.example.app' })
  packageId: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Android Package ID', example: 'com.example.app' })
  iosPackageId: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Ios Package ID', example: 'id123456789' })
  androidPackageId: string;
  
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'Link Name' })
  name: string;

  @IsObject()
  @IsOptional()
  @ApiPropertyOptional({ example: { ref: '123', tag: 'abc' } })
  params: object;
}
