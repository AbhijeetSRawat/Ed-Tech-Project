const mongoose = require(mongoose);

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    accoutType:{
        type:String,
        enum:["Admin","Student","Instructor"],
        required:true,
    },
    addtionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Profile",
    },
    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Courses",
    }],
    image:{
        type:String,
        required:true, 
    },
    courseProgress:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"courseProgress",
    }]

});

module.exports = mongoose.model("User",userSchema);