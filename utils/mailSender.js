const nodemailer=require("nodemailer");
const mailSender=async(email,title,body)=>{
    try{
        //transporter creator
        let transporter=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            }
        })

        //Send Mail
        let info=await transporter.sendMail({
            from:'StudyNotion',
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`,
        })
        console.log(info);
        return info;

    }
    catch(error){
        console.log("Error Occured while sending OTP ",error.message );
    }
}

module.exports=mailSender;