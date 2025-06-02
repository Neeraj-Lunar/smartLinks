import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationEntity } from './entities/application.entity';
import { PgApplicationRepository } from './repositories/application.repository';
import { ApplicationRepository } from '../application.repository';
import { CONNECTION_NAME } from '../../../../config/constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([ApplicationEntity], CONNECTION_NAME),
  ],
  providers: [
    PgApplicationRepository,
    {
      provide: ApplicationRepository,
      useExisting: PgApplicationRepository,
    },
  ],
  exports: [ApplicationRepository, PgApplicationRepository],
})
export class RelationalApplicationPersistenceModule {}
