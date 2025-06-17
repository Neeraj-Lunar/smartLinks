import {
  Module,
} from '@nestjs/common';
import { LinkService } from './links.service';
import { LinkController } from './links.controller';
import { ApplicationModule } from 'src/application/application.module';
import { documentLinkPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

const infrastructurePersistenceModule = documentLinkPersistenceModule
@Module({
  imports: [infrastructurePersistenceModule, ApplicationModule],
  controllers: [LinkController],
  providers: [LinkService],
  exports: [LinkService, infrastructurePersistenceModule],
})
export class LinkModule {}
