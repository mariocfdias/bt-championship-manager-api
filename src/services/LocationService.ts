import {AppDataSource} from '../database/dataSource'
import { Location } from '../entities/Location'

type CreateLocationRequest = {
    cep: string;
    number: String;
    address: String;
    name: String;
    numberOfCourts: number;
}

export class LocationService {
    async create({cep, number, address, numberOfCourts, name} : CreateLocationRequest) : Promise<Location | Error> {
        
        const LocationRepository = AppDataSource.getRepository(Location);

        const isAreadlyLocation = await LocationRepository.findOneBy({
            cep
        })

        if(isAreadlyLocation){
            return new Error('Localização ja existe')
        }

        const location = LocationRepository.create({
            cep,
            number,
            address,
            numberOfCourts,
            name
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

        console.log(existsLocation)

        if(!existsLocation){
            return Error('Essa localização não existe')
        }


        const deletedLocation = LocationRepository.delete(existsLocation);

        return deletedLocation;

    }

    
}