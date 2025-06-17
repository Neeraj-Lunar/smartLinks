import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { ProjectSchemaClass } from 'src/projects/infrastructure/persistence/document/entities/project.entity';
import { StatusEnums } from 'src/shared/enums/status.enum';
import { EntityDocumentHelper } from 'src/utils/document-entity-helper';

export type MongoDomainDocument = HydratedDocument<DomainSchemaClass>;

@Schema({
  collection: 'domains',
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})
export class DomainSchemaClass extends EntityDocumentHelper {
  @Prop({ required: true, unique: true })
  domainName: string;

  @Prop({ type: String, enum: StatusEnums, default: StatusEnums.ACTIVE })
  status: StatusEnums;

  @Prop({ type: Types.ObjectId, ref: ProjectSchemaClass.name, required: true })
  project: Types.ObjectId | ProjectSchemaClass;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const DomainSchema = SchemaFactory.createForClass(DomainSchemaClass);
