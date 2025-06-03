import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { DomainRepository } from './infrastructure/persistence/domain.repository';
import { CreateDomainDto } from './dto/create-domain-dto';
import { DomainModel } from './domain/domain.model';
import { UpdateDomainDto } from './dto/update-domain-dto';

@Injectable()
export class DomainService {
  constructor(private readonly domainRepo: DomainRepository) {}

  async create(createDomainDto: CreateDomainDto): Promise<DomainModel> {
    const existing = await this.domainRepo.findOne({ domainName :createDomainDto.domainName});
    if (existing) {
      throw new BadRequestException(`Domain already exists.`);
    }
    return this.domainRepo.create(createDomainDto);
  }

  async find(): Promise<DomainModel[]> {
    const org = await this.domainRepo.find();
    if (!org) {
      throw new NotFoundException(`Domain not found.`);
    }
    return org;
  }

  async findById(id: number): Promise<DomainModel> {
    const org = await this.domainRepo.findById(id);
    if (!org) {
      throw new NotFoundException(`Domain not found.`);
    }
    return org;
  }

  async update(id:number, updateDomainDto: UpdateDomainDto): Promise<DomainModel> {
    const existing = await this.domainRepo.findById(id);
    if (!existing) {
      throw new NotFoundException(`Domain not found.`);
    }
    const updated = await this.domainRepo.update(id, updateDomainDto);
    if (!updated) {
      throw new InternalServerErrorException('Failed to update Domain');
    }
    return updated
  }

  async findByCond(cond: Partial<DomainModel>): Promise<DomainModel> {
    const org = await this.domainRepo.findOne(cond, { withRelations: true} );
    if (!org) {
      throw new NotFoundException(`Domain not found.`);
    }
    return org;
  }

  async delete(id: number): Promise<void> {
    const org = await this.domainRepo.findById(id);
    if (!org) {
      throw new NotFoundException(`Domain not found.`);
    }
    await this.domainRepo.delete(id);
  }

}
