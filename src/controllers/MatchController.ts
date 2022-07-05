import {Request, Response} from 'express'
import { ChampionshipService } from '../services/ChampionshipService'
import { MatchService } from '../services/MatchService';

export class MatchController {
    
    async consolidate(req : Request, res: Response){
        /* 	
         #swagger.tags = ['Matches']
         #swagger.description = 'Rota para a consolidação de partidas'
        */

           /* #swagger.parameters['Consolidar partida'] = {
               in: 'body',
               description: 'Consolidar uma partida.',
               required: true,
               schema: { $ref: "#/definitions/UpdateMatchRequest" }
        } */
        console.log(req.body)
        const {id} = req.query
        const { firstParticipantPoints, secondParticipantPoints } = req.body;
         // #swagger.responses[204] = { description: 'Partida consolidada com sucesso' }
         // #swagger.responses[404] = { description: 'Partida não existente' }
        // #swagger.responses[401] = { description: 'Usuario não autenticado' }

        const service = new MatchService();

        const result = await service.update({id, firstParticipantPoints, secondParticipantPoints});

        if(result instanceof Error){
            return res.status(404).json(result.message)
        }

        return res.status(204).json(result)
    }

    async getAll(req : Request, res: Response){
        /* 	
         #swagger.tags = ['Championships']
         #swagger.description = 'Rota para a inscrição de atletas em campeonatos'
        */

        const service = new MatchService();

        const result = await service.getAll();

        console.log(result)
        return res.json(result)
    }

    async create(req : Request, res: Response){
        /* 	
         #swagger.tags = ['Championships']
         #swagger.description = 'Rota para a inscrição de atletas em campeonatos'
        */

        const service = new MatchService();

        const { championshipId } = req.query
        const { firstParticipantId, secondParticipantId, name, group, number } = req.body

        const result = await service.create({championshipId, firstParticipantId, secondParticipantId, name, group, number});

        return res.json(result)
    }

    async delete(req : Request, res: Response){
        /* 	
         #swagger.tags = ['Championships']
         #swagger.description = 'Rota para a exclusão de campeonatos'
        */
        
        const { id } = req.params

        const service = new ChampionshipService();

        const result = await service.delete(id);

        return res.json(result)
    }

    async update(req : Request, res: Response){
        /* 	
         #swagger.tags = ['Championships']
         #swagger.description = 'Rota para a edição de campeonatos'
        */
         // #swagger.responses[204] = { description: 'Campeonato atualizado com sucesso' }
        // #swagger.responses[400] = { description: 'Existe um erro na validação dos campos' }
         const { category, name, numberOfParticipants, description, enrollStartDate, enrollEndDate, startDate, endDate } = req.body;

        const service = new ChampionshipService();

        const result = await service.delete(id);

        return res.json(result)
    }


}