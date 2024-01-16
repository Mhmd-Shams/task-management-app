import { IsNotEmpty, IsNumber} from "class-validator";

export class CreateTaskDto {

    @IsNotEmpty({message:'task title is required'})
    task_title:string

    @IsNotEmpty({message:'task description is required'})
    task_desc:string

    @IsNotEmpty({message:'task duration is required'})
    @IsNumber()
    task_duration:number

    @IsNotEmpty({message:'id of user is required'})
    @IsNumber()
    userId:number
}
