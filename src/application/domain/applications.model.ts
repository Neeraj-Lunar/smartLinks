import { Expose } from 'class-transformer';
import { StatusEnums } from '../../shared/enums/status.enum';
import { Platform } from '../../shared/enums/platform.enum';
import { ProjectModel } from 'src/projects/domain/project.model';

export class ApplicationModel {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  os: Platform;

  @Expose()
  status: StatusEnums;

  @Expose()
  packageId: string;

  @Expose()
  bundleId?: string;

  @Expose()
  iosTeamId?:string;

  @Expose()
  project: Partial<ProjectModel>;

  @Expose()
  domain: Partial<ProjectModel>;

  @Expose()
  imageUrl?: string;

  @Expose()
  storeUrl?: string;

  @Expose()
  fallbackUrl: string;

  @Expose()
  category?: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}