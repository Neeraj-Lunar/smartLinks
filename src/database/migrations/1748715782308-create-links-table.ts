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
            name: 'domain_id',
            type: 'int',
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

    await queryRunner.createForeignKeys('links', [
      new TableForeignKey({
        columnNames: ['template_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'templates',
        onDelete: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['domain_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'domains',
        onDelete: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('links');
    if (table) {
      const foreignKeys = table.foreignKeys.filter(fk =>
        ['template_id', 'domain_id'].includes(fk.columnNames[0])
      );
      for (const fk of foreignKeys) {
        await queryRunner.dropForeignKey('links', fk);
      }
    }
    await queryRunner.dropTable('links');
  }
}
