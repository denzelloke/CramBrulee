//SERVER SCRIPT

//database collection to connect to node.js

require('dotenv').config();

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

const EventSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LogInCollection',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    start: {
        type: String,
        required: true
    },
    end: {
        type: String
    }
    
});

const LogInCollection = new mongoose.model("LogInCollection", LogInSchema);
const EventsCollection = new mongoose.model("EventsCollection", EventSchema);

module.exports = { LogInCollection, EventsCollection };
