import { IsNumber} from "class-validator";
import {IsString} from "class-validator";

export class UpdateTaskDto {

    @IsString()
    task_title:string

    @IsString()
    task_desc:string

    @IsNumber()
    task_duration:number

    @IsNumber()
    userId:number
}
