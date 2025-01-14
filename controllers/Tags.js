const Tag=require("../models/Tag");

exports.createTag=async (req,res)=>{
    try{
        //fetch data from the body
        const {name,description}=req.body;

        if(!name || !description){
            return res.status(400).json({
                success:true,
                message:"All fields are mandatory!"
            });
        }
        //create the tag
        const tagDetails= await Tag.create({
                                            name:name,
                                            description:description,
        });

        return res.status(200).json({
            success:true,
            message:"Tag created successfully!"
        });
        
    } 
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}


exports.showAllTags = async (req,res)=>{
    try{
        const allTags=await Tag.find({},{name:true,
                                        description:true});

        res.status(200).json({
            success:true,
            message:"All tags are fetched successfully",
            allTags,
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}