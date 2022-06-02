import {AppDataSource} from '../database/dataSource'
import { Location } from '../entities/Location'

type CreateLocationRequest = {
    cep: string;
    number: string;
}

export class LocationService {
    async create({cep, number} : CreateLocationRequest) : Promise<Location | Error> {
        
        const LocationRepository = AppDataSource.getRepository(Location);

        const isAreadlyLocation = await LocationRepository.findOneBy({
            cep, number
        })

        if(isAreadlyLocation){
            return new Error('Localização ja existe')
        }

        const location = LocationRepository.create({
            cep,
            number
        })

        await LocationRepository.save(location);

        return location;

    }

    async getAll() {
        const LocationRepository = AppDataSource.getRepository(Location);

        const locattions = LocationRepository.find();

        return locattions;

    }


    async delete(id : string) {
        const LocationRepository = AppDataSource.getRepository(Location);

        
        const existsLocation = await LocationRepository.findOneBy({
            id
        })

        if(!existsLocation){
            return Error('Essa localização não existe')
        }


        const deletedLocation = LocationRepository.delete(id);

        return deletedLocation;

    }
}