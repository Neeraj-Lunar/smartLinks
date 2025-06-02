import {
  Module,
} from '@nestjs/common';
import { DatabaseConfig } from '../database/config/database-config.type';
import databaseConfig from '../database/config/database.config';
import { RelationalLinkPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { LinkService } from './links.service';
import { LinkController } from './link.controller';

// const infrastructurePersistenceModule = (databaseConfig() as DatabaseConfig).isDocumentDatabase
//   ? DocumentApplicationPersistenceModule
//   : RelationalApplicationPersistenceModule;

const infrastructurePersistenceModule = RelationalLinkPersistenceModule
@Module({
  imports: [infrastructurePersistenceModule],
  controllers: [LinkController],
  providers: [LinkService],
  exports: [LinkService, infrastructurePersistenceModule],
})
export class LinkModule {}
