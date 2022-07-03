import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Locations1654112416997 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'locations',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true
                    },
                    {
                        name: 'name',
                        type: 'varchar'
                    },
                    {
                        name: 'numberOfCourts',
                        type: 'varchar'                    
                    },
                    {
                        name: 'cep',
                        type: 'varchar'                    
                    },
                    {
                        name: 'address',
                        type: 'varchar'                    
                    },     
                    {
                        name: 'number',
                        type: 'varchar'                    
                    },
                    
                
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("locations");

    }

}
