import {IsEmail, IsEmpty, IsNotEmpty, Validate} from "class-validator";
import {Unique} from "typeorm";
import {User} from "../entities/user.entity";
import {roles} from "../roles/roles.enum";

export class CreateUserDto {


    @IsNotEmpty({message:'user name is required'})
    username:string


    @IsNotEmpty({message:'email is required'})
    @IsEmail()
    email:string

    @IsNotEmpty({message:'password is required'})
    password:string

    @IsEmpty()
    role:roles

}
