import { ApplicationEntity } from 'src/application/infrastructure/persistence/relational/entities/application.entity';
import { DomainEntity } from 'src/domains/infrastructure/persistence/relational/entities/domain.entity';
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

  @Column({ type: 'varchar', nullable: true })
  name: string | null;

  @Column({ name: 'domain_id', type: 'varchar', nullable: false })
  domainId: number;

  @ManyToOne(() => DomainEntity)
  @JoinColumn({ name: 'domain_id' })
  domainDetails: DomainEntity;

  @Column({ name: 'short_url', type: 'varchar', nullable: true, unique: true })
  shortUrl: string | null;

  @Column({ name: 'full_url', type: 'varchar', nullable: true, unique: true })
  fullUrl: string | null;

  @Column({ name: 'android_app_id', type: 'int', nullable: false })
  androidAppId: number;

  @ManyToOne(() => ApplicationEntity)
  @JoinColumn({ name: 'android_app_id' })
  androidApp: ApplicationEntity;

  @Column({ name: 'ios_app_id', type: 'int', nullable: false })
  iosAppId: number;

  @ManyToOne(() => ApplicationEntity)
  @JoinColumn({ name: 'ios_app_id' })
  iosApp: ApplicationEntity;

  @Column({ type: 'jsonb', nullable: true })
  params: Record<string, any> | null;

  @Column({ name: 'expired_at', type: 'timestamp', nullable: true })
  expiredAt: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
