const mongoose = require("mongoose");

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
    accountType:{
        type:String,
        enum:["Admin","Student","Instructor"],
        required:true,
    },
    active: {
        type: Boolean,
        default: true,
    },
    approved: {
        type: Boolean,
        default: true,
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
        ref:"CourseProgress",
    }],
    token:{
        type:String,
    },
    resetPasswordExpires:{
        type:Date,
    },

});

module.exports = mongoose.model("User",userSchema);