//Updated At: 06-DEC-2024 


import 'dotenv/config';  //using ES6 Style ////import dotenv from "dotenv";  //dotenv.config({    path: './.env'}); ////dotenv.config();

import connectDB from "./db/connectDB.js";

import {app} from './app.js'

console.log("Start Connection");


connectDB()
.then(() => { 
    
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("Database Connection FAILED !!! ", err);
});

/*
app.listen(process.env.PORT || 8000, () => {
    console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
});
*/

console.log("End Connection");









