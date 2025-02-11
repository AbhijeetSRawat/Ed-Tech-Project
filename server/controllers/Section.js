const Section = require("../models/Section");
const Course = require("../models/Course");

//to create a section
exports.createSection = async(req,res)=>{
    try{
        //fetch details from request
        const {sectionName,courseId}=req.body;

        //validate
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"Missing Properties"
            })
        }

        //create section
        const newSection = await Section.create({sectionName});

        //push it into the course
        //in the below code there is populate to be added
        const updatedCourseDetails = await Course.findByIdAndUpdate(
                                                                    courseId,
                                                                    {
                                                                        $push:{
                                                                            courseContent:newSection._id,
                                                                        }
                                                                    },
                                                                    {new:true}
                                                                );
                                                            
        return res.status(200).json({
            success:true,
            message:"Section created successfully",
            updatedCourseDetails,
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to create a section",
            error:error.message,
        })
    }
}


//to update a section
exports.updateSection = async(req,res)=>{
    try{
        //fetch data from body
        const {sectionName,sectionId}=req.body;
    
        //validate
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success:false,
                message:"Missing Properties",
            })
        }

        //update
        const section = await Section.findByIdAndUpdate(sectionId,
                                                        {sectionName},
                                                        {new:true}
        );
        

        return res.status(200).json({
            success:true,
            message:"Section updated successfully",
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to update the section"
        })
    }
}

// to delete the section
exports.deleteSection = async (req,res)=>{
    try{
        //get data from the body
        const {sectionId}=req.body;
        const {courseId}=req.body; // this may be incorrect need to be corrected

        //remove the section from the course
        const updatedCourseDetails=await Course.findByIdAndUpdate(
                                                                    courseId,
                                                                    {
                                                                        $pull:{
                                                                            courseContent:sectionId,
                                                                        },
                                                                    },
                                                                    {new:true}
        );
        
        console.log(updatedCourseDetails)
        //delete the section
        await Section.findByIdAndDelete(sectionId);

        return res.status(200).json({
            success:true,
            message:"Section deleted successfully",
        })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to delete the section",
            error:error.message,
        });
    }
}