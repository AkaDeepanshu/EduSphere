const User = require('../models/User'); 
const Profile = require('../models/Profile');
const Otp = require('../models/Otp');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const otpGenerator = require('otp-generator');
const mailSender = require('../utils/mailSender');
require('dotenv').config;

// send otp
exports.sendOtp = async (req,res)=>{
    try{
        // fetch email from request
        const email = req.body.email;

        // check if user exists
        const checkUser = await User.findOne({email});

        if(checkUser){
            return res.status(400).json({message:"User already exists"});
        }
        // generate otp
        var otp = otpGenerator.generate(6,{
            digits:true,
            upperCase: false,
            specialChars: false,
            lowerCase: false
        });
        console.log("Generated OTP", otp);

        //  // check unique otp or not
        // const checkotp = await Otp.findOne({otp:otp});
        // while(checkotp){
        //     otp = otpGenerator.generate(6,{
        //         upperCase: false,
        //         specialChars: false,
        //         lowerCase: false
        //     });
        //     checkotp = await Otp.findOne({otp:otp});
        // }

        // save otp in db
        const otpPayload = {email,otp};

        const otpBody = await Otp.create(otpPayload);
        console.log("OTP created:",otpBody);

        // return response
        return res.status(200).json({
            success:true,
            message:"OTP sent successfully",
            otp
        })
    }
    catch(error){
        console.log(error.message);
    }

}


// signup
exports.signUp = async (req,res)=>{
    try{
        // data fetch from request body
        const {
            firstName,
            lastName,
            email,
            accountType,
            contactNumber,
            password,
            confirmPassword,
            otp} = req.body;
        // validate data
        if(!firstName || !lastName || !email || !accountType || !password || !confirmPassword || !otp){
            return res.status(400).json({
                success:false,
                message:"All fields are required"});
        }
        // 2 password match or not
        if(password !==confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password do not match"});
            
        }
        // check user already exist or not
        const checkUser = await User.findOne({email});
        if(checkUser){
            return res.status(400).json({
                success:false,
                message:"User already exists"
            });
        }

        // fetch most recent otp from db
        const recentOtp = await Otp.findOne({email}).sort({createdAt:-1}).limit(1);
        console.log("Recent OTP",recentOtp);
        // validate otp
        if(!recentOtp){
            return res.status(400).json({
                success:false,
                message:"OTP not found",
            });
        }
        else if(otp!==recentOtp.otp){
            return res.status(400).json({
                success:false,
                message:"Invalid OTP",
                recentOtp:recentOtp.otp,
                userOtp:otp,
                })
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password,10);

        // create entry in db
        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
        })
        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password:hashedPassword,
            accountType,
            additionalDetails:profileDetails._id,
            image:`https:api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        });

        // return response
        return res.status(200).json({
            success:true,
            message:"User registered successfully",
            user
        })

    }
    catch(error){
        console.log(error.message);
        return res.status(400).json({
            success:false,
            message:"Error while signing up, please try again later",
        });
    }
}

// login

exports.login = async (req,res)=>{
    try{
        // fetch data from request body 
        const {email,password} = req.body;
        // validate data
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            });
        }
        // check user exist or not
        const user = await User.findOne({email}).populate("additionalDetails");
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User is not registered, please sign up first",
            });
        }
        // check password match or not and generate token
        if(await bcrypt.compare(password,user.password)){
            const payload = {
                email:user.email,
                id:user._id,
                accountType:user.accountType,
            }
            const token = jwt.sign(payload,process.env.JWT_SECRET_KEY,{
                expiresIn:"2h"
            });
            user.token = token;
            user.password = undefined;

            // create cookie and return response
            const options = {
                expires:new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true,
            }
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"User logged in successfully",
            });
        }
        else{
            return res.status(401).json({
                success:false,
                message:"Password is incorrect, please try again",
            });
        }
        

    }
    catch(error){
        console.log(error.message);
        return res.status(400).json({
            success:false,
            message:"Error while Login, please try again later",
        });
    }
}

// changePassword
exports.changePassword = async (req,res)=>{
    try{
        // fetch data from request body
        const {oldPassword,newPassword,confirmPassword} = req.body;
        // validate data
        if(!oldPassword || !newPassword || !confirmPassword){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            });
        }
        if(newPassword !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password do not match",
            });
        }
        // fetch userId
        const userId = req.user.id;
        // update password in db
        const user = await User.findById(userId);
        if(await bcrypt.compare(oldPassword,user.password)){
            const hashedPassword = await bcrypt.hash(newPassword,10);
            await User.findByIdAndUpdate(userId,{password:hashedPassword});
        }
        // send confirmation mail
        const mailResponse = await mailSender(user.email,"Password changed successfully","Your password has been changed successfully");
        console.log("Email sent successfully!!",mailResponse);
        // return response
        return res.status(200).json({
            success:true,
            message:"Password changed successfully",
        });
    }
    catch(error){
        console.log(error.message);
        return res.status(400).json({
            success:false,
            message:"Error while changing Password, please try again later",
        })
    }
}