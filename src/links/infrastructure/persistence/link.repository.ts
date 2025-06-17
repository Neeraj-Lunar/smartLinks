import { LinkModel } from "src/links/domain/link.model";


export abstract class LinkRepository {
  abstract create(
    data: Omit<LinkModel, 'id' | 'createdAt' | 'updatedAt'>,  options?: { withRelations?: boolean }
  ): Promise<LinkModel>;
  abstract update(id: string, data: Partial<LinkModel>): Promise<LinkModel | null>;
  abstract delete(id: string | number): Promise<void>;
  abstract findById(id: LinkModel['id']): Promise<LinkModel | null>;
  abstract findOne(filter: Partial<LinkModel>, options?: { withRelations?: boolean }): Promise<LinkModel | null>;
  abstract find(): Promise<LinkModel[] | null>;
}
