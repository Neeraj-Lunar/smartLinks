import { Expose } from 'class-transformer';
import { StatusEnums } from '../../shared/enums/status.enum';
import { Platform } from '../../shared/enums/platform.enum';
import { ProjectModel } from 'src/projects/domain/project.model';

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
  projectId: number;

  @Expose()
  project?: ProjectModel | null;

  @Expose()
  imageUrl: string | null;

  @Expose()
  storeUrl: string | null;

  @Expose()
  fallbackUrl: string | null;

  @Expose()
  category: string | null;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}