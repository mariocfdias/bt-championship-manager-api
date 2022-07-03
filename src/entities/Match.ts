import { Entity, Column, CreateDateColumn, PrimaryColumn, OneToOne, ManyToOne } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { Championship } from './Championship';
import { User } from './User';

@Entity('matches')
export class Match {
    @PrimaryColumn()
    public id: string;

    @Column()
    public name: string;

    @OneToOne(() => User, user => user.id)
    public firstParticipant : User

    @OneToOne(() => User, user => user.id)
    public secondParticipant: User

    @Column()
    public firstParticipantPoints : number;

    @Column()
    public secondParticipantPoints : number;
    
    @ManyToOne(type => Championship, championship => championship.matches)
    public championship : Championship




    constructor(){
        if(!this.id){
            this.id = uuid()

        }
    }
}

