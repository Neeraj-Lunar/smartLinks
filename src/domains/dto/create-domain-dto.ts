import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsInt,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { StatusEnums } from 'src/shared/enums/status.enum';

export class CreateDomainDto {
  @ApiProperty({
    example: 'example.com',
    description: 'The domain name',
  })
  @IsString()
  @IsNotEmpty()
  domainName: string;

  @ApiProperty({
    enum: StatusEnums,
    example: StatusEnums.ACTIVE,
    description: 'The status of the domain',
  })
  @IsEnum(StatusEnums)
  status: StatusEnums;

  @ApiProperty({
    example: 1,
    description: 'The associated project ID',
  })
  @IsInt()
  @Min(1, { message: 'ProjectId must be a positive integer' })
  projectId: string;
}
