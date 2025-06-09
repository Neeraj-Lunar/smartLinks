import {
  Module,
} from '@nestjs/common';
import { RelationalLinkPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { LinkService } from './links.service';
import { LinkController } from './links.controller';
import { DomainModule } from 'src/domains/domains.module';
import { ApplicationModule } from 'src/application/application.module';

const infrastructurePersistenceModule = RelationalLinkPersistenceModule
@Module({
  imports: [infrastructurePersistenceModule, DomainModule, ApplicationModule],
  controllers: [LinkController],
  providers: [LinkService],
  exports: [LinkService, infrastructurePersistenceModule],
})
export class LinkModule {}
