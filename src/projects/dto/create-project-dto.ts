import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsEmail,
  Matches,
} from 'class-validator';
import { StatusEnums } from 'src/shared/enums/status.enum';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(StatusEnums)
  status: StatusEnums;
}
