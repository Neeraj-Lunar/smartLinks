import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

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
          name: 'project_id',
          type: 'int',
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

    await queryRunner.createForeignKey('applications', new TableForeignKey({
      columnNames: ['project_id'],
      referencedTableName: 'projects',
      referencedColumnNames: ['id'],
      onDelete: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('applications');
    if (table) {
      const foreignKey = table.foreignKeys.find(
        fk => fk.columnNames.includes('Project_id'),
      );
      if (foreignKey) {
        await queryRunner.dropForeignKey('applications', foreignKey);
      }
    }
    await queryRunner.dropTable('applications');
  }
}
