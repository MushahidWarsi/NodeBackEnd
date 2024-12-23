//Last Updated : 24-NOV-2024 

import express from "express";
import cors from "cors";
//import cookieParser from "cookie-parser"; //It will be on later

//Custome Middlewares Funtions 
import { logReqRes } from "./middlewares/txtLog.js";


const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

//Middlewares 
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
//app.use(cookieParser()); //It will be on later

//Custome Middlewares 
app.use(logReqRes("log.txt")); //It will be on later

////Routes Import
import homeRouter from "./routes/home.routes.js"
import userRouter from './routes/user.routes.js'
//import dashboardRouter from "./routes/dashboard.routes.js"


////Routes Declaration
app.use("/api/home", homeRouter)
app.use("/api/users", userRouter)
//app.use("/api/v1/dashboard", dashboardRouter)


//// http://localhost:8000/api/v1/users/register

export { app };