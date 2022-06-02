import {AppDataSource} from '../database/dataSource'
import { User } from '../entities/User'

type CreateUserRequestt = {
    username: string;
    password: string;
}

export class UserService {
    async create({username, password} : CreateUserRequestt) : Promise<User | Error> {
        
        const userRepository = AppDataSource.getRepository(User);

        const isAreadlyUser = await userRepository.findOneBy({username})

        if(isAreadlyUser){
            return new Error('Usuario com esse nome ja existe')
        }

        const user = userRepository.create({username, password})

        await userRepository.save(user);

        return user;

    }

    async getAll() {
        const userRepository = AppDataSource.getRepository(User);

        const users = userRepository.find();

        return users;

    }


    async delete(id : string) {
        const userRepository = AppDataSource.getRepository(User);

        
        const existsUser = await userRepository.findOneBy({
            id
        })

        if(!existsUser){
            return Error('Essa usuario não existe')
        }


        const deletedUser = userRepository.delete(id);

        return deletedUser;

    }
}