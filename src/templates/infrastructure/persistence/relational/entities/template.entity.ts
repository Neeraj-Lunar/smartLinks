import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApplicationEntity } from 'src/application/infrastructure/persistence/relational/entities/application.entity';
import { StatusEnums } from 'src/shared/enums/status.enum';
import { InstalledRedirectTemplate } from 'src/templates/domain/installed-redirect.model';
import { NotInstalledRedirectTemplate } from 'src/templates/domain/not-installed-redirect.model';
import { DesktopRedirectTemplate } from 'src/templates/domain/web-redirect.model';

@Entity('templates')
export class TemplateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ name: 'android_app_id', nullable: true })
  androidAppId: number | null;

  @ManyToOne(() => ApplicationEntity, { nullable: true, eager: true })
  @JoinColumn({ name: 'android_app_id' })
  androidApp: ApplicationEntity | null;

  @Column({ name: 'ios_app_id', nullable: true })
  iosAppId: number | null;

  @ManyToOne(() => ApplicationEntity, { nullable: true, eager: true })
  @JoinColumn({ name: 'ios_app_id' })
  iosApp: ApplicationEntity | null;

  @Column({ name: 'installed_rdt', type: 'jsonb', nullable: true })
  installedRdt: InstalledRedirectTemplate| null;

  @Column({ name: 'not_installed_rdt', type: 'jsonb', nullable: true })
  notInstalledRdt: NotInstalledRedirectTemplate | null;

  @Column({ name: 'desktop_rdt', type: 'jsonb', nullable: true })
  desktopRdt: DesktopRedirectTemplate | null;

  @Column({ type: 'varchar', nullable: false })
  status: StatusEnums;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}