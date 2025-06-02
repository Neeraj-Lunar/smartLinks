import { SdkIntegrationPlatform } from 'src/application/enums/sdk-integration-platform.enum';
import { Platform } from 'src/shared/enums/platform.enum';
import { StatusEnums } from 'src/shared/enums/status.enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
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

  @Column({ name: 'sdk_key', type: 'varchar', nullable: false })
  sdkKey: string | null;

  @Column({ name: 'sdk_list', type: 'text', array: true, nullable: false, default: `'{}'` })
  sdkList: SdkIntegrationPlatform[];

  @Column({ name: 'image_url', type: 'varchar', nullable: true })
  imageUrl: string | null;

  @Column({ name: 'store_url', type: 'varchar', nullable: true })
  storeUrl: string | null;

  @Column({ type: 'varchar', nullable: true })
  category: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
