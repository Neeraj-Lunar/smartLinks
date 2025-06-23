import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { StatusEnums } from 'src/shared/enums/status.enum';
import { Platform } from 'src/shared/enums/platform.enum';
import { EntityDocumentHelper } from 'src/utils/document-entity-helper';
import { ProjectSchemaClass } from 'src/projects/infrastructure/persistence/document/entities/project.entity';
import { DomainSchemaClass } from 'src/domains/infrastructure/persistence/document/entities/domain.entity';

export type ApplicationDocument = HydratedDocument<ApplicationSchemaClass>;

@Schema({
  collection: 'applications',
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  toJSON: { virtuals: true, getters: true },
  toObject: { virtuals: true, getters: true },
})
export class ApplicationSchemaClass extends EntityDocumentHelper {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, enum: Platform, required: true })
  os: Platform;

  @Prop({ type: String, enum: StatusEnums, default: StatusEnums.ACTIVE })
  status: StatusEnums;

  @Prop({ type: String, required: true })
  packageId: string;

  @Prop({ type: String })
  bundleId?: string;

  @Prop({ type: String })
  iosTeamId?: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: ProjectSchemaClass.name,
    required: true,
  })
  project: Types.ObjectId | ProjectSchemaClass;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: DomainSchemaClass.name,
    required: true,
  })
  domain: Types.ObjectId | DomainSchemaClass;

  @Prop({ type: String })
  imageUrl?: string;

  @Prop({ type: String })
  storeUrl?: string;

  @Prop({ type: String })
  fallbackUrl: string;

  @Prop({ type: String })
  category?: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const ApplicationSchema = SchemaFactory.createForClass(ApplicationSchemaClass);


ApplicationSchema.index({ packageId: 1 });
ApplicationSchema.index({ project: 1 });
ApplicationSchema.index({ domain: 1 });
