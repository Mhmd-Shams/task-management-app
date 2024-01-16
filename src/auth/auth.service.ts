import { Injectable } from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {UserService} from "../user/user.service";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {LoginDto} from "./dto/login.dto";

@Injectable()
export class AuthService {
    constructor(
        private userService :UserService,
        private jwtService: JwtService,
    ) {}


    async signUp(dto:CreateUserDto) {

        try{
            const newUser = await this.userService.create(dto)
            return {token:this.signUser(newUser.id, newUser.username,newUser.role)}
        }catch (e) {
            console.log(e)
        }
    }

    async signIn(loginDto:LoginDto) {
        try {
            const user = await this.userService.findOneByEmail(loginDto.email,loginDto.password)
            if (user) {
                return {token:this.signUser(user.id,user.username,user.role)}
            } else
                return null
        }catch (e) {
            console.log(e);
        }
    }

    private signUser(userId: number, username: string,role:string) {
        return this.jwtService.sign({
            id: userId,
            username:username,
            role:role
        });

    }
}
