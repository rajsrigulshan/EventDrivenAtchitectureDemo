import dataFilterAndValidation from "../helper/dataValidation.js";
import appConst from "../constants/applicationConstants.js";
import Queue from "queue";
import saveUser from "../database/userDatabase.js";

const reader = (tableName, data) => {
  return new Promise((resolve, reject) => {
    const queue = new Queue({
      autostart: true,
      concurrency: 1,  // Process jobs one at a time in sequence
      results: []
    });

    const batchSize = appConst.BATCH_SIZE || 1000;
    const loopCondition = Math.floor(data.length / batchSize);

    // Create a list of promises to filter batches in parallel
    const filterPromises = [];

    for (let i = 0; i <= loopCondition; i++) {
      let batch = [];
      if (i === loopCondition) {
        batch = data.slice(i * batchSize, data.length);
      } else {
        batch = data.slice(i * batchSize, (i * batchSize + batchSize));
      }

      // Start filtering this batch asynchronously
      const filterPromise = new Promise(async (resolveFilter) => {
        const { validArray, invalidArray } = dataFilterAndValidation(tableName, batch);
        invalidArray.forEach((item) => {
          console.log(JSON.stringify(item, null, 2));
        });

        // If there are valid records, add them to the queue for saving
        if (validArray.length > 0) {
          queue.push(async (next) => {
            try {
              await saveUser(validArray);  // Save the valid batch
              next();  // Mark this job as complete
            } catch (error) {
              console.log("Error while saving batch:", error);
              next(error);  // If there’s an error, pass it to the queue
            }
          });
        }

        resolveFilter(); // Resolve the filtering task after filtering the batch
      });

      filterPromises.push(filterPromise);  // Add the promise to the array
    }

    // Wait for all the filtering to complete (but not for saving)
    Promise.all(filterPromises)
      .then(() => {
        console.log("All batches filtered.");
      })
      .catch((error) => {
        console.log("Error while filtering batches:", error);
        reject(error);
      });

    // Handle queue's 'end' event
    queue.addEventListener('end', (event) => {
      if (event.detail.error) {
        console.error('An error occurred while processing jobs:', event.detail.error);
        reject(event.detail.error);
      } else {
        console.log('All jobs have been processed successfully.');
        resolve();  // Resolve when all jobs are processed
      }
    });
  });
};

export default reader;














































// import dataFilterAndValidation from "../helper/dataValidation.js";
// import appConst from "../constants/applicationConstants.js";
// import Queue from "queue";
// import saveUser from "../database/userDatabase.js";

// const reader = (tableName, data) => {
//   return new Promise((resolve, reject) => {

//     const queue = new Queue({
//       autostart: true,
//       concurrency: 1,
//       results: []
//     });

//     const batchSize = appConst.BATCH_SIZE||1000;
  
//     const loopCondition = Math.floor(data.length / batchSize);
//     for (let i = 0; i <= loopCondition; i++) {
//         let batch = [];
//         if (i == loopCondition) {
//             batch = data.slice(i * batchSize, data.length);
//         }
//         else {
//             batch = data.slice(i * batchSize, (i * batchSize + batchSize));
//         }
//     const { validArray, invalidArray } =  dataFilterAndValidation(tableName, batch);
//     invalidArray.forEach(item => {
//         console.log(JSON.stringify(item, null, 2));
//     });
//     if(validArray.length>0){
//         queue.push( async (next)=>{
//            try {
//             await saveUser(validArray);
//             next();
//            } catch (error) {
//             console.log("Error while saving batch: ",error);
//             next(error);
//            }
//         });
//     }
//     }
//     queue.addEventListener('end', (event) => {
//       if (event.detail.error) {
//         console.error('An error occurred while processing jobs:', event.detail.error);
//         reject(event.detail.error);

//       } else {
//         console.log('All jobs have been processed successfully.');
//         resolve();
//       }
//     });

//   });

// }
// export default reader;