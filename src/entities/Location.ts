import { Entity, Column, CreateDateColumn, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('locations')
export class Location {
    @PrimaryColumn()
    public id: string;

    @Column()
    public name: string;

    @Column()
    public numberOfCourts: number;

    @Column()
    public cep: String;

    @Column()
    public number: String;

    @Column()
    public address: string;
    
    

    


    constructor(){
        if(!this.id){
            this.id = uuid()

        }
    }
}

