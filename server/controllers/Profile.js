const Profile = require('../models/Profile');
const User = require('../models/User');
const Course = require('../models/Course');

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
        const userDetails = User.findById(id).populate('additionalDetails').exec();
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
            userDetails
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