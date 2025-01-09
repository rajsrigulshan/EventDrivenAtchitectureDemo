import cookieToken from "../utils/cookieToken.js";
import dataFilterAndValidation from "../helper/dataValidation.js";
import appConst from "../constants/applicationConstants.js";
import saveUser from "../database/userDatabase.js";
import startListner from "../batchProcessing/writerBatch.js";
import dataRepo from "../batchProcessing/dataRepo.js";
import reader from "../batchProcessing/readerBatch.js";


// user signup
export const signup = async (req, res) => {

    try {
        const { tableName, data } = req.body;
    //     // Handle error gracefully ------   tomorrow starting point.

    //     // ------------initiating batch processing-------

    //     const batchSize = appConst.BATCH_SIZE || 4;
    //     const chunkSize = data.length / batchSize;
    //     const noOfBatches = (chunkSize) > Math.floor(chunkSize) ? Math.ceil(chunkSize) : Math.floor(chunkSize);
    //     dataRepo.totalNoOfBatches = noOfBatches;

        await reader(tableName, data);
        // await startListner();
       
          


        res.status(200).send({ message: "Data processing completed successfully." });
    } catch (error) {
        console.error("Error in signup:", error);
        res.status(500).send({ message: "Internal server error.", details: error.message });
    }

    // const { tableName, data } = req.body;

    // const { validArray, invalidArray } = dataFilterAndValidation(tableName, data);

    // invalidArray.forEach(item => {
    //     //    ----------re-trigger mechanism------------
    //     console.log(JSON.stringify(item, null, 2));
    // });


    // try {
    //     if (validArray.length > 0) {
    //         const batchSize = appConst.BATCH_SIZE||4;

    //         //default value of batch.
    //         const loopCondition = Math.floor(validArray.length / batchSize);
    //         for (let i = 0; i <= loopCondition; i++) {
    //             let batch = [];
    //             if (i == loopCondition) {

    //                 batch = validArray.slice(i * batchSize, validArray.length);
    //                 let user=await saveUser(batch);
    //             }
    //             else {
    //                 batch = validArray.slice(i * batchSize, (i * batchSize + batchSize));
    //                 let user=await saveUser(batch);
    //             }
    //         }
    //     }

    //     //send user a token 
    //     // cookieToken(user,res)
    //     res.status(200).json({
    //         success: true,
    //         message: "users created successfully"
    //         // user
    //     })
    // } catch (error) {
    //     console.log(error);
    //     res.status(400).json({
    //         success: false,
    //         messege: "Invalid data"
    //     });
    // }
}