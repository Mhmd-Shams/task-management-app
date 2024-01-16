import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../user/entities/user.entity";
import {AuthController} from "./auth.controller";
import {JwtModule} from "@nestjs/jwt";
import {UserModule} from "../user/user.module";

@Module({
  imports:[TypeOrmModule.forFeature([User]), JwtModule.register({
    secret:'super-secret-cat',
  }) , UserModule],
  controllers:[AuthController],
  providers: [AuthService]
})
export class AuthModule {}
