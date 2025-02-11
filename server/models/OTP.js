const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender")
const otpTemplate = require("../mail/templates/emailVerificationTemplate")

const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
    },
    createdAt:{
        type:Date,
    },
    otp:{
        type:Number,
    }
});

//function to sent otp through email

async function sendVerificationEmail(email,otp){
    try{
        const mailResponse=await mailSender(email,"Verification Email from StudyNotion",otpTemplate(otp));
        console.log("Email sent successfully ",mailResponse);
    }
    catch(error){
        console.log("error occured while sending mail", error.message);
        throw error;
    }
}

//pre middleware to send an otp
OTPSchema.pre("save",async function(next){
    console.log("New document saved to database");

	// Only send an email when a new document is created
	if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
    next();
})

module.exports = mongoose.model("OTP",OTPSchema);