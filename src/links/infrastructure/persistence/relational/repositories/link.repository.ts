import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CONNECTION_NAME } from '../../../../../config/constants';
import { LinkEntity } from '../entities/link.entity';
import { LinkRepository } from '../../link.repository';
import { LinkModel } from 'src/links/domain/link.model';
import { LinkMapper } from '../mappers/link.mapper';

@Injectable()
export class PgLinkRepository implements LinkRepository {
  constructor(
    @InjectRepository(LinkEntity, CONNECTION_NAME)
    private readonly repo: Repository<LinkEntity>,
  ) {}

  async create(link: LinkModel): Promise<LinkModel> {
    const persistenceModel = LinkMapper.toPersistence(link);
    const entity = this.repo.create(persistenceModel);
  
    const saved = await this.repo.save(entity);
  
    if (!saved?.id) {
      throw new Error('Link creation failed: could not get ID after save');
    }
  
    const fullEntity = await this.repo.findOne({
      where: { id: saved.id },
      relations: ['domainDetails'],
    });
  
    if (!fullEntity) {
      throw new Error(`Link with ID ${saved.id} not found after creation`);
    }
  
    return LinkMapper.toDomain(fullEntity);
  }

  async update(id: number, updates: Omit<Partial<LinkModel>, 'domainDetails' | 'template'>): Promise<LinkModel | null> {
    await this.repo.update(id, updates);
    const updated = await this.repo.findOneBy({ id });
    return updated ? LinkMapper.toDomain(updated) : null;
  }
  
  async findById(id: number): Promise<LinkModel | null> {
    const entity = await this.repo.findOne({
      where: { id },
      relations: ['domainDetails', 'template', 'template.androidApp', 'template.iosApp'],
    });
  
    return entity ? LinkMapper.toDomain(entity) : null;
  }

  async findOne(filter: Partial<LinkModel>, options?: { withRelations?: boolean }): Promise<LinkModel | null> {
    const cleanedFilter: any = Object.fromEntries(
      Object.entries(filter).filter(([_, v]) => v !== null && v !== undefined)
    );
  
    const entity = options?.withRelations
      ? await this.repo.findOne({
          where: cleanedFilter,
          relations: ['domainDetails','template','template.androidApp', 'template.iosApp'],
        })
      : await this.repo.findOneBy(cleanedFilter);
  
    return entity ? LinkMapper.toDomain(entity) : null;
  }



  async find(): Promise<LinkModel[]> {
    const entities = await this.repo.find({
      relations: ['domainDetails'],
    })
    return entities.map((entity) => LinkMapper.toDomain(entity));
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
