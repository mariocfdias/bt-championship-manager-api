import {Request, Response} from 'express'
import { ChampionshipService } from '../services/ChampionshipService'
import {UserService} from '../services/UserService'
const jwt = require('jsonwebtoken');

export class AuthController {
    async signIn(req : Request, res: Response){
        const { email, password } = req.body;

        const service = new UserService();

       // const result = await service.create({username, password});
        const user = await service.findByEmail(email);

        if (user == null) {
            return res.status(401).json({message: "Não existe conta com este e-mail."});
        }
        const isCorrect = await service.isPasswordCorrect(password, user.password);
        if (!isCorrect) {
            return res.status(401).json({message: "Senha incorreta!"});
        }
        const info = {
            id: user.id,
            name: user.username,
            type: user.type
        };
        const token = jwt.sign(info, process.env.JWT_KEY, { expiresIn: '1h' });
        /* #swagger.parameters['Login'] = {
               in: 'body',
               description: 'Informações do login.',
               required: true,
               schema: { $ref: "#/definitions/PostLoginRequest" }
        } */
        //if(result instanceof Error){
        // #swagger.responses[401] = { description: 'Usuario ou senha invalido' }

        //    return res.status(401).json(result.message)
       // }

          /* #swagger.responses[200] = { 
               schema: { $ref: "#/definitions/PostLoginResponse" },
               description: 'Rota de login.' 
        } */
        //return res.status(200).json(result)
        return res.status(200).json({
            message: "Usuário " + user.username + " logado com sucesso!",
            info,
            token
        });
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
            return res.status(400).json({ message: result.message})
        }
        return res.status(201).json({ message: 'Usuário cadastrado.'});
    }
}