import express from 'express';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import userRouter from './routes/userRoutes.js';
import generateDataRouter from './routes/testRoutes.js';
import appConst from './constants/applicationConstants.js';
import globalRateLimit from './middleware/globalRateLimiter.js';
import prisma from './prisma/index.js';
const app =express();
app.use(globalRateLimit);

//regular middleware

app.use(express.json({limit:appConst.EXPRESS_MAX_SIZE_JSON}));
app.use(express.urlencoded({extended:true}));

//cookie middleware
app.use(cookieParser())
app.use('/api',userRouter);
app.use('/api',generateDataRouter)

app.get('/',(req,res)=>{
    res.send("EDA Testing.....");
});


// ----------------Testing API--------------------
app.get('/api/test',async (req,res)=>{
    try {
        const users = await prisma.user.findMany(); 
        console.log(users);
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send("Error while fetching the users.")
    }
}


)

app.listen(3000,()=>{
    console.log('server is running on 3000 port');
});

 console.log("DATABASE_URL: "+process.env.DATABASE_URL);

