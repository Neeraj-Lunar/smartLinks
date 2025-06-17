import {
  Module
} from '@nestjs/common';
import { ProjectController } from './projects.controller';
import { ProjectService } from './projects.service';
import { DomainModule } from 'src/domains/domains.module';
import { DocumentProjectPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

const infrastructurePersistenceModule = DocumentProjectPersistenceModule
@Module({
  imports: [infrastructurePersistenceModule, DomainModule],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService, infrastructurePersistenceModule],
})
export class ProjectModule {}
