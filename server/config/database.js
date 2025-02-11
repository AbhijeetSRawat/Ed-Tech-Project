const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = ()=>{
    mongoose.connect(process.env.DB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }).then(()=>{
        console.log("DB connected Successfully");
    }).catch((error)=>{
        console.log("Error while connecting to DB ", error.message);
        process.exit(1);
    })
}