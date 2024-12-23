//Last Updated : 14-DEC-2024 
import {ExecuteQuery}  from "../db/dbServices.js";

let mSP = "SEC_UserSecuritySP";

class  User{
    constructor(UserID, UserName, Password, IsActive, BranchCode){
      this.UserID = UserID;
      this.UserName = UserName;
      this.Password = Password;
      this.IsActive = IsActive;
    };


    static async fetchAll() {
      try {
            let mQuery= mSP;//"SEC_UserSecuritySP";
            let mParams = "@nsType = 8" ; 
            
            //return await ExecuteQuery(mQuery,mParams);

            return await ExecuteQuery(mQuery,mParams);

            console.log("status:", status, "result", result);

            //return Promise.resolve("Hello");
      } catch (err) {
          return err
      }
    };

    static async findById(Id) {
      try {
            //let mSQL = "GEN_CitySP";
            //let mParams =  "@nsType = 2, @CityCode = '" + Id + "'" ; 
            let mQuery = mSP;
            let mParams =  "@nsType = 4, @UserID = '" + Id + "'" ; 
            
            return await ExecuteQuery(mQuery,mParams);
            //return Promise.resolve("Hello");
      } catch (err) {
          return err
      }
    };

    static async findOne(record,obj) {
      try {
            
            console.log(record);
            console.log(obj);

            let mQuery = mSP;
            let mParams =  "@nsType = 4, @UserID = '" + record.UserID + "'" ; 
      
            return await ExecuteQuery(mQuery,mParams);

            //return Promise.resolve("Hello");
      } catch (err) {
          return err
      }
    };

    static async save(record) {
      try {
          
            console.log(record);

            let mQuery = mSP;
            let mParams = " @nType = 1, @nsType = 0"; 
            mParams += ", @UserID = '" + record.UserID + "'" ; 
            mParams += ", @UserName = '" + record.UserName + "'" ; 
            mParams += ", @Password = '" + record.Password + "'" ; 
            mParams += ", @IsActive = '" + record.IsActive + "'" ; 
            mParams += ", @BranchCode = '" + record.BranchCode + "'" ;
            mParams += ", @DefinitionDate = '" + record.DefinitionDate + "'" ;  
            

            console.log( mQuery + " " + mParams );

            // let mReturnVal = mSQL + " @nType=1, @nsType=" + nsType
            // + ", @BranchCode=" + "'001'"
            // + ", @UserID=" + txtRoleID.Text.Trim()
            // + ", @UserName='" + txtRole.Text.Trim().Replace("'", "") 
            // + "', @DefinitionDate='" + DateTime.Parse(DateTime.Now.ToString()).ToString(clsGeneralSetting.mDateFormatMMDD)
            // + "', @Remarks='" + txtRemarks.Text.Trim()
            // + "', @Password='" + txtPassword.Text.Trim()
            // + "', @ManagerID='" + Interaction.IIf(txtManagerID.Text.Trim() == "", txtRoleID.Text.Trim(), txtManagerID.Text.Trim())
            // + "', @IsActive=" + chkIsActive.Checked
            // + "";

            //return await ExecuteQuery(mQuery,mParams);
            return await ExecuteQuery(mQuery,mParams);
            

      } catch (err) {
          return err
      }
    };

    static async delete(record) {
      try {
          
            console.log(record);

            let mQuery = mSP;
            let mParams = " @nType = 2, @nsType = 0"; 
            mParams += ", @UserID = '" + record.UserID + "'" ; 

            console.log( mQuery + " " + mParams );
            
            return await ExecuteQuery(mQuery,mParams);

      } catch (err) {
          return err
      }
    };

  };
  
  export  {User};