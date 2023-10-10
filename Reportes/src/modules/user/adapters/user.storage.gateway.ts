import { TUser } from "../entities/user";
import { IUserRepository } from "../use-cases/ports/user.repository";
import {pool} from '../../../config/postgres';
// Dao | "Service Repository"
export class UserStorageGateway implements IUserRepository {
    async findAll(): Promise<TUser[]> {
        const query =  `SELECT * FROM users ORDER BY id DESC;`;
        const {rows: userRows} = await pool.query(query);
        return userRows.map((user)=><TUser>user);
    }
    findById(id: number): Promise<TUser> {
        throw new Error("Method not implemented.");
    }
    async save(user: TUser): Promise<boolean> {
        const query =  `INSERT INTO users(username,password,status,person)
        VALUES (
            
        );`;
        const {rows: userRows} = await pool.query(query);
        return (userRows)? true : false; 
    }
    async update(user: TUser): Promise<boolean> {
        const query =  `SELECT * FROM users ORDER BY id DESC;`;
        const {rows: userRows} = await pool.query(query);
        return (userRows)? true : false; 
    }
    async delete(id: number): Promise<boolean> {
        const query =  `SELECT * FROM users ORDER BY id DESC;`;
        const {rows: userRows} = await pool.query(query);
        return (userRows)? true : false; 
    }

}