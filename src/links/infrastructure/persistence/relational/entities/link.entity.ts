import { TemplateEntity } from 'src/templates/infrastructure/persistence/relational/entities/template.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';


@Entity('links')
export class LinkEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ name: 'domain_name', type: 'varchar', nullable: false })
  domainName: string;

  @Column({ name: 'short_url', type: 'varchar', nullable: true, unique: true })
  shortUrl: string | null;

  @Column({ name: 'full_url', type: 'varchar', nullable: true, unique: true })
  fullUrl: string | null;

  @Column({ name: 'template_id', type: 'int', nullable: false })
  templateId: number;

  @ManyToOne(() => TemplateEntity)
  @JoinColumn({ name: 'template_id' })
  template: TemplateEntity;

  @Column({ type: 'jsonb', nullable: true })
  params: Record<string, any> | null;

  @Column({ name: 'expired_at', type: 'timestamp', nullable: true })
  expiredAt: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
