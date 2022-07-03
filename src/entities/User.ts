import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, ManyToMany } from 'typeorm'
import { Championship } from './Championship'
import { v4 as uuid } from 'uuid'

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('increment')
    public id: number;

    @Column()
    public username: string;

    @Column()
    public password: string

    @Column()
    public email: string

    @Column()
    public gender: string

    @Column()
    public type: string

    @ManyToMany(() => Championship, championship => championship.participants)
    public championships : Championship[]

}

