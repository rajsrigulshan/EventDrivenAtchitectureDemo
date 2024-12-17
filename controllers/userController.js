// bring in the prisma and cookie
import prisma from "../prisma/index.js";
import cookieToken from "../utils/cookieToken.js";


// user signup

export const signup= async(req,res,next)=>{
        try {
            const {tableName,data}=req.body;
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