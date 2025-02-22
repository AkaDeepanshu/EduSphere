const Course = require('../models/Course');
const User = require('../models/User');
const {instance} = require('../config/razorpay');
const mailSender = require('../utils/mailSender');
const {courseEnrollementEmail} = require('../mail/templetes/courseEnrollementEmail');
const { default: mongoose } = require('mongoose');

// capture the payment and initiate the Razorpay order
exports.capturePayment = async(req,res) =>{
    // get courseId and userId
    const courseId = req.body.courseId;
    const userId = req.user.id;
    // valid courseId
    if(!courseId){
        return res.status(400).json({
            success:false,
            message:"Please provide valid course ID",
        });
    }
    // valid CourseDetail
    let course;
    try{
        course = await Course.findById(courseId);
        if(!course){
            return res.status(404).json({
                success:false,
                message:"Course Not Found",
            });
        }

        // user already pay for the same course
        const uid = new ObjectId(userId);
        if(course.studentsEnrolled.includes(uid)){
            return res.status(200).json({
                success:false,
                message:"User already enrolled in the course",
            });
        }

    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
    // order create
    const amount = course.price;
    const currency = "INR";

    const options = {
        amount: amount*100,
        currency,
        recepit:Math.random(Date.now()).toString(),
        notes:{
            courseId,
            userId,
        }
    };

    try{
        // initiate the payment using Razorpay
        const paymentResponse = await instance.orderd.create(options);
        console.log(paymentResponse);
        // return response
        return res.status(200).json({
            success:true,
            courseName:course.cousreName,
            courseDescription:course.cousreDescription,
            thumbnail:course.thumnail,
            orderId:paymentResponse.id,
            currency:paymentResponse.currency,
            amount:paymentResponse.amount,
        });

    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:"Error while initiating the payment",
            message:error.message,
        });
    }
    
}

// verify the signature from razorpay server
exports.verifySignature = async (req,res) =>{
    try{
        const webhookSercret = process.env.RAZORPAY_WEBHOOK_SECRET;

    const signature = req.headers['x-razorpay-signature'];

    const shasum = crypto.createhmac('sha256',webhookSercret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest('hex');

    if(digest===signature){
        console.log("Payment is authorized");
        // update the user and course
        const {courseId,userId} = req.body.payload.payment.entity.notes;
        try{
            // take the action

            // update the course and enroll the student
            const enrolledCourse = await Course.findByIdAndUpdate(courseId,
                                                        {$push:{studentsEnrolled:userId}},
                                                        {new:true}
                                                        );
            
            if(!enrolledCourse){
                return res.status(404).json({
                    success:false,
                    message:"COurse not found",
                });
            }

            console.log(enrolledCourse);

            // update the user and add the course
            const enrolledUser = await User.findByIdAndUpdate(userId,{$push:{courses:courseId}},{new:true});
            if(!enrolledUser){
                return res.status(404).json({
                    success:false,
                    message:"User not found",
                });
            }
            console.log(enrolledUser);

            // send confirmation email
            const emailResponse = await mailSender(enrolledUser.email,"Congratulations! Welcome to the EduSphere",`Congratulations! You have successfully enrolled in the ${enrolledCourse.courseName} course. You can now start learning.`);
            console.log(emailResponse);

            // return response
            return res.status(200).json({
                success:fasle,
                message:"Payment is authorized and course is enrolled",
            });
        }
        catch(error){
            console.log(error.message);
            return res.status(500).json({
                success:false,
                message:error.message,
            });
        }
    }
    }
    catch(errr){
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}