const Course=require("../models/Course");
const Category=require("../models/Category");
const User=require("../models/User");
const {uploadImageToCloudinary} = require("../utils/imageUploader");
const { populate } = require("dotenv");
require("dotenv").config();

exports.createCourse = async(req,res)=>{
    try{
        //fetch data from the body and files
        const {courseName, courseDescription, whatYouWillLearn, price, category} = req.body;

        const thumbnail=req.files.thumbnailImage;
        
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !thumbnail){
            return res.status(400).json({
                success:false,
                message:"All fields are mandatory",
            })
        }

        //doubt h yha ki ids user and tag ki fetch krni bhi h ya nhi
        const userId = req.user.id;
        const instructorDetails=await User.findById(userId);
        console.log("Instructor Details : ",instructorDetails);

        if(!instructorDetails){
            res.status(404).json({
                success:false,
                message:"Instructor details not found",
            })
        }

        const categoryDetails = await Category.findById(category);
        if(!categoryDetails){
            res.status(404).json({
                success:false,
                message:"Category details not found",
            })
        }

        //upload image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);

        //add new course to db
        const newCourse=await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn:whatYouWillLearn,
            price,
            category:categoryDetails._id,
            thumbnail:thumbnailImage.secure_url,
        });

        // add new course to the instructor
        await User.findByIdAndUpdate(
            {_id:instructorDetails._id},
            {
                $push:{
                    courses:newCourse._id,
                }
            },
            {new:true},
        )
        
        //add new couse to the category
        await Category.findByIdAndUpdate(
            {_id:categoryDetails._id},
            {
                $push:{
                    courses:newCourse._id,
                }
            },
            {new:true},
        )

        res.status(200).json({
            success:true,
            messgae:"Course created successfully!",
            data:newCourse,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to create course!",
            error:error.message,
        });
    }
}

exports.getCourseDetails=async(req,res)=>{
    try{
        //fetch course id from body
        const{courseId}=req.body;

        //fetch course details from database
        const courseDetails= await Course.find(
                                                {_id:courseId})
                                                .populate(
                                                    {
                                                        path:"instructor",
                                                        populate:{
                                                            path:"additionalDetails",
                                                        },
                                                    }
                                                )
                                                .populate("category")
                                                .populate("ratingAndReview")
                                                .populate(
                                                    {
                                                        path:"courseContent",
                                                        populate:{
                                                            path:"subSection",
                                                        },
                                                    }
                                                ).exec();
        //vaidation over the fetched details of course
        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:`Could not find the course with course ID ${courseId}`
            })
        }
        //return response
        return res.status(200).json({
            success:true,
            message:'course details fetched successfully',
            data:courseDetails
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

exports.getAllCourses = async (req, res) => {
	try {
		const allCourses = await Course.find(
			{},
			{
				courseName: true,
				price: true,
				thumbnail: true,
				instructor: true,
				ratingAndReviews: true,
				studentsEnroled: true,
			}
		)
			.populate("instructor")
			.exec();
		return res.status(200).json({
			success: true,
			data: allCourses,
		});
	} catch (error) {
		console.log(error);
		return res.status(404).json({
			success: false,
			message: `Can't Fetch Course Data`,
			error: error.message,
		});
	}
};