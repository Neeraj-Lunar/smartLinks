import {
  forwardRef,
  Module
} from '@nestjs/common';
// import { DatabaseConfig } from '../database/config/database-config.type';
// import databaseConfig from '../database/config/database.config';
import { DomainController } from './domains.controller';
import { RelationalDomainPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { DomainService } from './domains.service';
import { ApplicationModule } from 'src/application/application.module';

// import { DocumentApplicationPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';


// const infrastructurePersistenceModule = (databaseConfig() as DatabaseConfig).isDocumentDatabase
//   ? DocumentApplicationPersistenceModule
//   : RelationalTemplatePersistenceModule;
const infrastructurePersistenceModule = RelationalDomainPersistenceModule
@Module({
  imports: [infrastructurePersistenceModule, ApplicationModule
  ],
  controllers: [DomainController],
  providers: [DomainService],
  exports: [DomainService, infrastructurePersistenceModule],
})
export class DomainModule {}
