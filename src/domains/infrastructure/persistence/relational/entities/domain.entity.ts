import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { StatusEnums } from 'src/shared/enums/status.enum';
import { ProjectEntity } from 'src/projects/infrastructure/persistence/relational/entities/project.entity';

@Entity('domains')
export class DomainEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'domain_name', type: 'varchar', unique: true })
  domainName: string;

  @Column({ name: 'status', type: 'varchar', default: StatusEnums.ACTIVE })
  status: StatusEnums;

  @Column({ name: 'project_id', type: 'int' })
  projectId: number;

  @ManyToOne(() => ProjectEntity, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'project_id' })
  project: ProjectEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
