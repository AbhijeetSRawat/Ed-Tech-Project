const mongoose = require(mongoose);

const tagSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    description:{
        type:String,
        trim:true,
    },
    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Courses",
    }]

});

module.exports = mongoose.model("Tag",tagSchema);