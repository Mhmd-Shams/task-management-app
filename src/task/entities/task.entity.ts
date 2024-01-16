import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../user/entities/user.entity";

@Entity({name:'tasks'})
export class Task {

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    task_title:string

    @Column()
    task_desc:string

    //task duration in hours
    @Column()
    task_duration:number

    //true => true means task duration has not ended yet
    //false => false means task duration ended
    @Column({default:true})
    task_status:boolean

    @Column()
    userId:number

    @ManyToOne(()=>User , (user=>user.tasks))
    user:User

}
