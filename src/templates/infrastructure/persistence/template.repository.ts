import { TemplateModel } from "src/templates/domain/template.model";


export abstract class TemplateRepository {
  abstract create(
    data: Omit<TemplateModel, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<TemplateModel>;
  abstract update(id: TemplateModel['id'], updates: Partial<TemplateModel>): Promise<TemplateModel | null>;
  abstract delete(id: TemplateModel['id']): Promise<void>;
  abstract findById(id: TemplateModel['id']): Promise<TemplateModel | null>;
  abstract find(): Promise<TemplateModel[] | null>;
}
