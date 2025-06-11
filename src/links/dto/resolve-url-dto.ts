import {
    IsOptional,
  IsString,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class ResolveUrlDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ description: 'Platform ID', example: 'android' })
  platform?: string;
}
