import fs from 'fs'
import type { NextFunction, Request, Response } from "express";

const logger = (req :Request, res:Response, next:NextFunction) => {

  const log = `Method ->${req.method} Time -> ${Date.now()} URL-> ${req.url}`;
 fs.appendFile('logger.txt',log,(err)=>{
  
 })
  next();


}
export default logger