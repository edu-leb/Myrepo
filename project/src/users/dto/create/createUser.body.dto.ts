import { IsEmail, IsString, IsOptional, IsNumber } from '@nestjs/class-validator';

export class CreateUserBody {

    @IsEmail()
    email: string;

    @IsString()
    name: string;

    @IsOptional()
    @IsNumber()
    age?: number;
}
