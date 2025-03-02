const mongoose=require('mongoose')

require("dotenv").config()

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log("Mongodb Connected ......")
    }catch(error){
        console.log("Mongodb not Connected ......")
        process.exit(1)
    }
}

module.exports=connectDB;
