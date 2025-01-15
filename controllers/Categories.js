const Category=require("../models/Category");

exports.createCategory=async (req,res)=>{
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
        const categoryDetails= await Category.create({
                                            name:name,
                                            description:description,
        });

        return res.status(200).json({
            success:true,
            message:"Category created successfully!"
        });
        
    } 
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}


exports.showAllCategories = async (req,res)=>{
    try{
        const allCategories=await Category.find({},{name:true,
                                        description:true});

        res.status(200).json({
            success:true,
            message:"All categories are fetched successfully",
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