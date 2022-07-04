import {Request, Response} from 'express'
import { LocationService } from '../services/LocationService'

export class LocationController {
    async create(req : Request, res: Response){
         /* 	
         #swagger.tags = ['Locations']
         #swagger.description = 'Endpoint para criação de Localizações' */

        console.log(req.body)
        const { cep, number, address, name, numberOfCourts} = req.body;

        console.log({teste: req.body})

        const service = new LocationService();

        const result = await service.create({cep, number, address, numberOfCourts, name});
/* #swagger.parameters['Criar localização'] = {
               in: 'body',
               description: 'Criar uma localização.',
               required: true,
               schema: { $ref: "#/definitions/CreateLocationRequest" }
        } */
        if(result instanceof Error){
            return res.status(400).json(result.message)
        }
     /* #swagger.responses[201] = { 
               schema: { $ref: "#/definitions/CreateLocationResponse" },
               description: 'Local criado com sucesso.' 
        } */
        // #swagger.responses[400] = { description: 'Existe um erro na validação dos campos' }
        // #swagger.responses[401] = { description: 'Usuario não autenticado' }


        return res.status(201).json(result)
    }

    async getAll(req : Request, res: Response){
        /* 	
         #swagger.tags = ['Locations']
         #swagger.description = 'Endpoint para listagem de localizações' */

        const service = new LocationService();

        const result = await service.getAll();
        // #swagger.responses[401] = { description: 'Usuario não autenticado' }

                    /* #swagger.responses[200] = { 
               schema: { $ref: "#/definitions/GetLocationsResponse" },
               description: 'Localizações retornadas.' 
        } */
        return res.status(200).json(result)
    }

    async delete(req : Request, res: Response){
        /* 	
         #swagger.tags = ['Locations']
         #swagger.description = 'Endpoint para a exclusão de localizações' */
        
        const { id } = req.query

        const service = new LocationService();

        const result = await service.delete(id);

        // #swagger.responses[204] = { description: 'Local deletado com sucesso' }
        // #swagger.responses[401] = { description: 'Usuario não autenticado' }

        // #swagger.responses[404] = { description: 'Local não existente' }

        return res.status(204).json(result)
    }

    async update(req : Request, res: Response){
        /* 	
         #swagger.tags = ['Locations']
         #swagger.description = 'Rota para a edição de localizações' */
        
        const { id } = req.query
        
        const { cep, number, address, name, numberOfCourts} = req.body;

        const service = new LocationService();

        const result = await service.update({cep, number, address, numberOfCourts, name, id});
        /* #swagger.parameters['Editar localização'] = {
               in: 'body',
               description: 'Editar uma localização.',
               required: true,
               schema: { $ref: "#/definitions/EditLocationRequest" }
        } */
        // #swagger.responses[204] = { description: 'Local editado com sucesso' }
        // #swagger.responses[401] = { description: 'Usuario não autenticado' }

        // #swagger.responses[404] = { description: 'Local não existente' }

        return res.status(204).json(result)
    }


}