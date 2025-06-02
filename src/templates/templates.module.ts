import {
  Module
} from '@nestjs/common';
// import { DatabaseConfig } from '../database/config/database-config.type';
// import databaseConfig from '../database/config/database.config';
import { RelationalTemplatePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { TemplateController } from './templates.controller';
import { TemplateService } from './templates.service';
import { ApplicationModule } from 'src/application/application.module';

// import { DocumentApplicationPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';


// const infrastructurePersistenceModule = (databaseConfig() as DatabaseConfig).isDocumentDatabase
//   ? DocumentApplicationPersistenceModule
//   : RelationalTemplatePersistenceModule;
const infrastructurePersistenceModule = RelationalTemplatePersistenceModule
@Module({
  imports: [infrastructurePersistenceModule, ApplicationModule],
  controllers: [TemplateController],
  providers: [TemplateService],
  exports: [TemplateService, infrastructurePersistenceModule],
})
export class TemplateModule {}
