import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UsePipes,
  ValidationPipe,
  UseGuards
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {Response} from "express";
import {AuthGuard} from "@nestjs/passport";
import {RolesGuard} from "../user/guards/roles.guard";
import {roles} from "../user/roles/roles.enum";
import {Roles} from "../user/utils/roles.decorator";
import {GetCurrentUserById} from "../user/utils/get-user-by-id.decorator";

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles(roles.ADMIN)
  @UsePipes(ValidationPipe)
  async create(@Body() createTaskDto: CreateTaskDto , @Res() response:Response)  {
    return  response.json(await this.taskService.create(createTaskDto));
  }

  @Get()
  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles(roles.ADMIN)
  async findAll(
      @Res() res:Response
  ) {

    const result = await this.taskService.findAll()
    if(result)
      return res.json(result)
    return res.status(400).send();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles(roles.ADMIN)
  async findOne(@Param('id') id: string , @Res() res:Response) {
    return res.json(await this.taskService.findOne(+id));
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles(roles.ADMIN)
  @UsePipes(ValidationPipe)
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto , @Res() res:Response) {
    await this.taskService.update(+id, updateTaskDto)
    return res.status(200).send();
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles(roles.ADMIN)
  async remove(@Param('id') id: string , @Res() res:Response) {

    await this.taskService.remove(+id)
    return res.status(200).send();
  }

  @Post('/myTask')
  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Roles(roles.USER)
  async getMyTasks(
      @GetCurrentUserById() id:number ,
      @Res() res:Response
  ){

    return res.json(await this.taskService.getMyTask(id))
  }
}
