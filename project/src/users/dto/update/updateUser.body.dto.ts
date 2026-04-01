import { IsString, IsEmail, IsNumber, IsOptional, IsNotEmpty} from '@nestjs/class-validator';

export class UpdateUserBody {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsNumber()
    age?: number;
}