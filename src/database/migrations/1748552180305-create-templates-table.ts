import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateTemplatesTable1748552180305 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'templates',
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
            name: 'android_app_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'ios_app_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'installed_rdt',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'not_installed_rdt',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'desktop_rdt',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'varchar',
            isNullable: false,
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
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'templates',
      new TableForeignKey({
        columnNames: ['android_app_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'applications',
        onDelete: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      'templates',
      new TableForeignKey({
        columnNames: ['ios_app_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'applications',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('templates');
  }
}
