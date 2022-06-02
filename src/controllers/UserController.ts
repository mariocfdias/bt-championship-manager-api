import {Request, Response} from 'express'
import { UserService } from '../services/UserService'

export class UserController {
    async create(req : Request, res: Response){
        console.log(req.body)
        const { username, password} = req.body;

        const service = new UserService();

        const result = await service.create({username, password});

        if(result instanceof Error){
            return res.status(400).json(result.message)
        }

        return res.json(result)
    }

    async getAll(req : Request, res: Response){
        

        const service = new UserService();

        const result = await service.getAll();

        return res.json(result)
    }

    async delete(req : Request, res: Response){
        
        const { id } = req.params

        const service = new UserService();

        const result = await service.delete(id);

        return res.json(result)
    }



}