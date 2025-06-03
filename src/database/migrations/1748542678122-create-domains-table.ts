import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateDomainsTable1748551234567 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'domains',
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
          name: 'project_id',
          type: 'int',
          isNullable: false,
        },
        {
          name: 'domain_name',
          type: 'varchar',
          isNullable: false,
          isUnique: true,
        },
        {
          name: 'status',
          type: 'varchar',
          isNullable: false,
          default: `'active'`,
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

    await queryRunner.createForeignKey('domains', new TableForeignKey({
      columnNames: ['project_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'projects',
      onDelete: 'CASCADE',
    }));
  }

    public async down(queryRunner: QueryRunner): Promise<void> {
      const table = await queryRunner.getTable('domains');
      if (table) {
        const foreignKey = table.foreignKeys.find(
          (fk) => fk.columnNames.includes('Project_id')
        );
        if (foreignKey) {
          await queryRunner.dropForeignKey('domains', foreignKey);
        }
      }
    
      await queryRunner.dropTable('domains');
    }
}
