import bcrypt from "bcryptjs";
import { pool } from "../../db";
import jwt from "jsonwebtoken"
import config from "../../config";

const loginUserIntoDB = async(payLoad: {email:string,password:string}) =>{
       const {email,password} = payLoad;
    
       const userData = await pool.query(`
        SELECT * FROM users WHERE email=$1
        `,[email]);
        if(userData.rows.length === 0){
            throw new Error("Invalid Credentials");
        }
        const user = userData.rows[0];
       const matchPassword = await bcrypt.compare(password,user.password);
     
      
       if(!matchPassword){
        throw new Error("Invalid Credentials");
       }



const jwtpayload = {
    id:user.id,
    name:user.name,
    email:user.email,
    
}

const accessToken = jwt.sign(jwtpayload,config.secret as string,{
    expiresIn:'1d',
})


return {accessToken};


}


export const authService = {
   loginUserIntoDB,
}