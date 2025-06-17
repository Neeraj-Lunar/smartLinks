import { Expose, Type } from 'class-transformer';
import { ProjectModel } from 'src/projects/domain/project.model';
import { StatusEnums } from 'src/shared/enums/status.enum';

export class DomainModel {
  @Expose()
  id: string;

  @Expose()
  domainName: string;

  @Expose()
  status: StatusEnums;

  @Expose()
  projectId: string;

  @Expose()
  @Type(() => ProjectModel)
  project?: string | ProjectModel;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
