import { Entity } from "kernel/types";

export type TUser = Entity<number> & {
    username: string;
    password?: string;
    status?: string;
    person:any;
}