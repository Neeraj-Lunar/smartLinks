import { ProjectEntity } from 'src/projects/infrastructure/persistence/relational/entities/project.entity';
import { Platform } from 'src/shared/enums/platform.enum';
import { StatusEnums } from 'src/shared/enums/status.enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('applications')
@Unique('unique_package_id', ['packageId'])
export class ApplicationEntity {
  @PrimaryGeneratedColumn()
  id: string | number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  os: Platform;

  @Column({ type: 'varchar', nullable: false })
  status: StatusEnums;

  @Column({ name: 'package_id', type: 'varchar', nullable: false })
  packageId: string;

  @Column({ name: 'project_id', type: 'int', nullable: false })
  projectId: number;

  @ManyToOne(() => ProjectEntity)
  @JoinColumn({ name: 'project_id' })
  project: ProjectEntity;

  @Column({ name: 'image_url', type: 'varchar', nullable: true })
  imageUrl: string | null;

  @Column({ name: 'store_url', type: 'varchar', nullable: true })
  storeUrl: string | null;

  @Column({ name: 'fallback_url', type: 'varchar', nullable: true })
  fallbackUrl: string | null;

  @Column({ type: 'varchar', nullable: true })
  category: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
