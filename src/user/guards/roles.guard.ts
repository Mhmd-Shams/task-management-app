import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { roles } from '../roles/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate{

    constructor(private reflector : Reflector){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const requiredRoles = this.reflector.getAllAndOverride<roles[]>(
            'roles',
            [
                context.getHandler(),
                context.getClass()
            ]
        )

        const {user} = context.switchToHttp().getRequest();

        if(!requiredRoles)
        {
            return true
        }

        return requiredRoles.some((role)=>user.role.includes(role))
    }
}