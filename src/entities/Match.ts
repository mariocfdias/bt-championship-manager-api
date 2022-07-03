import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, OneToOne, ManyToOne } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { Championship } from './Championship';
import { User } from './User';

@Entity('matches')
export class Match {
    @PrimaryGeneratedColumn('increment')
    public id: number;

    @Column()
    public cep: string;

    @Column()
    public number: string;

    @OneToOne(() => User, user => user.id)
    public firstParticipant : User

    @OneToOne(() => User, user => user.id)
    public secondParticipant: User

    @ManyToOne(type => Championship, championship => championship.matches)
    public championship : Championship

}

