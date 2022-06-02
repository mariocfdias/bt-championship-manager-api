import {Request, Response} from 'express'
import { LocationService } from '../services/LocationService'

export class LocationController {
    async create(req : Request, res: Response){
        console.log(req.body)
        const { cep, number} = req.body;

        const service = new LocationService();

        const result = await service.create({cep, number});

        if(result instanceof Error){
            return res.status(400).json(result.message)
        }

        return res.json(result)
    }

    async getAll(req : Request, res: Response){
        

        const service = new LocationService();

        const result = await service.getAll();

        return res.json(result)
    }

    async delete(req : Request, res: Response){
        
        const { id } = req.params

        const service = new LocationService();

        const result = await service.delete(id);

        return res.json(result)
    }



}