import { ProjectModel } from "src/projects/domain/project.model";

export abstract class ProjectRepository {
  abstract create(
    data: Omit<ProjectModel, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<ProjectModel>;
  abstract update(id: ProjectModel['id'], updates: Partial<ProjectModel>): Promise<ProjectModel | null>;
  abstract delete(id: ProjectModel['id']): Promise<void>;
  abstract findById(id: ProjectModel['id']): Promise<ProjectModel | null>;
  abstract find(): Promise<ProjectModel[] | null>;
  abstract findOne(filter: Partial<ProjectModel>, options?: { withRelations?: boolean }): Promise<ProjectModel | null>;
}
