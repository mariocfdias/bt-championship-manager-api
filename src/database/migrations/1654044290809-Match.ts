import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Match1654044290809 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'matches',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isUnique: false
                    },
                    {
                        name: 'first_participant_id',
                        type: 'uuid'                    
                    },
                    {
                        name: 'second_participant_id',
                        type: 'uuid'                    
                    },
                    {
                        name: 'firstParticipantPoints',
                        type: 'number'                    
                    },
                    {
                        name: 'secondParticipantPoints',
                        type: 'number'                    
                    },
                    {
                        name: 'number',
                        type: 'number'                    
                    },
                    {
                        name: 'group',
                        type: 'varchar'                    
                    },
                    {
                        name: 'championship_id',
                        type: 'uuid'
                    }

                ],
                foreignKeys: [
                    {
                      name: "firstParticipant",
                      referencedTableName: "participants",
                      referencedColumnNames: ["id"],
                      columnNames: ["first_participant_id"],
                      onDelete: "CASCADE",
                      onUpdate: "CASCADE",
                    },
                    {
                        name: "secondParticipant",
                        referencedTableName: "participants",
                        referencedColumnNames: ["id"],
                        columnNames: ["second_participant_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                      },
                    {
                        name: "championships",
                        referencedTableName: "championships",
                        referencedColumnNames: ["id"],
                        columnNames: ["championship_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                      }
                  ]
            }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
