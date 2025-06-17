import {
  Module
} from '@nestjs/common';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { documentApplicationPersistenceModule } from './infrastructure/persistence/document/relational-persistence.module';
import { DomainModule } from 'src/domains/domains.module';


const infrastructurePersistenceModule = documentApplicationPersistenceModule

@Module({
  imports: [infrastructurePersistenceModule, DomainModule],
  controllers: [ApplicationController],
  providers: [ApplicationService],
  exports: [ApplicationService, infrastructurePersistenceModule],
})
export class ApplicationModule {}
