import {
  IsString,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { StatusEnums } from 'src/shared/enums/status.enum';

export class CreateProjectDto {
  @ApiProperty({ example: 'Campaign 2025', description: 'Name of the project' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    enum: StatusEnums,
    example: StatusEnums.ACTIVE,
    description: 'Status of the project',
  })
  @IsEnum(StatusEnums)
  status: StatusEnums;
}
