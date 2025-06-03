import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsEmail,
  Matches,
} from 'class-validator';
import { StatusEnums } from 'src/shared/enums/status.enum';

export class UpdateProjectDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsEnum(StatusEnums)
  status?: StatusEnums;
}
