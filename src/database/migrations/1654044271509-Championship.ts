import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Championship1654044271509 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'championships',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isUnique: true
                    },
                    {
                        name: 'category',
                        type: 'varchar',
                        isUnique: false
                    },
                    {
                        name: 'numberOfParticipants',
                        type: 'number',
                        isUnique: false
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                        isUnique: false

                    },
                    {
                        name: 'enrollStartDate',
                        type: 'datetime',
                        isUnique: false
                    },
                    {
                        name: 'enrollEndDate',
                        type: 'datetime',
                        isUnique: false

                    },
                    {
                        name: 'startDate',
                        type: 'datetime',
                        isUnique: false

                    },
                    {
                        name: 'endDate',
                        type: 'datetime',
                        isUnique: false

                    },
                    {
                        name: 'finishedMatches',
                        type: 'number',
                        isUnique: false

                    },
                    {
                        name: 'state',
                        type: 'varchar',
                        isUnique: false

                    },
                    {
                        name: 'location_id',
                        type: 'uuid',
                        isUnique: false

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
                    }
                ]
            }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("championships");

    }

}
