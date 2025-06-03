import {
  IsString,
  IsOptional,
  IsEnum,
  IsInt,
  Min,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { StatusEnums } from 'src/shared/enums/status.enum';

export class UpdateDomainDto {
  @ApiPropertyOptional({
    example: 'new-example.com',
    description: 'Updated domain name',
  })
  @IsOptional()
  @IsString()
  domainName?: string;

  @ApiPropertyOptional({
    enum: StatusEnums,
    example: StatusEnums.ACTIVE,
    description: 'Updated status of the domain',
  })
  @IsOptional()
  @IsEnum(StatusEnums)
  status?: StatusEnums;

  @ApiPropertyOptional({
    example: 2,
    description: 'Updated associated project ID',
  })
  @IsOptional()
  @IsInt()
  @Min(1, { message: 'ProjectId must be a positive integer' })
  ProjectId?: number;
}
