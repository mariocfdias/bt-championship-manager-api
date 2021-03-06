import {Request, Response} from 'express'
import { UserService } from '../services/UserService'
import { BlobService } from '../services/BlobService';
import { ChampionshipController } from './ChampionshipController';
export class UserController {
    async create(req : Request, res: Response){
         /* 	
         #swagger.tags = ['User']
         #swagger.description = 'Endpoint para criar novos usuarios enquanto admininstrador'
         */
        
        const { username, password, gender, email, type} = req.body;
        const service = new UserService();

        const result = await service.create({username, password, gender, email, type});
        /* #swagger.parameters['Criar usuario'] = {
               in: 'body',
               description: 'Criar um usuario.',
               required: true,s
               schema: { $ref: "#/definitions/CreateUserRequest" }
        } */
        if (result instanceof Error){
            return res.status(400).json(result.message)
        }
        /* #swagger.responses[201] = { 
               schema: { $ref: "#/definitions/CreateUserResponse" },
               description: 'Usuário cadastrado.' 
        } */
                // #swagger.responses[401] = { description: 'Usuario não autenticado' }

        // #swagger.responses[400] = { description: 'Existem erros de validação' }
        return res.status(201).json(result)
    }
    

    async getAll(req : Request, res: Response){
         /* 	
         #swagger.tags = ['User']
         #swagger.description = 'Endpoint para retornar todos os usuarios' */


        const service = new UserService();

        const result = await service.getAll();
        /* #swagger.responses[200] = { 
               schema: { $ref: "#/definitions/GetUsersResponse" },
               description: 'Lista de usuarios.' 
        } */
        // #swagger.responses[401] = { description: 'Usuario não autenticado' }

        return res.status(200).json(result)
    }

    async getMatchesByEmail(req : Request, res: Response){
        const { email} = req.query

        const service = new UserService();

        const result = await service.getMatchesByEmail({email})

        return res.status(200).json(result)

    }

    async delete(req : Request, res: Response){
         /* 	
         #swagger.tags = ['User']
        #swagger.description = 'Endpoint para deletar usuario' 
        */

        
        const { id } = req.params

        const service = new UserService();

        const result = await service.delete(id);
        // #swagger.responses[204] = { description: 'Usuario deletado com sucesso' }
        // #swagger.responses[401] = { description: 'Usuario não autenticado' }

        // #swagger.responses[404] = { description: 'Usuario não existente' }
        return res.status(204).json(result)
    }

    async update(req : Request, res: Response){
        /* 	
        #swagger.tags = ['User']
       #swagger.description = 'Rota para atualizar usuario' 
       */

         /* #swagger.parameters['Editar usuario'] = {
               in: 'body',
               description: 'Editar um usuario.',
               required: true,
               schema: { $ref: "#/definitions/EditUserRequest" }
        } */
       const { id } = req.params

       const service = new UserService();

       const result = await service.delete(id);
       // #swagger.responses[204] = { description: 'Usuario editado com sucesso' }
        // #swagger.responses[401] = { description: 'Usuario não autenticado' }

       // #swagger.responses[404] = { description: 'Usuario não existente' }
       return res.status(204).json(result)
   }

   async uploadImage(req: Request, res: Response){

    console.log(req.query)
    const {id} = req.query

    const blobService = new BlobService()
    const userService = new UserService()

    let userDoExist = await userService.exists({id})
    if(!userDoExist) return res.status(404).json({Error: "Usuario não existente"})

    console.log(req.body)
    const url = await blobService.generateBlob({userId: id, image: req.body})

    userService.updateImage({userId: id, url: url})

    return res.status(200).json({url})
   }

}