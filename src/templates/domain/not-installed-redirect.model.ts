import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class NotInstalledRedirectTemplate {
  @IsBoolean()
  iosStoreRdt?: boolean;

  @IsOptional()
  @IsString()
  iosUrlRdt?: string | null;

  @IsBoolean()
  androidStoreRdt?: boolean;

  @IsOptional()
  @IsString()
  androidUrlRdt?: string | null;
}
