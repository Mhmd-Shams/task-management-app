import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Task} from "./entities/task.entity";
import {Repository} from "typeorm";

@Injectable()
export class TaskService {

  constructor(
      @InjectRepository(Task)
      private readonly taskRepo:Repository<Task>
  ) {
  }
  async create(dto: CreateTaskDto) {

    const task = await this.taskRepo.save(
        this.taskRepo.create({
          ...dto
        })
    )
    setTimeout(()=>{
      this.taskRepo.update(task.id , {task_status:false})
    },task.task_duration*60*60*1000)

    return task
  }

  async findAll() {

    return await this.taskRepo.find({
      select:{
        id:true,
        task_title:true
      }
    })
  }

  async findOne(id: number) {
    return await this.taskRepo.findOne({
      where:{
        id,
      },
      relations:{
        user:true,
      }
    });
  }

  async update(id: number, dto: UpdateTaskDto) {
    return await this.taskRepo.update(
        id,{...dto}
    )
  }

  async remove(id: number) {

    return await this.taskRepo.delete(id)
  }

  async getMyTask(userId:number)
  {
    return await this.taskRepo.find({
      where:{
        userId
      }
    })
  }
}
