import { Entity, Column, CreateDateColumn, PrimaryColumn, OneToOne, ManyToOne, JoinColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { Championship } from './Championship';
import { Participant } from './Participant';
import { User } from './User';

@Entity('matches')
export class Match {
    @PrimaryColumn()
    public id: string;
 
    @Column()
    public name: string;

    @OneToOne(() => Participant, user => user.id, {
        eager: true
    })
    @JoinColumn({ name : "first_participant_id" })
    public firstParticipant : Participant

    @OneToOne(() => Participant, user => user.id, {
        eager: true
    })
    @JoinColumn({ name : "second_participant_id" })
    public secondParticipant: Participant

    @Column()
    public firstParticipantPoints : number;

    @Column()
    public secondParticipantPoints : number;  

    @Column()
    public group : string;
    
    @Column()
    public number: number;

    @ManyToOne(type => Championship, championship => championship.matches)
    @JoinColumn({ name : "championship_id" })
    public championship : Championship




    constructor(){
        if(!this.id){
            this.id = uuid()

        }
    }
}

