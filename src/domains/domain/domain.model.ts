import { Expose, Type } from 'class-transformer';
import { ProjectModel } from 'src/projects/domain/project.model';
import { StatusEnums } from 'src/shared/enums/status.enum';

export class DomainModel {
  @Expose()
  id: number;

  @Expose()
  domainName: string;

  @Expose()
  status: StatusEnums;

  @Expose()
  projectId: number;

  @Expose()
  @Type(() => ProjectModel)
  project?: ProjectModel;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
