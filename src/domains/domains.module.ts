import {
  Module
} from '@nestjs/common';
import { DomainController } from './domains.controller';
import { DomainService } from './domains.service';
import { documentDomainPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

const infrastructurePersistenceModule = documentDomainPersistenceModule
@Module({
  imports: [infrastructurePersistenceModule],
  controllers: [DomainController],
  providers: [DomainService],
  exports: [DomainService, infrastructurePersistenceModule,],
})
export class DomainModule {}
