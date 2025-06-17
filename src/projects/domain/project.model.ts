import { Expose } from 'class-transformer';
import { StatusEnums } from 'src/shared/enums/status.enum';

export class ProjectModel {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  status: StatusEnums;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
