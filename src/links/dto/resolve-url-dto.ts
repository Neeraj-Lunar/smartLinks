import {
    IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResolveUrlDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Platform ID', example: 'android' })
  platform: string;
}
