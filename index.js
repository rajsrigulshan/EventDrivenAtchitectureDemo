import express from 'express';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import userRouter from './routes/userRoutes.js';
import generateDataRouter from './routes/testRoutes.js';

const app =express();

//regular middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//cookie middleware
app.use(cookieParser())
app.use('/api',userRouter);
app.use('/api',generateDataRouter)

app.get('/',(req,res)=>{
    res.send("EDA Testing.....");
});

app.listen(3000,()=>{
    console.log('server is running on 3000 port');
});


 console.log("DATABASE_URL: "+process.env.DATABASE_URL);