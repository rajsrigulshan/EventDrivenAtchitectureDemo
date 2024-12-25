import { PrismaClient } from "@prisma/client";
import 'dotenv/config'


let prisma;
if(process.env.SHOW_SQL==="true"){
  console.log("env value ",process.env.SHOW_SQL)
     prisma = new PrismaClient({
        log: [
          {
            emit: 'event',
            level: 'query',
          }
        ]
      })
      
      prisma.$on('query', (e) => {
        console.log('Query : ' + e.query)
        console.log('Params: ' + e.params)
        console.log('Duration: ' + e.duration + 'ms')
      })
}
else{
     prisma=new PrismaClient();
}
export default prisma;
// module.exports=prisma;