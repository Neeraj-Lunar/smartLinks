import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { ApplicationSchemaClass } from 'src/application/infrastructure/persistence/document/entities/application.entity';
import { DomainSchemaClass } from 'src/domains/infrastructure/persistence/document/entities/domain.entity';
import { EntityDocumentHelper } from 'src/utils/document-entity-helper';

export type LinkDocument = HydratedDocument<LinkSchemaClass>;

@Schema({
  collection: 'links',
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  toJSON: { virtuals: true, getters: true },
  toObject: { virtuals: true, getters: true },
})
export class LinkSchemaClass extends EntityDocumentHelper {
  @Prop({ type: String, default: null })
  name: string | null;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: DomainSchemaClass.name, required: true })
  domain: Types.ObjectId | DomainSchemaClass;

  @Prop({ type: String, unique: true, default: null })
  shortUrl: string | null;

  @Prop({ type: String, unique: true, default: null })
  fullUrl: string | null;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: ApplicationSchemaClass.name, required: true })
  androidApp: Types.ObjectId | ApplicationSchemaClass;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: ApplicationSchemaClass.name, required: true })
  iosApp: Types.ObjectId | ApplicationSchemaClass;

  @Prop({ type: mongoose.Schema.Types.Mixed, default: null })
  params: Record<string, any> | null;

  @Prop({ type: Date, default: null })
  expiredAt: Date | null;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const LinkSchema = SchemaFactory.createForClass(LinkSchemaClass);

LinkSchema.index({ shortUrl: 1 }, { unique: true });
LinkSchema.index({ fullUrl: 1 }, { unique: true });
LinkSchema.index({ domain: 1 });
LinkSchema.index({ androidApp: 1 });
LinkSchema.index({ iosApp: 1 });
