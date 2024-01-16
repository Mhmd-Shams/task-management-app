import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import {AuthModule} from "./auth/auth.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import { TaskModule } from './task/task.module';
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./auth/strategy/jwt.strategy";

@Module({
  imports: [
      TypeOrmModule.forRoot({
        type:'mysql',
        host:'localhost',
        port:3306,
        database:'test-app',
        username:'root',
        password:'hello123',
        autoLoadEntities:true,
        synchronize:true
      })

      ,JwtModule,UserModule , AuthModule, TaskModule],
  controllers: [AppController],
  providers: [AppService,JwtStrategy],
})
export class AppModule {}
