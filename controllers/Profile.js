const Profile = require("../models/Profile");
const User = require("../models/User");

exports.updateProfile = async(req,res)=>{
    try{
        //fetch details
        const {dateOfBirth="",about="",contactNumber,gender}=req.body;

        const id=req.user.id;

        if(!dateOfBirth || !about || !contactNumber || !gender){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            });
        }

        //fetch profile details
        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);

        //save or update the details
        profileDetails.dateOfBirth=dateOfBirth;
        profileDetails.about=about;
        profileDetails.gender=gender;
        profileDetails.contactNumber=contactNumber;

        await profileDetails.save();

        return res.status(200).json({
            success:true,
            message:"Profie Details Updated successfully",
            profileDetails,
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}


//delete account
exports.deleteAccount = async(req,res)=>{
    try{
        //fetch data from request
        const id=req.user.id;

        //fetch user details from db
        const userDetails=await User.findById(id);
        
        //validate
        if(!userDetails){
            return res.stauts(500).json({
                success:false,
                message:"User not found",
            })
        }

        //delete additional details
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});

        //delete the whole acount from db
        await User.findByIdAndDelete({_id:id});

        return res.status(200).json({
            success:true,
            message:"User deleted successfully",
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"User cannot be deleted successfully",
        });
    }
}

//to get all user details
exports.getAllUserDetails = async(req,res)=>{
    try{
        //fetch id from request
        const id =req.user.id;

        //fetch user details from db
        const userDetails=await User.findById(id).populate("additional details").exec();

        return res.status(200).json({
            success:true,
            message:"User data fetched successfully",
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.mess,age
        })
    }
}