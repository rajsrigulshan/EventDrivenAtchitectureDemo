// bring in the prisma and cookie
import prisma from "../prisma/index.js";
import cookieToken from "../utils/cookieToken.js";
import dataValidation from "../helper/dataValidation.js";

// user signup

export const signup= async(req,res,next)=>{
    const {tableName,data}=req.body;
    // Handle error gracefully ------   tomorrow starting point.
    const validationRes=dataValidation(tableName,data);
    if(validationRes){
        throw new Error(validationRes);
    }
    
        try {
            const user=await prisma.user.createMany({
                data:data,
                skipDuplicates:true
                
            });

             //send user a token 
            // cookieToken(user,res)
            res.status(200).json({
                success:true,
                message:"users created successfully"
                // user
            })
        } catch (error) {
            throw new Error(error);
        }
}