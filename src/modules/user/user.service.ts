import { pool } from "../../db";
import type { IUser } from "./user.interface";
import bcrypt from "bcryptjs";

const createUserIntoDB = async(payLoad: IUser)=>{
    const {name,email,password,role} = payLoad;

    const hashPassword = await bcrypt.hash(password,10);
      const result = await pool.query(`
            INSERT INTO users(name,email,password,role) VALUES($1,$2,$3,COALESCE($4,'contributor')) RETURNING *
            `,[name,email,hashPassword,role]);

            delete result.rows[0].password;
            return result;
}


const getAllUsersFromDB = async() => {
    const result = await pool.query(`
            SELECT * FROM users
            `)
            return result
}




export const userService = {
    createUserIntoDB,
    getAllUsersFromDB,
}