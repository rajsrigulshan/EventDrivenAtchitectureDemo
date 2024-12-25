// bring in the prisma and cookie
import prisma from "../prisma/index.js";
import cookieToken from "../utils/cookieToken.js";
import dataFilterAndValidation from "../helper/dataValidation.js";

// user signup
export const signup= async(req,res)=>{
    const {tableName,data}=req.body;

    // Handle error gracefully ------   tomorrow starting point.
    const {validArray,invalidArray}=dataFilterAndValidation(tableName,data);
    invalidArray.forEach(item => {
        console.log(JSON.stringify(item, null, 2));
      });

        try {
            if(validArray.length>0)
            {
                try {
                    const user=await prisma.user.createMany({
                        data:validArray,
                        skipDuplicates:true
                        
                    });
                } catch (error) {
                    console.log(error);
                }
            }

             //send user a token 
            // cookieToken(user,res)
            res.status(200).json({
                success:true,
                message:"users created successfully"
                // user
            })
        } catch (error) {
            console.log(error);
            res.status(400).json({
                success:false,
                messege:"Invalid data"
            });
        }
}