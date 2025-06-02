import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CONNECTION_NAME } from '../../../../config/constants';
import { LinkEntity } from './entities/link.entity';
import { PgLinkRepository } from './repositories/link.repository';
import { LinkRepository } from '../link.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([LinkEntity], CONNECTION_NAME),
  ],
  providers: [
    PgLinkRepository,
    {
      provide: LinkRepository,
      useExisting: PgLinkRepository,
    },
  ],
  exports: [LinkRepository, PgLinkRepository],
})
export class RelationalLinkPersistenceModule {}
