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

    

    


    constructor(){
        if(!this.id){
            this.id = uuid()

        }
    }
}

