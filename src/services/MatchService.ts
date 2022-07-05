import { Repository } from "typeorm";
import { AppDataSource } from "../database/dataSource";
import { Championship } from "../entities/Championship";
import { Match } from "../entities/Match";
import { Participant } from "../entities/Participant";

export class MatchService {
    async create({championshipId, firstParticipantId, secondParticipantId, name, group, number}) {
        const MatchRepository = AppDataSource.getRepository(Match);
        const ChampionshipRepository = AppDataSource.getRepository(Championship);
        const ParticipantRepository = AppDataSource.getRepository(Participant);

        const firstParticipant = await ParticipantRepository.findOne({
            where: {
                id: firstParticipantId
            }
        })

        const secondParticipant = await ParticipantRepository.findOne({
            where: {
                id: secondParticipantId
            }
        })

        const championship = await ChampionshipRepository.findOne({
            where: {
                id: championshipId
        },
        relations: ["matches", "participants"]
          })

          if(!championship){
            throw new Error("Campeonato relacionado não existe")
          }

          console.log(firstParticipant)

          const newMatch = MatchRepository.create({championship, firstParticipant, secondParticipant, name, group, number, firstParticipantPoints: 0, secondParticipantPoints: 0})

          let savedMatch = await MatchRepository.save(newMatch)
          //championship.matches.push(savedMatch)

          console.log({newMatch})
          



        

    }

    async getAll(){
        const matchRepository = AppDataSource.getRepository(Match);

        const matches = matchRepository.find();

        return matches;
    }

    async update() {
        
    }


    async delete(id : string) {
       

    }

    
}