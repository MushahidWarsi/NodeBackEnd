//Last Updated : 14-DEC-2024 

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";

import { poolPromise } from "../db/connectDB.js";

import {User} from "../models/user.model.js"
import { request } from "express";

//Done
const getAllRecords = asyncHandler(async(req, res) => {

    const result = await User.fetchAll();

    //Error in SQL/Query side
    if (!result?.recordset) {
        throw new ApiError(500, "Something is wrong with DB Query while fetching the record(s).!")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, result?.recordset, "API responds successfully.")) //It is Ok    

});


//Done
const getRecordById = asyncHandler(async(req, res) => {
  
        //const Id = req.params.id; //const {Id} = req.params;

        const {Id} = req.params

        if (!Id?.trim()) {
            throw new ApiError(400, "Id is missing")
        } 

        const result = await User.findById(Id);

        //Error in SQL/Query side
        if (!result?.recordset) {
            throw new ApiError(500, "Something is wrong with DB Query while fetching the record!")
        }

        if (result?.recordset.length === 0)   {
            return res
            .status(200)
            .json(new ApiResponse(200, {result:"No Record Found." }, "API responds successfully.")) 
        }


        //console.log("Record(s) Found: ",result.rowsAffected);
        return res
        .status(200)
        .json(new ApiResponse(200, result?.recordset, "API responds successfully.")) //It is Ok   

        // if ( result.rowsAffected > 0 )  {
        //     //console.log("Record Found: " + RecordFound  ,result.rowsAffected);
        //     return res
        //     .status(200)
        //     .json(new ApiResponse(200, (result.recordset), "API responds successfully.")) //It is Ok    
        // }
        // else
        // {
        //     //console.log("Record Not Found: ",result.rowsAffected);
        //     return res
        //     .status(200)
        //     .json(new ApiResponse(200, {"RowsAffected": "Record Not Found"}, "API responds successfully.")) //It is Ok    
        // }

});


//WIP
const getRecordOne = asyncHandler(async(req, res) => {
  
    const {UserID, UserName} = req.body
    //console.log(email);

    if (!UserID) {
        throw new ApiError(400, "Invalid credentials.!")
    }

    //const result = await User.findById(Id);
    const result = await User.findOne({UserID}, {});
    
    //Error in SQL/Query side
    if (!result?.recordset) {
        throw new ApiError(500, "Something is wrong with DB Query while fetching the record!")
    }

    //console.log("Record(s) Found: ",result.rowsAffected);
    return res
    .status(200)
    .json(new ApiResponse(200, result?.recordset, "API responds successfully.")) //It is Ok   

});



//Done
const saveRecord = asyncHandler(async(req, res) => {
  
    // const {UserID, UserName, Password} = req.body
    // //console.log(email);

    // if (!UserID || !UserName || !Password) {
    //     throw new ApiError(400, "UserID or UserName or Password is required")
    // }

    // // if (!Id?.trim()) {
    // //     throw new ApiError(400, "Id is missing")
    // // } 

    // //const result = await User.findById(Id);

    //const RecordToUpdate = { ...req.body }
    //console.log(RecordToUpdate);
    //const saveRecord = await User.save(RecordToUpdate);

        const { UserID, UserName, Password, IsActive, BranchCode } = req.body;
        
        ////Validation
        // if (
        //     [UserID, UserName, Password, BranchCode].some((field) => field?.trim() === "")
        // ) {
        //     throw new ApiError(400, "All fields are required")
        // }
        // //
        
        console.log(req.body); //{validateData: true},

        const saveRecord = await User.save({
            UserID,
            UserName,
            Password, 
            IsActive: IsActive || true,
            BranchCode: "001" || "",
            DefinitionDate: new Date().toLocaleDateString('en-US') //Date.now() //"01 DEC 2024" // = new Date() //date.toLocaleDateString('en-US')
            //DefinitionDate: Date.now().toLocaleDateString('en-US') //Date.now() //"01 DEC 2024" // = new Date() //date.toLocaleDateString('en-US')
            //new Date(year, month, date, hours, minutes, seconds, ms)
            //new Date(2011, 0, 1, 0, 0, 0, 0); // 1 Jan 2011, 00:00:00
            /*
            // // America/Los_Angeles for the US
            // // US English uses month-day-year order
            // console.log(date.toLocaleDateString('en-US'));
            // // → "12/19/2012"

            // // British English uses day-month-year order
            // console.log(date.toLocaleDateString('en-GB'));
            // // → "20/12/2012"
            */
        });
        

        console.log(saveRecord);
        
        //Error in SQL/Query side
        if (!saveRecord) {
            throw new ApiError(500, "Something went wrong while saving the record")
        }
        
        const result = await User.findById(UserID)//.select("-password -refreshToken")

        //Error in SQL/Query side
        if (!result?.recordset) {
            throw new ApiError(500, "Something is wrong with DB Query while fetching the record!")
        }

        return res
        .status(201) //create = 201 , edit = 200
        .json(new ApiResponse(200, result?.recordset, "Record saved successfully."))   


        // return res
        // .status(201)
        // .json(new ApiResponse(200, req.body.json, "Record saved successfully."))

});


