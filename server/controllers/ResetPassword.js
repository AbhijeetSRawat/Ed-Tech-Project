const User=require("../models/User");
const mailSender=require("../utils/mailSender");
const bcrypt=require("bcrypt");

//code for token generation and sending through email
exports.resetPasswordToken = async (req,res)=>{
    try{
        //data fetch from the request
        const {email}=req.body;

        //db call for the user
        const user=await User.findOne({email:email});

        if(!user){
            return res.status(500).json({
                success:false,
                message:"Your email is not registered with us."
            })
        }

        //create a token by crypto and update the token to the DB
        const token=crypto.randomUUID();

        const updatedDetails=await User.findOneAndUpdate({email:email},
                                                         {token:token,
                                                            resetPasswordExpires:Date.now()+5*60*1000,
                                                         },
                                                         {new:true});
             
        //create url and send it through mailSender
        const url=`http://localhost:3000/update-password/${token}`;
        
        await mailSender(email,"Password reset link",`Password Reset Link : ${url}`);

        return res.status(200).json({
            success:true,
            message:"Email sent successfully , Please check email and change your password",
            token
        })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Something went wrong while reset pwd mail"
        })
    }
}

//for rest password
exports.resetPassword=async (req,res)=>{
    try{
        //fetch data and check it
        const {password,confirmPassword,token}=req.body;

        if(!password || !confirmPassword || !token){
            return res.json({
                success:false,
                message:"Some data is missing while resetting the password"
            })
        }

        if(password !== confirmPassword){
            return res.status(500).json({
                success:false,
                message:"Passwords are not matching",
            })
        }

        //DB call to find the user entry with the same token
        const userDetails = await User.findOne({token:token});

        if(!userDetails){
            return res.json({
                success:false,
                message:"Token is Missing"
            })
        }

        if(userDetails.resetPasswordExpires < Date.now()){
            return res.json({
                success:false,
                message:"Token is expired, Please regenerate your token"
            })
        }

        const hashedPassword=await bcrypt.hash(password,10);

        await User.findOneAndUpdate({token : token},
                                    {password:hashedPassword},
                                    {new:true})

        return res.status(200).json({
            success:true,
            message:"password reset successfully",
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while resetting the password"
        })
    }
}