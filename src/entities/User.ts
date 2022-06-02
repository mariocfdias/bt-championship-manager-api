import { Entity, Column, CreateDateColumn, PrimaryColumn, ManyToMany } from 'typeorm'
import { Championship } from './Championship'
import { v4 as uuid } from 'uuid'

@Entity('users')
export class User {
    @PrimaryColumn()
    public id: string;

    @Column()
    public username: string;

    @Column()
    public password: string

    @ManyToMany(() => Championship, championship => championship.participants)
    public championships : Championship[]


    constructor(){
        if(!this.id){
            this.id = uuid()

        }
    }
}

