import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Championship1654044271509 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'championships',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isUnique: true
                    },
                    {
                        name: 'category',
                        type: 'varchar',
                        isUnique: true
                    },
                    {
                        name: 'numberOfParticipants',
                        type: 'int',
                        isUnique: true
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                    },
                    {
                        name: 'enrollStartDate',
                        type: 'datetime',
                        isUnique: true
                    },
                    {
                        name: 'enrollEndDate',
                        type: 'datetime',
                    },
                    {
                        name: 'startDate',
                        type: 'datetime',
                    },
                    {
                        name: 'endDate',
                        type: 'datetime',
                    },
                    {
                        name: 'location_id',
                        type: 'int'
                    }
                ],
                foreignKeys: [
                    {
                      name: "locations",
                      referencedTableName: "locations",
                      referencedColumnNames: ["id"],
                      columnNames: ["location_id"],
                      onDelete: "CASCADE",
                      onUpdate: "CASCADE",
                    },
                ]
            }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("championships");

    }

}
