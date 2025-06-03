import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CONNECTION_NAME } from '../../../../config/constants';

import { PgProjectRepository } from './repositories/project.repository';
import { ProjectEntity } from './entities/project.entity';
import { ProjectRepository } from '../project.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectEntity], CONNECTION_NAME),
  ],
  providers: [
    PgProjectRepository,
    {
      provide: ProjectRepository,
      useExisting: PgProjectRepository,
    },
  ],
  exports: [ProjectRepository, PgProjectRepository],
})
export class RelationalProjectPersistenceModule {}
