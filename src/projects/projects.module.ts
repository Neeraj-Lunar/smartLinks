import {
  Module
} from '@nestjs/common';
// import { DatabaseConfig } from '../database/config/database-config.type';
// import databaseConfig from '../database/config/database.config';
import { RelationalProjectPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { ProjectController } from './projects.controller';
import { ProjectService } from './projects.service';
import { DomainModule } from 'src/domains/domains.module';


// import { DocumentApplicationPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';


// const infrastructurePersistenceModule = (databaseConfig() as DatabaseConfig).isDocumentDatabase
//   ? DocumentApplicationPersistenceModule
//   : RelationalTemplatePersistenceModule;
const infrastructurePersistenceModule = RelationalProjectPersistenceModule
@Module({
  imports: [infrastructurePersistenceModule, DomainModule],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService, infrastructurePersistenceModule],
})
export class ProjectModule {}
