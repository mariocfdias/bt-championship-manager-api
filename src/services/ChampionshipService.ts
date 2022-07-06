import { LocationController } from '../controllers/LocationController';
import {AppDataSource} from '../database/dataSource'
import { Championship } from '../entities/Championship'
import { User } from "../entities/User"
import { Location } from "../entities/Location"
import { Participant } from '../entities/Participant';
import { Match } from '../entities/Match';
import { MatchService } from './MatchService';

type CreateChampionshipRequest = {
    name: string;
    category: string;
    numberOfParticipants: number; 
    description: string; 
    locationId: string;
    enrollStartDate: Date; 
    enrollEndDate: Date;
    startDate: Date;
    endDate: Date;
}

type EnrollChampionshipRequest = {
    userId : string;
    championshipId: string;
}

export class ChampionshipService {
    async create({ category, name, numberOfParticipants, description, locationId, enrollStartDate, enrollEndDate, startDate, endDate } : CreateChampionshipRequest) : Promise<Championship | Error> {
        
        console.log(new Date(enrollStartDate))
        const ChampionshipRepository = AppDataSource.getRepository(Championship);
        const LocationRepository = AppDataSource.getRepository(Location)

        const isAreadlyChampionship = await ChampionshipRepository.findOneBy({
            name
        })

        const location = await LocationRepository.findOneBy({
            id: locationId
        })
        
        console.log(location)


        if(isAreadlyChampionship){
            return new Error('Campeonato ja existe')
        }

        if(!location){
            return new Error('Local não existe')
        }


        const championship = ChampionshipRepository.create({
            category, name, numberOfParticipants, description, location, enrollStartDate: new Date(enrollStartDate), enrollEndDate: new Date(enrollEndDate), startDate: new Date(startDate), endDate: new Date(endDate)
        })

        await ChampionshipRepository.save(championship);

        return championship;

    }

    async enroll({ name, email, championshipId } : any) : Promise<Championship | Error> {
        
        const ChampionshipRepository = AppDataSource.getRepository(Championship);
        const ParticipantRepository = AppDataSource.getRepository(Participant);
        const UserRepository = AppDataSource.getRepository(User)
  
            const championship = await ChampionshipRepository.findOne({
                where: {
                    id: championshipId
            },
            relations: ["participants"]

        })
        
        
        console.log({championship})


        if(!championship) return new Error('Campeonato não encontrado')
        if(championship.numberOfParticipants <= championship.participants.length) {
            await this.generateMatches({championshipId})
            return new Error("Numero maximo de participantes atingido")
        }
    

            const associatedUser = await UserRepository.findOne({
                where: {
                    email
                }
            }) 

            const newParticipant = ParticipantRepository.create({name, email, wins: 0, order: championship.participants.length})
            if(associatedUser) newParticipant.user = associatedUser





            const test = await ParticipantRepository.save(newParticipant)

            
            console.log({test})

            //console.log({newParticipant})


            //newParticipant.championships.push(championship);



            championship.participants.push(newParticipant)

            const user = await ParticipantRepository.find({
                where: {
                    email
                },
                relations: ["championships"]
            },
            )

            
            if(!championship || !user){
                return new Error('Campeonato ou usuario inexistente')
            }

            if(championship.numberOfParticipants == championship.participants.length){
                console.log("Numero de usuarios atigindo, montando partidas")
            }
            //championship.participants.push(user)

            console.log({championship})
            await ChampionshipRepository.save(championship)


       

            await ChampionshipRepository.save(championship);
            
            //return championship;
            return new Error('teste')
            
        }
        
        
        async generateMatches({championshipId}){
            const MatchRepository = AppDataSource.getRepository(Match);
            const ChampionshipRepository = AppDataSource.getRepository(Championship);
            const ParticipantRepository = AppDataSource.getRepository(Participant);
            const matchService = new MatchService()


        const championship = await ChampionshipRepository.findOne({
            where: {
                id: championshipId
        },
        relations: ["matches", "participants"]
          })

          if(!championship) return new Error('Campeonato não existe')

        const participantList = championship.participants

        participantList.sort((a,b) => a.order - b.order); 

        const numberOfGroups = championship.numberOfParticipants / 4;


        for(let i = 0; i<numberOfGroups; i++){
            let participantGroup = []

            for(let j = 0; j<4; j++){

                participantGroup.push(participantList[4*i + j])
            }

            console.log({i})

            let numberOfMatches = 1
            for(let k = 0; k<4;k++){
                for(let j = 0; j<4;j++){
                    if(participantGroup[k] != participantGroup[j]){
                        console.log({first:participantGroup[k], second: participantGroup[j]})
                        let firstParticipant = participantGroup[k]
                        let secondParticipant = participantGroup[j]
                        numberOfMatches++
                        let newMatch = MatchRepository.create({championship, firstParticipant, secondParticipant, name: `${firstParticipant.name} vs ${secondParticipant.name} ${12*i + numberOfMatches}`, group: 'Fase de grupos', number: 12*i + numberOfMatches, firstParticipantPoints: 0, secondParticipantPoints: 0})

                        await MatchRepository.save(newMatch)
                    }

                }
            }


        }




        console.log(participantList)


        
    }


    async getAll() {
        const ChampionshipRepository = AppDataSource.getRepository(Championship);

        const championships = ChampionshipRepository.find({
            relations: ["participants", "matches"]
        });

        return championships;

    }

    async getById(id : string) {
        const ChampionshipRepository = AppDataSource.getRepository(Championship);

        const championship = ChampionshipRepository.find({
            where: {
                id
            },
            relations: ["participants", "matches"]
        });

        if(!championship){
            return Error('Esse campeonato não existe')
        }

        return championship;

    }


    async update({id,name ,description,endDate, startDate, enrollEndDate, enrollStartDate, locationId} : any) {

        const ChampionshipRepository = AppDataSource.getRepository(Championship);
        const LocationRepository = AppDataSource.getRepository(Location);

        const updatedLocation = await LocationRepository.findOneBy({
            id: locationId
        })

        const updatedChampionship = await ChampionshipRepository.findOneBy({
            id
        })
        

        if(!updatedChampionship){
            return Error('Esse campeonato não existe')
        }

        if(!updatedLocation){
            return Error('Esse local não existe')
        }
        if(name) updatedChampionship.name = name
        if(description) updatedChampionship.description = description;
        if(endDate) updatedChampionship.endDate = endDate;
        if(startDate) updatedChampionship.startDate = startDate;
        if(enrollEndDate) updatedChampionship.enrollEndDate = enrollEndDate;
        if(enrollStartDate) updatedChampionship.enrollStartDate = enrollStartDate;
        if(updatedLocation) updatedChampionship.location = updatedLocation;

        await ChampionshipRepository.save(updatedChampionship);

        return updatedChampionship

    }

    async delete(id : string) {
        const ChampionshipRepository = AppDataSource.getRepository(Championship);

        
        const existsChampionship = await ChampionshipRepository.findOneBy({
            id
        })

        if(!existsChampionship){
            return Error('Esse campeonato não existe')
        }

        const deletedChampionship = ChampionshipRepository.delete(existsChampionship);


        console.log(existsChampionship)



        return deletedChampionship;

    }
}