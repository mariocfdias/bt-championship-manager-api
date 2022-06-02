import {Request, Response} from 'express'
import { ChampionshipService } from '../services/ChampionshipService'

export class ChampionshipController {
    async create(req : Request, res: Response){
        console.log(req.body)
        const { name } = req.body;

        const service = new ChampionshipService();

        const result = await service.create({name});

        if(result instanceof Error){
            return res.status(400).json(result.message)
        }

        return res.json(result)
    }

    async enroll(req : Request, res: Response){
        console.log(req.body)
        const { userId, championshipId } = req.body;

        const service = new ChampionshipService();

        const result = await service.enroll({userId, championshipId});

        if(result instanceof Error){
            return res.status(400).json(result.message)
        }

        return res.json(result)
    }

    async getAll(req : Request, res: Response){
        

        const service = new ChampionshipService();

        const result = await service.getAll();

        return res.json(result)
    }

    async delete(req : Request, res: Response){
        
        const { id } = req.params

        const service = new ChampionshipService();

        const result = await service.delete(id);

        return res.json(result)
    }



}