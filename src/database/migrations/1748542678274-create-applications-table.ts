import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateApplicationsTable1748542678274 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'applications',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
          isNullable: false,
        },
        {
          name: 'name',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'os',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'status',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'package_id',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'sdk_key',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'sdk_list',
          type: 'text[]',
          isNullable: false,
        },
        {
          name: 'image_url',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'store_url',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'category',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()',
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'now()',
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('applications');
  }
}
