import validateUser from "../utils/validation.js";


const dataValidation=(tableName,data)=>{
        if(tableName === "User"){
                const validationResult=validateUser(data);
                if(validationResult)
                {
                        console.log("ERROR IS : ",validationResult);
                        return validationResult;
                }
                return null;
        }
}
export default dataValidation;