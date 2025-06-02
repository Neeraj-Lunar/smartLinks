import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateLinksTable1748715782308 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'links',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            isNullable: false
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'domain_name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'short_url',
            type: 'varchar',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'full_url',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'template_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'params',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'expired_at',
            type: 'timestamp',
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
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'links',
      new TableForeignKey({
        columnNames: ['template_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'templates',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('links');
  }
}
