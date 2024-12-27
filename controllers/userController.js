import cookieToken from "../utils/cookieToken.js";
import dataFilterAndValidation from "../helper/dataValidation.js";
import appConst from "../constants/applicationConstants.js";
import saveUser from "../database/userDatabase.js";

// user signup
export const signup =  async(req, res) => {


    const { tableName, data } = req.body;
    // Handle error gracefully ------   tomorrow starting point.
    const { validArray, invalidArray } = dataFilterAndValidation(tableName, data);

    invalidArray.forEach(item => {
        //    ----------re-trigger mechanism------------
        console.log(JSON.stringify(item, null, 2));
    });


    try {
        if (validArray.length > 0) {
            const batchSize = appConst.BATCH_SIZE;

            //default value of batch.
            if(batchSize == null || batchSize <1000){
                batchSize=1000;
            }

            const loopCondition = Math.floor(validArray.length / batchSize);
            for (let i = 0; i <= loopCondition; i++) {
                let batch = [];
                if (i == loopCondition) {

                    batch = validArray.slice(i * batchSize, validArray.length);
                    let user=await saveUser(batch);
                }
                else {
                    batch = validArray.slice(i * batchSize, (i * batchSize + batchSize));
                    let user=await saveUser(batch);
                }
            }
        }

        //send user a token 
        // cookieToken(user,res)
        res.status(200).json({
            success: true,
            message: "users created successfully"
            // user
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            messege: "Invalid data"
        });
    }
}