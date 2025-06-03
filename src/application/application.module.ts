import {
  Module
} from '@nestjs/common';
import { DatabaseConfig } from '../database/config/database-config.type';
import databaseConfig from '../database/config/database.config';
import { RelationalApplicationPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { DomainModule } from 'src/domains/domains.module';

// const infrastructurePersistenceModule = (databaseConfig() as DatabaseConfig).isDocumentDatabase
//   ? DocumentApplicationPersistenceModule
//   : RelationalApplicationPersistenceModule;
const infrastructurePersistenceModule = RelationalApplicationPersistenceModule

@Module({
  imports: [infrastructurePersistenceModule, DomainModule],
  controllers: [ApplicationController],
  providers: [ApplicationService],
  exports: [ApplicationService, infrastructurePersistenceModule],
})
export class ApplicationModule {}
