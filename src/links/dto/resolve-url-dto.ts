import {
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResolveUrlDto {
  @IsString()
  @ApiProperty({ description: 'Platform ID', example: 'android' })
  platform: string;
}
