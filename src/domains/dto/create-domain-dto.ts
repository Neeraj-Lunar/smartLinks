import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsInt,
  Min,
} from 'class-validator';
import { StatusEnums } from 'src/shared/enums/status.enum';

export class CreateDomainDto {
  @IsString()
  @IsNotEmpty()
  domainName: string;

  @IsEnum(StatusEnums)
  status: StatusEnums;

  @IsInt()
  @Min(1, { message: 'ProjectId must be a positive integer' })
  projectId: number;
}
