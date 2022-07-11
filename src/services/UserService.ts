import { StringifyOptions } from 'querystring';
import {AppDataSource} from '../database/dataSource'
import { User } from '../entities/User'
import bcrypt from 'bcrypt';
import { Participant } from '../entities/Participant';
const md5 = require('blueimp-md5');
import { Match } from '../entities/Match';

type CreateUserRequest = {
    username: string;
    gender: string;
    email: string;
    type: string;
    password: string;
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


        console.log(user)
        await userRepository.save(user);

        return user;

    }

    async exists({id} : any){
        const userRepository = AppDataSource.getRepository(User);

        const user = await userRepository.findOneBy({id});

        return user ? true : false;
    }

    async getMatchesByEmail({email} : any){
        const repository = AppDataSource.getRepository(Participant);
        const matchRepository = AppDataSource.getRepository(Match);
        const firstParticipantMatchResult = await matchRepository.find({
            where:{
                firstParticipant: {email}
            }
        })
        const secondParticipantMatchResult = await matchRepository.find({
            where:{
                secondParticipant: {email}
            }
        })

        const matchResult = [...firstParticipantMatchResult, ...secondParticipantMatchResult]


         console.log(matchResult)
        const result = await repository.find({
            where: {email},
            relations:["championships"]
        })

        return {championships: result.map(e => e.championships), matches: matchResult}
    }

    async findByEmail(email: string) {
        const userRepository = AppDataSource.getRepository(User);
        return userRepository.findOneBy({email});
    }

    async findByID(id: string) {
        const userRepository = AppDataSource.getRepository(User);
        return userRepository.findOneBy({id});
    }

    async isPasswordCorrect(password: string, encryptedCorrectPassword: string) {
        return await bcrypt.compare(password, encryptedCorrectPassword);
    }
    getAvatarURL(email: string) {
        return `https://www.gravatar.com/avatar/${md5(email)}?s=1024`;
    }
    async getAll() {
        const userRepository = AppDataSource.getRepository(User);

        const users = userRepository.find();

        return users;

    }

    async updateImage({userId, url}){
        const userRepository = AppDataSource.getRepository(User);

        
        const existsUser = await userRepository.findOneBy({
            id: userId
        })

        if(!existsUser){
            return Error('Esse usuario não existe')
        }

        existsUser.url = url

        return userRepository.save(existsUser)
    }


    async delete(id : string) {
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