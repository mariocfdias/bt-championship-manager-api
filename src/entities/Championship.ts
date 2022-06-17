import { Entity, Column, CreateDateColumn, PrimaryColumn, ManyToMany, JoinTable, ManyToOne, OneToOne, OneToMany } from 'typeorm'
import { User } from './User'
import { Match } from './Match'
import { v4 as uuid } from 'uuid'
import { Location } from './Location';

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
    public description: string;

    @Column()
    public enrollStartDate: Date;
    
    @Column()
    public enrollEndDate: Date;

    @Column()
    public startDate: Date;
    
    @Column()
    public endDate: Date;

    @OneToOne(type => Location)
    public location : Location

    @OneToMany(type => Match, matches => matches.championship)
    public matches : Match[]

    @ManyToMany(type => User, user => user.championships)
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
    public participants: User[];

    


    constructor(){
        if(!this.id){
            this.id = uuid()

        }
    }
}

