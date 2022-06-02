import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class ChampionshipParticipants1654045116290 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'championships_participants_users',
            columns: [
                {
                     name: 'championshipId',
                     type: 'uuid',
                     isPrimary: true,
                },
                {
                     name: 'participantId',
                     type: 'uuid',
                     isPrimary: true,
                },
            ],
            foreignKeys: [
                {
                    columnNames: ['championshipId'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'championships',
                },
                {
                    columnNames: ['participantId'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'users',
                },
            ],
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
