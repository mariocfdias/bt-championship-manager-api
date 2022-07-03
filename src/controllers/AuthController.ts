import {Request, Response} from 'express'
import { ChampionshipService } from '../services/ChampionshipService'
import {UserService} from '../services/UserService'

export class AuthController {
    async signIn(req : Request, res: Response){

         /* 	
         #swagger.tags = ['Auth']
         #swagger.description = 'Rota para login' 
         */

        const { email, password } = req.body;

        const service = new UserService();

        const user = await service.findByEmail(email);

        if (user == null) {
            return res.status(401).json({message: "Não existe conta com este e-mail.", success: false});
        }
        const isCorrect = await service.isPasswordCorrect(password, user.password);
        if (!isCorrect) {
            return res.status(401).json({message: "Senha incorreta!", success: false});
        }
        /* #swagger.parameters['Login'] = {
               in: 'body',
               description: 'Informações do login.',
               required: true,
               schema: { $ref: "#/definitions/PostLoginRequest" }
        } */
        // #swagger.responses[401] = { description: 'Usuario ou senha invalido' }


          /* #swagger.responses[200] = { 
               schema: { $ref: "#/definitions/PostLoginResponse" },
               description: 'Rota de login.' 
        } */
        return res.status(200).json({message: "Usuário " + user.username + " logado com sucesso!", success: true});
    }

    async register(req : Request, res: Response){
        /* 	
         #swagger.tags = ['Auth']
         #swagger.description = 'Rota para registro' 
         */
          /* #swagger.parameters['Novo Usuario'] = {
               in: 'body',
               description: 'Informações do usuário.',
               required: true,
               schema: { $ref: "#/definitions/PostRegisterRequest" }
        } */

        const { username, password, gender, email, type } = req.body;

        const service = new UserService();

        const result = await service.create({username, password, gender, email, type})
            
        /* #swagger.responses[201] = { 
               schema: { $ref: "#/definitions/PostRegisterResponse" },
               description: 'Usuário cadastrado.' 
        } */
        // #swagger.responses[400] = { description: 'Existem erros de validação' }

        if (result instanceof Error){
            return res.status(400).json({ message: result.message, success: false})
        }
        return res.status(201).json({ message: 'Usuário cadastrado.', success: true});
    }
}