const jwt=require("jsonwebtoken");
require("dotenv").config();
const User=require("../models/User");

exports.auth=async (req,res,next)=>{
    try{
        //fetch token from the header or cookies or body
        const token=req.header("Authorization").replace("Bearer ","") || req.cookies.token || req.body.token;
        //check if the token is missing or not
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is Missing",
            })
        }

        //check if token is valid or not
        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            //done to authenticate the account type
            req.user=decode;
        }
        catch(error){
            return res.status(401).json({
                success:false,
                message:"Token is invalid"
            })
        }

        next();
    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:"Something went wrong while validating the token",
        })
    }
}

exports.isStudent = async(req,res,next)=>{
    try{
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Students only",
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified, please try again."
        })
    }
}

exports.isInstructor = async(req,res,next)=>{
    try{
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Instructors only",
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified, please try again."
        })
    }
}

exports.isAdmin = async(req,res,next)=>{
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Admins only",
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified, please try again."
        })
    }
}