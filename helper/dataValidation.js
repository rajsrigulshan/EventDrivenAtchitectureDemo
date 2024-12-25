import validateUser from "../utils/validation.js";


const dataFilterAndValidation=(tableName,data)=>{
        console.log("filter data called...")
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
        console.log("NO TABLES MATCHED....")
        return {
                validArray:[],
                invalidArray:[]  
        };

        // if(tableName === "User"){
        //         const validationResult=validateUser(data);
        //         if(validationResult)
        //         {
        //                 console.log("ERROR IS : ",validationResult);
        //                 return validationResult;
        //         }
        //         return null;
        // }
};
export default dataFilterAndValidation;