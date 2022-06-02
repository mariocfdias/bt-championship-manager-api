import {AppDataSource} from '../database/dataSource'
import { Championship } from '../entities/Championship'
import { User } from "../entities/User"

type CreateChampionshipRequest = {
    name: string;
}

type EnrollChampionshipRequest = {
    userId : string;
    championshipId: string;
}

export class ChampionshipService {
    async create({ name } : CreateChampionshipRequest) : Promise<Championship | Error> {
        
        const ChampionshipRepository = AppDataSource.getRepository(Championship);

        const isAreadlyChampionship = await ChampionshipRepository.findOneBy({
            name
        })

        if(isAreadlyChampionship){
            return new Error('Campeonato ja existe')
        }

        const championship = ChampionshipRepository.create({
            name
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


    async delete(id : string) {
        const ChampionshipRepository = AppDataSource.getRepository(Championship);

        
        const existsChampionship = await ChampionshipRepository.findOneBy({
            id
        })

        if(!existsChampionship){
            return Error('Esse campeonato não existe')
        }


        const deletedChampionship = ChampionshipRepository.delete(id);

        return existsChampionship;

    }
}