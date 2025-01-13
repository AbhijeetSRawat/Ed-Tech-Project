const User=require("../models/User");
const OTP=require("../models/OTP");
const otpGenerator=require("otp-generator");
const bcrypt=require("bcrypt");
const Profile=require("../models/Profile");
const jwt = require ("jsonwebtoken");
require("dotenv").config();

//send otp contorller
exports.sendOTP=async(req,res)=>{
    try{
        //fetch data from bidy
        const {email}=req.body;

        //check in db whether present or not
        const checkUserPresent=await User.findOne({email});

        if(checkUserPresent){
            return res.status(401).json({
                success:false,
                message:"User already registered with this email."
            })
        }

        //generate otp
        var otp=otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });

        let result =await OTP.findOne({otp:otp});

        while(result){
            otp=otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            });
    
            result =await OTP.findOne({otp:otp});
        }

        const otpPayload={email,otp};

        //save otp to your db
        const otpBody=await otp.create(otpPayload);
        console.log(otpBody);

        res.status(200).json({
            success:true,
            message:"OTP sent successfully",
            otp
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

exports.signUp=async (req,res)=>{
    try{
        //fetch data from body
        const{
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp
        }=req.body;

        //check if any of them is empty
        if(!firstName || !lastName || !email || !password || !confirmPassword || !accountType || !contactNumber || !otp){
            return res.status(403).json({
                success:false,
                message:"All fields are required",
            })
        }

        //check if user already existing or not
        const existingUser=await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already existing with this id"
            })
        }

        //check the otp
        const recentOTP=await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log(recentOTP);

        if(recentOTP.length === 0){
            return res.status(400).json({
                success:false,
                message:"Otp not found"
            });
        }
        else if(otp !== recentOTP.otp){
            return res.status(400).json({
                success:false,
                message:"Otp not found"
            });
        }
        //hash the password and create a profile details
        const hashedPassword=await bcrypt.hash(password,10);

        const profileDetails=await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null,
        });
        //create entry in db

        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password:hashedPassword,
            accountType,
            additionalDetails:profileDetails._id,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`
        });

        return res.status(200).json({
            success:true,
            message:"User is registered successfully",
            user,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

//login

exports.login=async(req,res)=>{
    try{
        //data fetch from the req
        const {email,password} = req.body;

        //data check 
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"All fields are mandatory, fill all the fields"
            });
        }
        //data check in db
        const user=await User.findOne({email});

        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not registered, Please SignUp first"
            })
        }
        //comapare password
        if(await bcrypt.compare(password,user.password)){
            const payload={
                email:user.email,
                id:user._id,
                accountType:user.accountType,
            }
            
            //jwt token
            const token=jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h"
            });
            user.token=token;
            user.password=undefined;

            //cookie creation
            const options={
                expires:new Date(Date.now()+3*24*60*60*1000);
                httpOnly:true,
            }
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"Logged in successfully",
            })
        }
        else{
            return res.status(401).json({
                success:false,
                messsage:"Password is incorrect"
            })
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Login failure please try again",
        })
    }
}

//change password
exports.changePassword=async (req,res)=>{
    try{
        //data fetch from request body
        const {email,oldPassword,newPassword,confirmNewPassword}=req.body;4

        if(!oldPassword || !newPassword || !confirmNewPassword){
            return res.status(403).json({
                success:false,
                message:"All fields are required",
            })
        }

        if(newPassword !== confirmNewPassword){
            return res.status(403).json({
                success:false,
                message:"Passwords did not match",
            })
        }

        //db call to find the user with the given id 
        const user=await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not registered with this email",
            })
        }

        //comapare
        if(await bcrypt.compare(oldPassword,user.password)){

            const hashedPassword=await bcrypt.hash(newPassword,10);
            const setNewPassword=User.findOneAndUpdate({password:oldPassword},
                                                        {password:hashedPassword},
                                                        {new:true});

            return res.status(200).json({
                success:true,
                message:"Password changed Successfully!"
            })
        }
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error occured while changing the password",
        })
    }
}