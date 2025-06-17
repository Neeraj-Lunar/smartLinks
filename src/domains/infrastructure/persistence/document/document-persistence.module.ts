import { Module } from '@nestjs/common';
import { DomainRepository } from '../domain.repository';
import { DomainDocumentRepository } from './repositories/domain.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { DomainSchema, DomainSchemaClass } from './entities/domain.entity';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DomainSchemaClass.name, schema: DomainSchema },
    ]),
  ],
  providers: [
    DomainDocumentRepository,
    {
      provide: DomainRepository,
      useExisting: DomainDocumentRepository,
    },
  ],
  exports: [DomainRepository, DomainDocumentRepository],
})
export class documentDomainPersistenceModule {}
