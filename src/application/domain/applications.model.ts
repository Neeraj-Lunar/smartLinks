import { Expose } from 'class-transformer';
import { StatusEnums } from '../../shared/enums/status.enum';
import { Platform } from '../../shared/enums/platform.enum';
import { SdkIntegrationPlatform } from '../enums/sdk-integration-platform.enum';

export class ApplicationModel {
  @Expose()
  id: string | number;

  @Expose()
  name: string;

  @Expose()
  os: Platform;

  @Expose()
  status: StatusEnums;

  @Expose()
  packageId: string;

  @Expose()
  sdkKey: string | null;

  @Expose()
  sdkList: SdkIntegrationPlatform[];

  @Expose()
  imageUrl: string | null;

  @Expose()
  storeUrl: string | null;

  @Expose()
  category: string | null;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}