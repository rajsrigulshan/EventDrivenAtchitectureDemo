import Joi from "joi";

const validateUser=(data)=>{
    const schema=Joi.object({
        name:Joi.string().required(),
        email:Joi.string().email(),
        address:Joi.string(),
        contact:Joi.string()
        
    })

const {error}=schema.validate(data);
if(error){
    return error.details;
}

return null

};

export default validateUser;