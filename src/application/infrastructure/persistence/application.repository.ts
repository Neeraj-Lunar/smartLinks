import { ApplicationModel } from "src/application/domain/applications.model";

export abstract class ApplicationRepository {
  abstract create(
    data: Omit<ApplicationModel, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<ApplicationModel>;
  abstract update(id, application: Partial<ApplicationModel>): Promise<ApplicationModel | null>;
  abstract delete(id: string | number): Promise<void>;
  abstract findById(id: ApplicationModel['id']): Promise<ApplicationModel | null>;
  abstract findOne(filter: Partial<ApplicationModel>, options?: { withRelations?: boolean }): Promise<ApplicationModel | null>;
  abstract find(): Promise<ApplicationModel[] | null>;
}
