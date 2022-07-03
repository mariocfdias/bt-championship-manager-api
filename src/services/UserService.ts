import { StringifyOptions } from 'querystring';
import {AppDataSource} from '../database/dataSource'
import { User } from '../entities/User'

import bcrypt from 'bcrypt';
type CreateUserRequest = {
    username: string;
    password: string;
    email: string;
    type: string;
    gender: string;
}

const SALT_ROUNDS = 10;
const USERNAME_MIN = 3, USERNAME_MAX = 100;
const PASSWORD_MIN = 8, PASSWORD_MAX = 30;
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export class UserService {
    handleFieldLimit(name : string, value : string, minLimit : Number, maxLimit : Number) : string {
        if (!value || value.length < minLimit) {
            return `${name} deve ter pelo menos ${minLimit} caracteres!`;
        }
        if (value.length > maxLimit) {
            return `${name} pode ter no máximo ${maxLimit} caracteres!`;
        }
        return "";
    }

    async create({username, password, gender, email, type} : CreateUserRequest) : Promise<User | Error> {
        let invalid = this.handleFieldLimit("O nome ", username, USERNAME_MIN, USERNAME_MAX);
        if (!invalid) {
            invalid = this.handleFieldLimit("A senha", password, PASSWORD_MIN, PASSWORD_MAX);
        }
        if (!invalid && !EMAIL_REGEX.test(email)) {
            invalid = "E-mail inválido!"; 
        }
        if (!invalid && !type) {
            invalid = "Informe o tipo de conta!";
        }
        if (invalid) {
            return new Error(invalid);
        }

        const userRepository = AppDataSource.getRepository(User);
        const isAlreadyEmail = await userRepository.findOneBy({email})
        
        if (isAlreadyEmail) {
            return new Error('Esse e-mail já está em uso!');
        }
        
        password = await bcrypt.hash(password, SALT_ROUNDS);
        const user = userRepository.create({username, password, gender, email, type});

        await userRepository.save(user);

        return user;

    }

    async getAll() {
        const userRepository = AppDataSource.getRepository(User);

        const users = userRepository.find();

        return users;

    }


    async delete(id : number) {
        const userRepository = AppDataSource.getRepository(User);

        
        const existsUser = await userRepository.findOneBy({
            id
        })

        if(!existsUser){
            return Error('Esse usuario não existe')
        }


        const deletedUser = userRepository.delete(id);

        return deletedUser;

    }
}