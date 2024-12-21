import validateUser from "../utils/validation.js";


const dataFilterAndValidation=(tableName,data)=>{
        if(tableName=="User"){
                const invalidData=[];
                const validData=[];
                data.forEach(element => {
                     const validationResult=validateUser(element);
                     if(validationResult){
                        element["errorDetails"]=validationResult;
                        invalidData.push(element);
                                
                     }
                     else{
                        validData.push(element);
                     }
                     
                });
                return {
                        validArray:validData,
                        invalidArray:invalidData
                }
        }

        // if(tableName === "User"){
        //         const validationResult=validateUser(data);
        //         if(validationResult)
        //         {
        //                 console.log("ERROR IS : ",validationResult);
        //                 return validationResult;
        //         }
        //         return null;
        // }
}
export default dataFilterAndValidation;