//Done
const deleteRecord = asyncHandler(async(req, res) => {

        const { UserID } = req.body;
        
        console.log(req.body);

        ////Validation
        // if (
        //     [UserID, UserName, Password, BranchCode].some((field) => field?.trim() === "")
        // ) {
        //     throw new ApiError(400, "All fields are required")
        // }
        // //

        const deleteRecord = await User.delete({ UserID });

        console.log(deleteRecord);
        
        //Error in SQL/Query side
        if (!deleteRecord) {
            throw new ApiError(500, "Something went wrong while saving the record")
        }
    
        return res
        .status(200) //204
        .json(new ApiResponse(200, req.body.json, "Record deleted successfully."))   

});

//WIP
const getCurrentUser = asyncHandler(async(req, res) => {
    return res
    .status(200)
    .json(new ApiResponse(
        200,
        req.user,
        "User fetched successfully"
    ))
});

//################################
const getAllUsersFromPool = asyncHandler(async(req, res) => {

    if (1 == 2) {
        throw new ApiError(400, "Error in getAllUsers")
    }
    
    const pool = await poolPromise
    const result = await pool.request().query('SELECT UserID, UserName, IsActive FROM SEC_UserSecurityTAB')      

    //res.json(result.recordset)  

    return res
    .status(200)
    .json(new ApiResponse(200, result.recordset, "API responds successfully.")) //It is Ok
});

////DntDelete Following Function, This is working properly
const getAllUsers = asyncHandler(async(req, res) => {

    if (1 == 2) {
        throw new ApiError(400, "Error in getAllUsers")
    }

    //let pool = await mssql.connect(config); //Later This will be in seperate file as DB_Connection
    //let users = await pool.request().query(" SELECT UserID, UserName, IsActive FROM SEC_UserSecurityTAB ");
    //return users//.recordsets;

    return res
    .status(200)
    .json(new ApiResponse(200, req.json, "API responds successfully."))
    //.json(new ApiResponse(200, users, "API responds successfully.")) //It is Ok
    //.json(new ApiResponse(200, users.recordsets, "API responds successfully.")) //It is Ok
});


////DontDelete
// const getCurrentUser = asyncHandler(async(req, res) => {
//     return res
//     .status(200)
//     .json(new ApiResponse(
//         200,
//         req.json,//req.user,
//         "User fetched successfully."
//     ))
// });


export { 
    getAllRecords,
    getRecordById,
    getRecordOne,
    saveRecord,
    deleteRecord,
    getCurrentUser,
    //getAllUsers,
    //getAllUsersFromPool
 };


 /*
 ////DntDelete Following Function, This is working properly
const getAllUsers = asyncHandler(async(req, res) => {

    if (1 == 2) {
        throw new ApiError(400, "Error in getAllUsers")
    }

    let pool = await mssql.connect(config); //Later This will be in seperate file as DB_Connection
    let users = await pool.request().query(" SELECT UserID, UserName, IsActive FROM SEC_UserSecurityTAB ");
    //return users//.recordsets;

    return res
    .status(200)
    //.json(new ApiResponse(200, req.json, "API responds successfully."))
    //.json(new ApiResponse(200, users, "API responds successfully.")) //It is Ok
    .json(new ApiResponse(200, users.recordsets, "API responds successfully.")) //It is Ok
});


////OldCode Dont Delete 
        // const pool = await poolPromise
    // const result = await pool.request()
    // .query('SELECT TOP 1 UserID , IsActive FROM SEC_UserSecurityTAB')      

    // res.json(result.recordset)

    // // let pool = await mssql.connect(config); //Later This will be in seperate file as DB_Connection
    // // let users = await connectDB.query(" SELECT UserID, UserName, IsActive FROM SEC_UserSecurityTAB ");
    // // return users//.recordsets;

    // // return res
    // // .status(200)
    // // .json(new ApiResponse(200, users, "API responds successfully.")) //It is Ok

        // let mSQL= 'SELECT * FROM SEC_UserSecurityTAB';
        // const result = await SQLExecute(mSQL);
    
        // return res
        // .status(200)
        // .json(new ApiResponse(200, result.recordset, "API responds successfully.")) //It is Ok    

        // User.fetchAll().then((result)=>{
        //     return res
        //     .status(200)
        //     .json(new ApiResponse(200, result.recordset, "API responds successfully.")) //It is Ok    
        // });

////Stopped on 07-DEC-2024
// const getAllUsersFromPool2 = asyncHandler(async(req, res) => {
    
//     let mSQL= 'SELECT UserName FROM SEC_UserSecurityTAB';
//     const result = await SQLExecute(mSQL);

//     return res
//     .status(200)
//     .json(new ApiResponse(200, result.recordset, "API responds successfully.")) //It is Ok

//     // const pool = await poolPromise
//     // const result = await pool.request()
//     // .query('SELECT TOP 1 UserID , IsActive FROM SEC_UserSecurityTAB')      

//     // res.json(result.recordset)

//     // // let pool = await mssql.connect(config); //Later This will be in seperate file as DB_Connection
//     // // let users = await connectDB.query(" SELECT UserID, UserName, IsActive FROM SEC_UserSecurityTAB ");
//     // // return users//.recordsets;

//     // // return res
//     // // .status(200)
//     // // .json(new ApiResponse(200, users, "API responds successfully.")) //It is Ok
// });        
 */