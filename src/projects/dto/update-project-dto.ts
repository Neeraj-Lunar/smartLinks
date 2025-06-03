import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { StatusEnums } from 'src/shared/enums/status.enum';

export class UpdateProjectDto {
  @ApiPropertyOptional({ example: 'New Project Name', description: 'Updated project name' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiPropertyOptional({
    enum: StatusEnums,
    example: StatusEnums.INACTIVE,
    description: 'Updated project status',
  })
  @IsOptional()
  @IsEnum(StatusEnums)
  status?: StatusEnums;
}
