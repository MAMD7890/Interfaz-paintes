import { Role } from "./role.model";

export interface User {
    iduser?: number;
    email?: string;
    username?: string;
    password?: string;
    worker?: Worker;
    role?: Role;
  }
  