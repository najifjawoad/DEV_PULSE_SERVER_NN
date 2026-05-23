import { type NextFunction, type Request, type Response } from "express";
import jwt, { type JwtPayload } from 'jsonwebtoken'
import config from "../config";
import { pool } from "../db";
const auth = (...roles: any) =>{
    console.log(roles);
    return async (req:Request,res:Response,next:NextFunction)=>{
   
try {
            const token = req.headers.authorization;
        if(!token){
              res.status(401).json({
      success: false,
      message: "Missing, expired, or invalid JWT token",
        
      
    });
        }

   const decoded = jwt.verify(token as string,config.secret as string) as JwtPayload
   
   const userData = await pool.query(`
     SELECT * FROM users WHERE email=$1
    `,[decoded.email])

    const user = userData.rows[0]
    
    if(userData.rows.length === 0){
           res.status(404).json({
      success: false,
      message: "Requested resource does not exist",
        
      
    });
    }


req.user = decoded

    next();
} catch (error) {
    next(error)
}
};
};
export default auth

