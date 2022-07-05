import {Request, Response} from 'express'
import { ChampionshipService } from '../services/ChampionshipService'

export class ChampionshipController {
    async create(req : Request, res: Response){
    /* 	
         #swagger.tags = ['Championships']
         #swagger.description = 'Rota para a criação de campeonatos'
        */
        console.log(req.body)
        const { category, name, numberOfParticipants, description,locationId , enrollStartDate, enrollEndDate, startDate, endDate } = req.body;

        
        const service = new ChampionshipService();
        /* #swagger.parameters['Novo Campeonato'] = {
               in: 'body',
               description: 'Informações do campeonato.',
               required: true,
               schema: { $ref: "#/definitions/CreateChampionshipRequest" }
        } */
        const result = await service.create({category, name, locationId , numberOfParticipants, description, enrollStartDate, enrollEndDate, startDate, endDate});

        if(result instanceof Error){
            return res.status(400).json(result.message)
        }
                    /* #swagger.responses[201] = { 
               schema: { $ref: "#/definitions/CreateChampionshipResponse" },
               description: 'Criação de campeonatos.' 
        } */
                // #swagger.responses[401] = { description: 'Usuario não autenticado' }

        return res.status(201).json(result)
    }

    async enroll(req : Request, res: Response){
        /* 	
         #swagger.tags = ['Championships']
         #swagger.description = 'Rota para a inscrição de atletas em campeonatos'
        */
        console.log(req.body)
        const { name, email,championshipId } = req.body;

        const service = new ChampionshipService();
/* #swagger.parameters['Inscrever em campeonato'] = {
               in: 'body',
               description: 'Inscreve-se em um campeonato.',
               required: true,
               schema: { $ref: "#/definitions/PostEnrollChampionshipRequest" }
        } */

        // #swagger.responses[200] = { description: 'Inscrição feita com sucesso' }

        // #swagger.responses[400] = { description: 'Problema na validação de inscrição' }

        // #swagger.responses[401] = { description: 'Usuario não autenticado' }

        

        const result = await service.enroll({name, email, championshipId});

        if(result instanceof Error){
            return res.status(400).json(result.message)
        }

        return res.status(200).json(result)
    }

    async getAll(req : Request, res: Response){
        /* 	
         #swagger.tags = ['Championships']
         #swagger.description = 'Rota para a inscrição de atletas em campeonatos'
        */

          /* #swagger.responses[200] = { 
               schema: { $ref: "#/definitions/GetChampionshipsResponse" },
               description: 'Listagem de campeonatos.' 
        } */


        const { id } = req.query

        const service = new ChampionshipService();

        if(id){
            const result = await service.getById(id);

            return res.json(result)
        }

        const result = await service.getAll();

        return res.json(result)
    }



    async delete(req : Request, res: Response){
        /* 	
         #swagger.tags = ['Championships']
         #swagger.description = 'Rota para a exclusão de campeonatos'
        */
        
         console.log(req.query)
        const { id } = req.query

        const service = new ChampionshipService();

        const result = await service.delete(id);
        // #swagger.responses[204] = { description: 'Campeonato deletado com sucesso' }
        // #swagger.responses[401] = { description: 'Usuario não autenticado' }

        // #swagger.responses[404] = { description: 'Campeonato não existente' }
        return res.status(204).json(result)
    }

    async update(req : Request, res: Response){
        /* 	
         #swagger.tags = ['Championships']
         #swagger.description = 'Rota para a edição de campeonatos'
        */
               /* #swagger.parameters['Editar Campeonato'] = {
               in: 'body',
               description: 'Editar informações do campeonato.',
               required: true,
               schema: { $ref: "#/definitions/EditChampionshipRequest" }
        } */
         /* #swagger.responses[204] = { 
             
               description: 'Edição de campeonatos bem sucedida.' 
        } */
        // #swagger.responses[400] = { description: 'Existe um erro na validação dos campos' }
                // #swagger.responses[401] = { description: 'Usuario não autenticado' }

        const { id } = req.query;

        const { description, endDate, startDate, enrollEndDate, enrollStartDate, locationId, name   } = req.body

        if(!id){
            return new Error("ID Invalido")
        }

        const service = new ChampionshipService();

        const championship = await service.update({name,id ,description, endDate: new Date(endDate), startDate: new Date(startDate), enrollEndDate: new Date(enrollEndDate), enrollStartDate: new Date(enrollStartDate), locationId});

        if(!championship) return new Error("Campeonato não encontrado")

        return res.status(200).json(championship)
    }


}