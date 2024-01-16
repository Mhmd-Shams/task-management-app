import {Body, Controller, Post, Res, UsePipes, ValidationPipe} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {LoginDto} from "./dto/login.dto";
import { Response } from 'express';
import {CreateUserDto} from "../user/dto/create-user.dto";

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService :AuthService,
    ) {}

    @UsePipes(ValidationPipe)
    @Post('/signUp')
    async createAccount(@Body() dto:CreateUserDto, @Res() res:Response){

        return res.json(await this.authService.signUp(dto));
    }

    @Post('/signIn')
    async signIn(@Body() loginDto:LoginDto, @Res() res:Response){

        const result = await this.authService.signIn(loginDto)
        if(result==null)
            return res.status(400).send("credentials are not correct")
        return res.json(result)
    }
}


