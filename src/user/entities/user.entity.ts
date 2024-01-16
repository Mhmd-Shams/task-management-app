import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Task} from "../../task/entities/task.entity";
import {roles} from "../roles/roles.enum";
@Entity({name:'users'})
export class User {

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    username:string

    @Column({unique:true})
    email:string

    @Column()
    password:string

    @Column()
    role:roles

    @OneToMany(()=>Task , (task=>task.user))
    tasks:Task[]

}
