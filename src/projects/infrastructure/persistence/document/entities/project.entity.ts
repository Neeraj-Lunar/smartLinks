import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { now } from 'mongoose';
import { StatusEnums } from 'src/shared/enums/status.enum';
import { EntityDocumentHelper } from 'src/utils/document-entity-helper';

export type ProjectDocument = HydratedDocument<ProjectSchemaClass>;

@Schema({
  collection: 'projects',
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  toJSON: { virtuals: true, getters: true },
  toObject: { virtuals: true, getters: true },
})
export class ProjectSchemaClass extends EntityDocumentHelper {
  @Prop({ trim: true, required: true })
  name: string;

  @Prop({
    enum: StatusEnums,
    default: StatusEnums.ACTIVE,
  })
  status: StatusEnums;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(ProjectSchemaClass);

ProjectSchema.index({ name: 1 }, { unique: true });
