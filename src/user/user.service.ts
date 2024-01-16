import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Repository} from "typeorm";

@Injectable()
export class UserService {

  constructor(
      @InjectRepository(User)
      private readonly userRepo:Repository<User>
  ) {}
  async create(dto: CreateUserDto) {
    return await this.userRepo.save(
        this.userRepo.create({...dto})
    );
  }

  async findAll() {
    return await this.userRepo.find({select:['id','username']});
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({
      where:{
        id
      }
    });
    if(user)
      return user
    else return null
  }

  async findOneByEmail(email: string,password:string) {

    const user =  await this.userRepo.findOne({
      where:{
        email,
        password
      },
      select:{
        id:true ,
        username:true,
        role:true
      }
    });

    if(user)
      return user
    return null
  }

  async update(id: number, updateUserDto: UpdateUserDto) {

    await this.userRepo.update(id,{...updateUserDto})
    return
  }

  async remove(id: number) {

    var user = null
    try {
       user = await this.userRepo.findOneByOrFail({id})
      console.log(user)
    }
    catch (e) {
      console.log('inside catch')
      return null

    }
    return await this.userRepo.remove(user)
  }
}
