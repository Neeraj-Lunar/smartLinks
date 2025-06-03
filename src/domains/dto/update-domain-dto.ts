import {
  IsString,
  IsOptional,
  IsEnum,
  IsInt,
  Min,
} from 'class-validator';
import { StatusEnums } from 'src/shared/enums/status.enum';

export class UpdateDomainDto {
  @IsOptional()
  @IsString()
  domainName?: string;

  @IsOptional()
  @IsEnum(StatusEnums)
  status?: StatusEnums;

  @IsOptional()
  @IsInt()
  @Min(1, { message: 'ProjectId must be a positive integer' })
  ProjectId?: number;
}
