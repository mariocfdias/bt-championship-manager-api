import {AppDataSource} from '../database/dataSource'
import { Location } from '../entities/Location'

type CreateLocationRequest = {
    cep: string;
    number: string;
    address: string;
    name: string;
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

    async update({id, cep, number, address, numberOfCourts, name} : any) : Promise<Location | Error> {
        
        const LocationRepository = AppDataSource.getRepository(Location);

        const editedLocation = await LocationRepository.findOneBy({
            id
        })

        if(!editedLocation){
            return new Error('Localização não existe')
        }

        if(address) editedLocation.address = address
        if(cep) editedLocation.cep = cep
        if(name) editedLocation.name = name
        if(number) editedLocation.number = number
        if(numberOfCourts) editedLocation.numberOfCourts = numberOfCourts

        await LocationRepository.save(editedLocation);

        return editedLocation
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