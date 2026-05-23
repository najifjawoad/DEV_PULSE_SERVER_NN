import express, { type Application, type Request, type Response } from "express"

import { initDB } from "./db";
import { userRoute } from "./modules/user/user.route";
import { issueRoute } from "./modules/issues/issue.route";
import { authRoute } from "./modules/auth/auth.route";
import logger from "./middleware/logger";
import cors from "cors"
import globalErrorHandler from "./middleware/globalErrorHandler";

const app : Application = express();





app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended: true}));

app.use(logger);



app.use(cors({
  origin: 'http://localhost:3000',
  
}));



app.get('/', (req : Request, res: Response) => {
  res.status(200).json({
    message: "express server",
    "author" : "Next level"
  })
})

app.use('/api/auth/signup',userRoute)

app.use('/api/issues',issueRoute)
app.use("/api/auth/login",authRoute);


// Global Error Handling Middleware
app.use(globalErrorHandler);



export default app