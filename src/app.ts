import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from "cookie-parser";
import fileUpload from 'express-fileupload';
import { Request,Response,Application } from 'express';
// import {errorMiddleware} from "./middleware/errorMiddleware"


import message from "./router/router";
import user from "./router/router";

dotenv.config();

const app:Application = express();
const port  = process.env.PORT;
//CONNECTING FRONTEND
// app.use(cors({
//     origin:["process.env.FRONTEND_URL","process.env.DASHBOARD_URL"],
//     methods:['GET','POST','PUT','DELETE'],
//     credentials:true
// }));

app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
// app.use(errorMiddleware);

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/temp/"
}))


app.use('/api/messages',message);
app.use('/api/users',user);

app.get('/api/test',(req:Request,res:Response)=>{
    res.send("Everything is working");
});

app.listen(port,()=>{
    console.log(`Server connected to port ${port}`);
});