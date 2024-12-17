import rateLimit from "express-rate-limit";
import appConst from "../constants/applicationConstants.js";

const globalRateLimit=rateLimit({
    windowMs:appConst.GLOBAL_WINDOW_MS,
    limit:appConst.GLOBAL_RATE_LIMIT,
    message:{
        success:"false",
        message:"Too many request, please try again later."
    },
    standardHeaders:true,
    legacyHeaders:false
});

export default globalRateLimit;
