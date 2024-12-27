import { faker } from "@faker-js/faker"
import { response } from "express";
import fs from "fs"


export const generateTestData=(req,res)=>{
        console.log("Generating Test Data....")
        console.log("TIME: "+Date.now())
        const jsonArray=[];
        for(let i=0;i<100000;i++){
            const jsonObj={
                name:faker.person.fullName(),
                email:faker.internet.email(),
                address:faker.location.streetAddress(),
                contact:faker.phone.number()
            };
            jsonArray.push(jsonObj);
        }
        console.log("TIME: "+Date.now())
        console.log(jsonArray.length);
        console.log("Test Data Generation Completed")
        const jsonPostData={
            tableName:"user",
            data:jsonArray
        }
        const jsonString= JSON.stringify(jsonPostData,null,2);
        try {
            fs.writeFile('testOutput.json',jsonString,(err)=>{
                if(err){
                    throw new Error('Error while wrting file...');
                }
                else{
                    console.log("File has been written successfully...");
                }
            })
        } catch (error) {
            console.log("ERROR: ",error);
        }
        //const response=new Response();
        res.status(200).json({
            Success:true,
            

        });
}