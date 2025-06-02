import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class DesktopRedirectTemplate {
  @IsBoolean()
  storeRdt: boolean;

  @IsOptional()
  @IsString()
  urlRdt?: string | null;
}
