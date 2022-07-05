import { Entity, Column, PrimaryColumn, ManyToMany, OneToOne, JoinColumn, JoinTable } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { Championship } from './Championship';
import { User } from './User';

@Entity('participants')
export class Participant {
    @PrimaryColumn()
    public id: string;

    @Column()
    public name: string;

    @Column()
    public email: string;

    @OneToOne(type => User, {
        eager: true
    })
    @JoinColumn({ name : "user_id" })
    public user: User
    

    //@ManyToMany(() => Championship, championship => championship.participants, {eager: true})
    @ManyToMany(type => Championship, championship => championship.participants)
    @JoinTable({
       name: "championships_participants_users",
       joinColumn: {
           name: 'participantId',
           referencedColumnName: "id"
       },
       inverseJoinColumn: {
        name: "championshipId",
        referencedColumnName: "id"
    }
    })
    public championships : Championship[]
    


    constructor(){
        if(!this.id){
            this.id = uuid()

        }
    }
}

