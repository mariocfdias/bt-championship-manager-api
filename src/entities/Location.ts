import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('locations')
export class Location {
    @PrimaryGeneratedColumn('increment')
    public id: number;

    @Column()
    public name: string;

    @Column()
    public numberOfCourts: number;

    @Column()
    public cep: string;

    @Column()
    public number: string;
    
    constructor(){
    }
}

