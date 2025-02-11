const RatingAndReview= require ("../models/RatingAndReview");
const Course = require("../models/Course");

exports.createRating = async(req,res)=>{
    try{
        //get user id
        const userId=req.user.id;
        
        //get data from the req body
        const {rating,review,courseId}=req.body;

        //check if user is enrolled in the course or not
        const courseDetails=await Course.findOne(
                                                {_id:courseId,
                                                    studentsEnrolled:{$elemMatch:{$eq : userId}},
                                                }
        );

        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"Student is not enrolled in the course"
            });
        }

        //check if user has already reviewed or not
        const alreadyReviewed = await RatingAndReview.findOne({
                                                                user:userId,
                                                                course:courseId,
                                                             });

        if(alreadyReviewed){
            return res.status(403).json({
                success:false,
                message:"Course is already reviewed by the user"
            })
        }
        
        //create a rating and review
        const ratingReview=await RatingAndReview.create({
            rating,review,
            course:courseId,
            user:userId,
        });

        //update course with that rating and review
        const updatedCourseDetails = await Course.findByIdAndUpdate({_id:courseId},
                                                                    {
                                                                        $push:{
                                                                            ratingAndReview:ratingReview._id,
                                                                        }
                                                                    },
                                                                    {new:true}
        );

        //return response
        return res.status(200).json({
            success:true,
            message:"Rating and Review created successfully!",
            ratingReview,
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.getAverageRating= async(req,res)=>{
    try{
        //get course id
        const courseId = req.body.courseId;

        //calculate avg rating
        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course:new mongoose.Types.ObjectId(courseId),
                }
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg:"rating"},
                }
            }
        ])

        //retrun rating
        if(result.length > 0){
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating,
            })
        }

        //if no rating exist
        return res.status(200).json({
            success:true,
            message:'Average Rating is 0, No rating given till now',
            averageRating:0,
        })
    }catch(error){
        return req.status(500).json({
            success:false,
            message:error.message
        });
    }
}

exports.getAllRating = async(req,res)=>{
    try{
        const allReviews = await RatingAndReview.find({})
                                    .sort({rating : "desc"})
                                    .populate({
                                        path:"user",
                                        select:"firstName lastName email image",
                                    })
                                    .populate({
                                        path:"Course",
                                        select:"courseName",
                                    })
                                    .exec();

        return res.status(200).json({
            success:true,
            message:"All reviews fetched successfully !!",
            data:allReviews,
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}