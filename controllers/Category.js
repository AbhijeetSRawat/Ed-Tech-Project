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

exports.categoryPageDetails = async(req,res)=>{
    try{
        //get category id
        const {categoryId} = req.body;

        //get course for specified category id
        const selectedCategory = await Category.findById(categoryId)
                                                    .populate("courses")
                                                    .exec();

        //validation
        if(!selectedCategory){
            return res.status(404).json({
                success:false,
                messsage:"Data not found",
            })
        }

        //get courses for different categories
        const differentCategories = await Category.find({
                                                _id:{$ne:categoryId},
                                                    })
                                                    .populate("courses")
                                                    .exec();
        //get top selling courses (H.W)

        //return response
        return res.status(200).json({
            success:true,
            data:{
                selectedCategory,
                differentCategories
            }
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:true,
            message:error.message,
        })
    }
}