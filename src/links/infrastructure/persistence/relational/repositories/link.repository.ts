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
    return LinkMapper.toDomain(saved);
  }

  async update(id: number, updates: Omit<Partial<LinkModel>, 'template'>): Promise<LinkModel | null> {
    await this.repo.update(id, updates);
    const updated = await this.repo.findOneBy({ id });
    return updated ? LinkMapper.toDomain(updated) : null;
  }
  
  async findById(id: number): Promise<LinkModel | null> {
    const entity = await this.repo.findOneBy({ id } as any);
    return entity ? LinkMapper.toDomain(entity) : null;
  }

  async findOne(filter: Partial<LinkModel>, options?: { withRelations?: boolean }): Promise<LinkModel | null> {
    const cleanedFilter: any = Object.fromEntries(
      Object.entries(filter).filter(([_, v]) => v !== null && v !== undefined)
    );
  
    const entity = options?.withRelations
      ? await this.repo.findOne({
          where: cleanedFilter,
          relations: ['template','template.androidApp', 'template.iosApp'],
        })
      : await this.repo.findOneBy(cleanedFilter);
  
    return entity ? LinkMapper.toDomain(entity) : null;
  }



  async find(): Promise<LinkModel[]> {
    const entities = await this.repo.find();
    return entities.map((entity) => LinkMapper.toDomain(entity));
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
