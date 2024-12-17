// bring in the prisma and cookie
import prisma from "../prisma/index.js";
import cookieToken from "../utils/cookieToken.js";


// user signup

export const signup= async(req,res,next)=>{
        try {
            // const {name,email}=req.body
            const {tableName,data}=req.body;
            // console.log("Table Name: ",tableName);
            // console.log("Data: ",data);
            // if(!name||!email){
            //     throw new Error('please provide all details');
            // }
            // const user=await prisma.User.create({
            //     data:{
            //         name:name,
            //         email:email
            //     }
            // });
            //send user a token 
            // cookieToken(user,res)
           
            const user=await prisma.user.createMany({
                data:data,
                skipDuplicates:true
                
            });
            res.status(200).json({
                success:true,
                message:"users created successfully"
                // user
            })
        } catch (error) {
            throw new Error(error);
        }
}