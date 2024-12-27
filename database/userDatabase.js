import prisma from "../prisma/index.js";

const saveUser=async(userData)=>{
    try {
        const user=await prisma.user.createMany({
            data:userData,
            skipDuplicates:true
            
        });
    } catch (error) {
        console.log(error);
    }
}

export default saveUser;