import { Entity, Column, CreateDateColumn, PrimaryColumn, ManyToMany, JoinTable } from 'typeorm'
import { User } from './User'
import { v4 as uuid } from 'uuid'

@Entity('championships')
export class Championship {
    @PrimaryColumn()
    public id: string;

    @Column()
    public name: string;

    @ManyToMany(() => User, user => user.championships)
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

