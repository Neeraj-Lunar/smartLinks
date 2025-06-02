import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

export class InstalledRedirectTemplate {
  @IsOptional()
  @IsString()
  fallback?: string | null;

  @IsOptional()
  @IsBoolean()
  androidStoreRdt?: boolean | null;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  androidAppRdt?: string[] | null;

  @IsOptional()
  @IsBoolean()
  iosStoreRdt?: boolean | null;

  @IsOptional()
  @IsString()
  iosAppRdt?: string | null;
}
