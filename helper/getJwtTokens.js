import jsonwebtoken from 'jsonwebtoken';

const getJwtToken=(userId)=>{
    console.log("userID: "+userId)
    // return jwt.sign({userId:userId},process.env.JWT_SECRET,{expiresIn: '1 day'});
    return jsonwebtoken.sign({userId:userId},process.env.JWT_SECRET,{expiresIn:'1 day'});
};

export default getJwtToken;