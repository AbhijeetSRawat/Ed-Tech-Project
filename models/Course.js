const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseName:{
        type:String,
        required:true,
        trim:true,
    },
    courseDescription:{
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
    instructions:{
        type:[String],
    },
    status: {
		type: String,
		enum: ["Draft", "Published"],
	},
    tag:{
        type: [String],
        required: true,
    },
    category: {
		type: mongoose.Schema.Types.ObjectId,
		// required: true,
		ref: "Category",
	},
    studentEnrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }]

});

module.exports = mongoose.model("Courses",courseSchema);