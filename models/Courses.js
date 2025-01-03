const mongoose = require(mongoose);

const courseSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    desc:{
        type:String,
        required:true,
        trim:true,
    },
    whatWillYouLearn:{
        type:String,
        required:true,
        trim:true,
    },
    courseContent:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Section",
    }],
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    ratingAndReview:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"RatingAndReview",
    }],
    price:{
        type:Number,
        required:true,
    },
    thumbnail:{
        type:String,
        required:true,
    },
    tags:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tag",
    }],
    studentEnrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }]

});

module.exports = mongoose.model("Courses",courseSchema);