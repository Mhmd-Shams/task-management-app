import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {Response} from "express";
import {AuthGuard} from "@nestjs/passport";
import {RolesGuard} from "./guards/roles.guard";
import {roles} from "./roles/roles.enum";
import {Roles} from "./utils/roles.decorator";
import {GetCurrentUserById} from "./utils/get-user-by-id.decorator";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

//for admin to add another user with admin role
  @Post()
  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles(roles.ADMIN)
  @UsePipes(ValidationPipe)
  async createUser(@Body() dto:CreateUserDto , @Res() res:Response){

    dto.role=roles.ADMIN
    await this.userService.create(dto)
    return res.status(201).send()

  }


  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles(roles.ADMIN)
  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles(roles.ADMIN)
  async findOne(@Param('id') id: string , @Res() response:Response) {

    const user = await this.userService.findOne(+id);
     if(user)
       return response.json(user)
    return response.status(400).send()
  }

  @Post('/myInfo')
  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles(roles.ADMIN,roles.USER)
  async getMyInfo(@GetCurrentUserById() id: number , @Res() response:Response) {

    const user = await this.userService.findOne(id);
    if(user)
      return response.json(user)
    return response.status(400).send()
  }

  @Patch('/')
  @UseGuards(AuthGuard('jwt') , RolesGuard)
  @Roles(roles.USER,roles.ADMIN)
  update(@GetCurrentUserById() id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @UseGuards(AuthGuard('jwt') , RolesGuard)
  @Roles(roles.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string , @Res() response:Response) {

    const result = await this.userService.remove(+id)
    if(result)
      return response.json(result)
    else return response.status(400).send()
  }


  // @Delete('/deleteMyAccount')
  // @UseGuards(AuthGuard('jwt') , RolesGuard)
  // @Roles(roles.USER,roles.ADMIN)
  // async removeMyAccount(@GetCurrentUserById() id: number , @Res() response:Response) {
  //   console.log(id)
  //   const result = await this.userService.remove(id)
  //   if(result)
  //     return response.json(result)
  //   else return response.status(400).send()
  // }

}
