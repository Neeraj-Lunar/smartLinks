import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectSchema, ProjectSchemaClass } from './entities/project.entity';
import { ProjectDocumentRepository } from './repositories/project.repository';
import { ProjectRepository } from '../project.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProjectSchemaClass.name, schema: ProjectSchema },
    ]),
  ],
  providers: [
    ProjectDocumentRepository,
    {
      provide: ProjectRepository,
      useExisting: ProjectDocumentRepository,
    },
  ],
  exports: [ProjectRepository, ProjectDocumentRepository],
})
export class DocumentProjectPersistenceModule {}
