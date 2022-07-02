import {AppDataSource} from '../database/dataSource'
import { User } from '../entities/User'

type CreateUserRequest = {
    username: string;
    gender: string;
    email: string;
    type: string;
    password: string;
}

export class UserService {
    async create({username, password, gender, email, type} : CreateUserRequest) : Promise<User | Error> {
        
        const userRepository = AppDataSource.getRepository(User);

        const isAreadlyUser = await userRepository.findOneBy({email})

        if(isAreadlyUser){
            return new Error('Usuario com esse e-mail ja existe')
        }

        const user = userRepository.create({username, password, gender, email, type})


        console.log(user)
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