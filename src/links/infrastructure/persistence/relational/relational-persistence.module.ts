import { Module } from '@nestjs/common';
import { LinkRepository } from '../link.repository';
import { LinkDocumentRepository } from './repositories/link.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { LinkSchema, LinkSchemaClass } from './entities/link.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LinkSchemaClass.name, schema: LinkSchema },
    ]),
  ],
  providers: [
    LinkDocumentRepository,
    {
      provide: LinkRepository,
      useExisting: LinkDocumentRepository,
    },
  ],
  exports: [LinkRepository, LinkDocumentRepository],
})
export class documentLinkPersistenceModule {}
