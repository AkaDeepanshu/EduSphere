const Profile = require('../models/Profile');
const User = require('../models/User');
const Course = require('../models/Course');
const {uploadImageToCloudinary} = require('../utils/imageUploader');

// update profile handler function
exports.updateProfile = async (req,res) =>{
    try{
        // get data
        const {gender , dateOfBirth="" , about="" , contactNumber } = req.body;
        // get user id
        const id = req.user.id;
        // validation
        if(!gender || !contactNumber || !id){
            return res.status.json({
                success:false,
                message:"All fields are required",
            })
        }
        // find and update profile
        const userDetails = await User.findByIdAndUpdate(id,{
                                                        contactNumber
                                                    },{new:true});
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findByIdAndUpdate(profileId,{
                                                        gender,
                                                        about,
                                                        dateOfBirth,
                                                    },
                                                    {new:true});        
        // return response
        return res.status(200).json({
            success:true,
            message:"Profile updated successfully",
            profileDetails
        });
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:"Error while updating profile",
            
        })
    }
}

// delete account handler function
exports.deleteAccount = async (req,res)=>{
    try{
        // get id
        const id = req.user.id;
        // validate user
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User Not Found",
            });
        }
        // remove student from studentsEnrolled in Course Schema 
        if(user.accountType==="Student"){
            await Course.updateMany(
                { studentsEnrolled: id }, 
                { $pull: { studentsEnrolled: id } }
              );
        }
        // delete profile
        await Profile.findByIdAndDelete({_id:user.additionalDetails});
        // delete user
        await User.findByIdAndDelete(id);

        // return response
        return res.status(200).json({
            success:true,
            message:"Account Deleted successfully",
        });
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:"Error while deleting account",
        });
    }
}

// getProfile handler function
exports.getUserDetails = async (req,res)=>{
    try{
        // get user id
        const id = req.user.id;
        // validate and get user data
        const userDetails = await User.findById(id).populate('additionalDetails').exec();
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"User Not Found",
            });
        }
        // retunr response
        return res.status(200).json({
            success:true,
            message:"User data fetched successfully",
            userDetails:userDetails
        })

    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:"Error while fetching user data",
        });
    }
}

// getEnrolledCourses handler function
exports.getEnrolledCourses = async (req,res)=>{
    try{
        // get user id
        const userId = req.user.id;
        // get Enrolled Courses
        const enrolledCourses = await Course.find({studentsEnrolled:userId});
        // return response
        return res.status(200).json({
            success:true,
            message:"Enrolled Courses fetched successfully",
            data:enrolledCourses,
        });

    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:"Error while fetching enrolled courses of user",
        });

    }
}

// uploadProfileImage handler function
exports.uploadProfileImage = async(req,res)=>{
    try{
        // get user id
        const userId = req.user.id;
        // get image
        const image = req.files.image;
        // validate image
        if(!image){
            return res.status(400).json({
                success:false,
                message:"Image is required",
            });
        }
        // upload image to cloudinary
        const imageResponse = await uploadImageToCloudinary(image,process.env.FOLDER_NAME);
        // update image in profile
        const updatedUser = await User.findByIdAndUpdate(userId,{image:imageResponse.secure_url},{new:true});
        // return resposne
        return res.status(200).json({
            success:true,
            message:"Image updated successfully",
            updatedUser
        })
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:"Error while updating Image",
            error:error.message
        })
    }
}