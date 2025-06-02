import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplateEntity } from './entities/template.entity';
import { PgTemplateRepository } from './repositories/template.repository';
import { TemplateRepository } from '../template.repository';
import { CONNECTION_NAME } from '../../../../config/constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([TemplateEntity], CONNECTION_NAME),
  ],
  providers: [
    PgTemplateRepository,
    {
      provide: TemplateRepository,
      useExisting: PgTemplateRepository,
    },
  ],
  exports: [TemplateRepository, PgTemplateRepository],
})
export class RelationalTemplatePersistenceModule {}
