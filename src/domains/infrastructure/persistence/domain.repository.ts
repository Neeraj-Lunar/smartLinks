import { DomainModel } from "src/domains/domain/domain.model";

export abstract class DomainRepository {
  abstract create(
    data: Omit<DomainModel, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<DomainModel>;
  abstract update(id: DomainModel['id'], updates: Partial<DomainModel>): Promise<DomainModel | null>;
  abstract delete(id: DomainModel['id']): Promise<void>;
  abstract findById(id: DomainModel['id']): Promise<DomainModel | null>;
  abstract find(): Promise<DomainModel[] | null>;
  abstract findOne(filter: Partial<DomainModel>, options?: { withRelations?: boolean }): Promise<DomainModel | null>;
}
