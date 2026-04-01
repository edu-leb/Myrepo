import {Body, Controller, Post, Delete, Param, Get, Put, Patch} from "@nestjs/common";
import {CreateUserBody} from "../dto/create/createUser.body.dto";
import {UsersService} from "../services/users.services";
import {UserEntity} from "../entities/user.entity";
import {isEmail} from "@nestjs/class-validator";
import {UpdateUserBody} from "../dto/update/updateUser.body.dto";

@Controller('users')
export class UsersController {
    constructor(private readonly UsersService: UsersService) {
    }
    @Post()
    createUser(@Body('users') body: CreateUserBody) {
        return this.UsersService.createUser(body);
    }

    @Get()
    findAll() {
        return this.UsersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.UsersService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() body: CreateUserBody
    ) {
        return this.UsersService.update(Number(id), body);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.UsersService.delete(Number(id));
    }
}