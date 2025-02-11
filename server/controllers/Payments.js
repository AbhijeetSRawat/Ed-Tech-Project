const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const {default:mongoose} = require("mongoose");


//create the payment
exports.createPayment = async (req,res)=>{
    try{
        //get course and user id from req
        const {course_id}= req.body;
        const userId=req.user.id;

        if(!course_id){
            return res.json({
                success:false,
                message:'Please provide valid course id'
            })
        }
        //get course details from db call
        let course;

        try{
            course=await Course.findById(course_id);

            if(!course){
                return res.json({
                    success:false,
                    message:'Could not find the course',
                });
            }

            //convert user it from string to object id
            const uid = new mongoose.Types.ObjectId(userId);

            if(course.studentsEnrolled.includes(uid)){
                return res.status(200).json({
                    success:false,
                    message:"student is already enrolled",
                })
            }

        }
        catch(error){
            console.log(error);
            return res.status(500).json({
                success:false,
                message:error.message,
            })
        }
        
        //create payment
        const amount = course.price;
        const currency="INR";

        const options={
            amount : amount*100,
            currency,
            recipt:Math.random(Date.now()).toString(),
            notes:{
                courseId:course_id,
                userId,
            }
        };

        try{
            const paymentResponse = await instance.orders.create(options);
            console.log(paymentResponse);

            return res.status(200).json({
                success:true,
                courseName:course.courseName,
                courseDescription:course.courseDescription,
                thumbnail:course.thumbnail,
                orderId:paymentResponse.id,
                currency:paymentResponse.currency,
                amount:paymentResponse.amount,
            })
        }
        catch(error){
            console.log(error);
            res.json({
                success:false,
                message:"Could not initiate order"
            })
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"error occured while creating payment"
        })
    }
}


//verify signature of the payment
exports.verifySignature = async(req,res)=>{
    try{
        //webhook and signature fetch
        const webhookSecret = "12345678";
        const signature = req.headers["x-razorpay-signature"];

        //webhook encryption
        const shasum = crypto.createHmac("sha256",webhookSecret);
        shasum.update(JSON.stringify(req.body));
        const digest = shasum.digest("hex");

        //signature matching
        if(signature === digest){
            console.log("Payment is Authorised");

            const {courseId,userId}= request.body.payload.entity.notes; //fetch details from notes

            try{
                //add student name into the course
                const enrolledCourse = await Course.findOneAndUpdate(
                                                                    {_id:courseId},
                                                                    {
                                                                        $push:{
                                                                            studentsEnrolled:userId
                                                                        }
                                                                    },
                                                                    {new:true}
                );

                if(!enrolledCourse){
                    return res.status(500).json({
                        success:false,
                        message:'Course not found',
                    })
                }
                
                //add course to user modal
                const enrolledStudent = await User.findOneAndUpdate(
                                                                    {_id:userId},
                                                                    {
                                                                        $push:{
                                                                            courses:courseId,
                                                                        }
                                                                    },
                                                                    {new:true}
                );

                //send confirmation email
                const emailResponse = await mailSender(
                                                        enrolledStudent.email,
                                                        "Congratulations from StudyNotion",
                                                        "Congratuulations, you have enboarded into new studyNotion course"
                );

                return res.status(200).json({
                    success:true,
                    message:"Signature verified and course added",
                })
            }
            catch(error){
                return res.status(500).json({
                    success:false,
                    message:"Error occured at enrolling course to user model or user to course model"
                })
            }
        }
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error occured at verifying payment signature"
        })
    }
}