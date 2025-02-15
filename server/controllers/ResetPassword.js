const User = require('../models/User');
const mailSender = require('../utils/mailSender');

// resetPasswordToken
exports.resetPasswordToken = async (req,res) =>{
    try{
        // get email from request body
        const email = req.body.email;
        // check for user and validate email
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found"
            });
        }
        // generate token
        const token = crypto.randomUUID();
        // update user by adding token and expiration time
        const updateUser = await User.findOneAndUpdate({email:email},
            {   token:token,
                resetPasswordExpires:Date.now() + 5*60*1000,
            },
            {new:true}
        );
        // create url 
        const url = `http://localhost:3000/update;password/${token}`;
        // send mail containing the url
        await mailSender(email,"Password reset link",`Click on the link to reset your password ${url}`);
        // return response
        return res.status(200).json({
            status:true,
            message:"Password reset link has been sent to your email",
        });
    }
    catch(error){
        console.log(error.message);
        return res.status(400).json({
            success:false,
            message:"Error while sending password reset link",
        });
    }
}
// resetPassword

exports.resetPassword = async(req,res)=>{
    try{
        // fetch data from request body
        const {token,newPassword,confirmPassword} = req.body;
        // validate data
        if(newPassword !==confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Passwords do not match",
            });
        }
        // get userDetails from db by token
        const user = await User.findOne({token:token});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Invalid token",
            });
        }
        // check for token expiration
        if(user.resetPasswordExpires < Date.now()){
            return res.status(400).json({
                success:false,
                message:"Token expired",
            });
        }
        // hash password
        const hashedPassword = await bcrypt.hash(newPassword,10);
        // update password in db
        await User.findOne({token:token},{password:hashedPassword},{new:true});
        // return response
        return res.status(200).json({
            success:true,
            message:"Password reset successfully",
        });
    }
    catch(error){
        console.log(error.message);
        return res.status(400).json({
            success:false,
            message:"Error while resetting password",
        });
    }

}

