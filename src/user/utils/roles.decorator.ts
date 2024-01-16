import { SetMetadata } from "@nestjs/common";
import { roles } from "../roles/roles.enum";

export const Roles = (...roles:roles[])=>SetMetadata('roles',roles)