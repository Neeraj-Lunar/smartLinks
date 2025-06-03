import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CONNECTION_NAME } from '../../../../config/constants';
import { DomainEntity } from './entities/domain.entity';
import { PgDomainRepository } from './repositories/domain.repository';
import { DomainRepository } from '../domain.repository';


@Module({
  imports: [
    TypeOrmModule.forFeature([DomainEntity], CONNECTION_NAME),
  ],
  providers: [
    PgDomainRepository,
    {
      provide: DomainRepository,
      useExisting: PgDomainRepository,
    },
  ],
  exports: [DomainRepository, PgDomainRepository],
})
export class RelationalDomainPersistenceModule {}
