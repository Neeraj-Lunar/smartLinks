import { Module } from '@nestjs/common';
import { ApplicationRepository } from '../application.repository';
import { ApplicationDocumentRepository } from './repositories/application.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { ApplicationSchema, ApplicationSchemaClass } from './entities/application.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ApplicationSchemaClass.name, schema: ApplicationSchema },
    ]),
  ],
  providers: [
    ApplicationDocumentRepository,
    {
      provide: ApplicationRepository,
      useExisting: ApplicationDocumentRepository,
    },
  ],
  exports: [ApplicationRepository, ApplicationDocumentRepository],
})
export class documentApplicationPersistenceModule {}
