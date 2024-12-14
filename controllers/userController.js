// bring in the prisma and cookie
import prisma from "../prisma/index.js";
import cookieToken from "../utils/cookieToken.js";


// user signup

export const signup= async(req,res,next)=>{
        try {
            const {name,email}=req.body
            console.log()
            if(!name||!email){
                throw new Error('please provide all details');
            }
            const user=await prisma.User.create({
                data:{
                    name:name,
                    email:email
                }
            });
            //send user a token 
            // cookieToken(user,res)
            res.status(200).json({
                success:true,
                user
            })
        } catch (error) {
            throw new Error(error);
        }
}