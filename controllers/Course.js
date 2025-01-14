const Course=require("../models/Course");
const Tag=require("../models/Tag");
const User=require("../models/User");
const {uploadImageToCloudianry} = require("../utils/imageUploader");
require("dotenv").config();

exports.createCourse = async(req,res)=>{
    try{
        //fetch data from the body and files
        const {courseName, courseDescription, whatYouWillLearn, price, tag} = req.body;

        const thumbnail=req.files.thumbnailImage;

        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !thumbnail){
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

        const tagDetails = await Tag.findById(tag);
        if(!tagDetails){
            res.status(404).json({
                success:false,
                message:"Tag details not found",
            })
        }

        //upload image to cloudinary
        const thumbnailImage = await uploadImageToCloudianry(thumbnail,process.env.FOLDER_NAME);

        //add new course to db
        const newCourse=await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn:whatYouWillLearn,
            price,
            tag:tagDetails._id,
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
        
        //add new couse to the tag
        await Tag.findByIdAndUpdate(
            {_id:tagDetails._id},
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
