import { LocationController } from '../controllers/LocationController';
import {AppDataSource} from '../database/dataSource'
import { Championship } from '../entities/Championship'
import { User } from "../entities/User"
import { Location } from "../entities/Location"

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

    async enroll({ userId, championshipId } : EnrollChampionshipRequest) : Promise<Championship | Error> {
        
        const ChampionshipRepository = AppDataSource.getRepository(Championship);
        const UserRepository = AppDataSource.getRepository(User);

        const championshipList = await ChampionshipRepository.find(
            {
                relations: ["participants"]
            } );
            const championship = await ChampionshipRepository.findOne({
                where: {
                id: championshipId
            },
            relations: ["participants"]

        })
            const user = await UserRepository.findOneBy({
                id: userId
            })

            
            if(!championship || !user){
                return new Error('Campeonato ou usuario inexistente')
            }
            console.log(championship)
            championship.participants.push(user)

            await ChampionshipRepository.save(championship)

        console.log({championship})
        console.log("aqui")

       

        //await ChampionshipRepository.save(championship);

        //return championship;
        return new Error('teste')

    }


    async getAll() {
        const ChampionshipRepository = AppDataSource.getRepository(Championship);

        const championships = ChampionshipRepository.find({
            relations: ["participants"]
        });

        return championships;

    }

    async getById(id : string) {
        const ChampionshipRepository = AppDataSource.getRepository(Championship);

        const championship = ChampionshipRepository.find({
            where: {
                id
            },
            relations: ["participants"]
        });

        if(!championship){
            return Error('Esse campeonato não existe')
        }

        return championship;

    }


    async delete(id : string) {
        const ChampionshipRepository = AppDataSource.getRepository(Championship);

        
        const existsChampionship = await ChampionshipRepository.findOneBy({
            id
        })

        if(!existsChampionship){
            return Error('Esse campeonato não existe')
        }

        console.log(existsChampionship)


        const deletedChampionship = ChampionshipRepository.delete(existsChampionship);

        return existsChampionship;

    }
}