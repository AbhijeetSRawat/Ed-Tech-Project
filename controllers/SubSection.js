const SubSection= require("../models/SubSection");
const Section= require("../models/Section");
const {uploadImageToCloudinary} = require("../utils/imageUploader");
require("dotenv").config();

//to create a subsection
exports.createSubSection = async(req,res)=>{
    try{
        //fetch data from body
        const{sectionId,title,timeDuration,description}= req.body;

        //fetch video from the file
        const{video}=req.files.videoFile;

        //validate the data
        if(!sectionId || !title || !timeDuration || !description || !video){
            return res.status(400).json({
                success:false,
                messagee:"All fields are mandatory "
            })
        }

        //upload the video file to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video,process.env.FOLDER_NAME);

        //create a subsection
        const subSectionDetails=await SubSection.create({
            title:title,
            timeDuration:timeDuration,
            description:description,
            videoUrl:uploadDetails.secure_url,
        });

        //add subsection to the section
        const updatedSection = await Section.findByIdAndUpdate({_id:sectionId},
                                                                {
                                                                    $push:{
                                                                        SubSection:subSectionDetails._id,
                                                                    }
                                                                },
                                                                {new:true}
        );

        return res.status(200).json({
            success:true,
            message:"SubSection created successfully!",
            updatedSection,
        })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error while creating a subsection",
            error:message.error
        })
    }
}

//BOTH THE BELOW TASKS ARE A BIT TRICKY AS WE DO NOT KNW WHIC PART OR WHICH DETAIL TO BE UPDATED AS IF
//IT IS A VIDEO THEN WE NEED TO ALSO CHANGE IT TO THE CLOUDINARY

//to update a sub-section
exports.updateSubSection = async (req,res)=>{
    try{
        const{sectionId,title,timeDuration,description}= req.body;

    }
    catch(error){

    }
}

//delete the sub section 