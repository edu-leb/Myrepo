import {Injectable, BadRequestException, NotFoundException, } from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CreateUserBody} from '../dto/create/createUser.body.dto';
import {UserEntity} from '../entities/user.entity';
import {UpdateUserBody} from "../dto/update/updateUser.body.dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>
    ) {}

    findAll() {
        return this.usersRepository.find();
    }

    async findOne(id: number) {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) throw new NotFoundException('The user was not found!');
        return user;
    }

    async createUser(body: CreateUserBody): Promise<UserEntity> {
        const user = this.usersRepository.create({
            name: body.name,
            email: body.email,
            age: body.age,
        });

        return await this.usersRepository.save(user);
    }


    async update(id: number, body: UpdateUserBody) {
        const user = await this.usersRepository.findOne({where: {id}});
        if (!user) throw new NotFoundException('The user was not found!');
        Object.assign(user, body);
        await this.usersRepository.save(user);
        return user;
    }

    async delete(id: number) {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) throw new NotFoundException('The user was not found!');
        await this.usersRepository.remove(user);
        return { message: 'User deleted successfully' };
    }
}