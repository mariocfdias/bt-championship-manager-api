import { Entity, Column, CreateDateColumn, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('locations')
export class Location {
    @PrimaryColumn()
    public id: string;

    @Column()
    public cep: string;

    @Column()
    public number: string;

    


    constructor(){
        if(!this.id){
            this.id = uuid()

        }
    }
}

