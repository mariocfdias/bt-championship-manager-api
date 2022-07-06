import { Entity, Column, PrimaryColumn, ManyToMany, JoinTable, ManyToOne, OneToOne, OneToMany, JoinColumn } from 'typeorm'
import { Match } from './Match'
import { v4 as uuid } from 'uuid'
import { Location } from './Location';
import { Participant } from './Participant';

@Entity('championships')
export class Championship {
    @PrimaryColumn()
    public id: string;

    @Column()
    public name: string;

    @Column()
    public category: string;

    @Column()
    public numberOfParticipants: number;

    @Column()
    public state: string;

    @Column()
    public finishedMatches: number;

    @Column()
    public description: string;

    @Column()
    public enrollStartDate: Date;
    
    @Column()
    public enrollEndDate: Date;

    @Column()
    public startDate: Date;
    
    @Column()
    public endDate: Date;

    @OneToOne(type => Location, {
        eager: true
    })
    @JoinColumn({ name : "location_id" })
    public location : Location

    @OneToMany(type => Match, matches => matches.championship)
    public matches : Match[]

    @ManyToMany(type => Participant, participant => participant.championships)
    @JoinTable({
       name: "championships_participants_users",
       joinColumn: {
           name: 'championshipId',
           referencedColumnName: "id"
       },
       inverseJoinColumn: {
        name: "participantId",
        referencedColumnName: "id"
    }
    })
    public participants: Participant[];

    


    constructor(){
        if(!this.id){
            this.id = uuid()

        }
    }
}

