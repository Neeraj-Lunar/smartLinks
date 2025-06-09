import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplicationRepository } from '../../application.repository';
import { ApplicationEntity } from '../entities/application.entity';
import { ApplicationModel } from '../../../../domain/applications.model';
import { ApplicationMapper } from '../mappers/application.mapper';
import { CONNECTION_NAME } from '../../../../../config/constants';

@Injectable()
export class PgApplicationRepository implements ApplicationRepository {
  constructor(
    @InjectRepository(ApplicationEntity, CONNECTION_NAME)
    private readonly repo: Repository<ApplicationEntity>,
  ) {}

  async create(application: ApplicationModel): Promise<ApplicationModel> {
    const persistenceModel = ApplicationMapper.toPersistence(application);
    const entity = this.repo.create(persistenceModel);
    const saved = await this.repo.save(entity);
    return ApplicationMapper.toDomain(saved);
  }

  async update(id: string, updates: Omit<Partial<ApplicationModel>, 'project'>): Promise<ApplicationModel | null> {
    await this.repo.update(id, updates);
    const updated = await this.repo.findOneBy({ id });
    return updated ? ApplicationMapper.toDomain(updated) : null;
  }
  
  async findById(id: string): Promise<ApplicationModel | null> {
    const entity = await this.repo.findOneBy({ id } as any);
    return entity ? ApplicationMapper.toDomain(entity) : null;
  }

  async findOne(filter: Partial<ApplicationModel>, options?: { withRelations?: boolean }): Promise<ApplicationModel | null> {
      const cleanedFilter: any = Object.fromEntries(
        Object.entries(filter).filter(([_, v]) => v !== null && v !== undefined)
      );
    
      const entity = options?.withRelations
        ? await this.repo.findOne({
            where: cleanedFilter,
            relations: ['project'],
          })
        : await this.repo.findOneBy(cleanedFilter);
    
      return entity ? ApplicationMapper.toDomain(entity) : null;
  }

  async findAll(filter: Partial<ApplicationModel>, options?: { withRelations?: boolean }): Promise<ApplicationModel[]> {
    const cleanedFilter: any = Object.fromEntries(
      Object.entries(filter).filter(([_, v]) => v !== null && v !== undefined)
    );
  
    const entities = await this.repo.find({
      where: cleanedFilter,
      relations: options?.withRelations ? ['project'] : [],
    });
  
    return entities.map((entity) => ApplicationMapper.toDomain(entity));
  }

  async find(): Promise<ApplicationModel[]> {
    const entities = await this.repo.find();
    return entities.map((entity) => ApplicationMapper.toDomain(entity));
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
