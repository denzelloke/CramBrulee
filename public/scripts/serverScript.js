//SERVER SCRIPT

//database collection to connect to node.js

const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/CramBrulee")
.then(()=>{
    console.log("mongoDB connected")
})
.catch((e)=>{
    console.log("failed to connect")
})

const LogInSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const LogInCollection=new mongoose.model("LogInCollection",LogInSchema)

module.exports=LogInCollection
