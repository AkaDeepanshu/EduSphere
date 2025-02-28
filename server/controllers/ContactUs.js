const mailSender = require('../utils/mailSender');

// contact Us handler function

exports.contactUs = async(req,res)=>{
    try{
        // get data from request body
        const {firstName , lastName , email , contactNumber , message} = req.body;
        // validate data
        if(!firstName || !lastName || !email || !contactNumber || !message){
            return res.status(400).json({
                success:false,
                message:"Please provide all details",
            });
        }
        const contactUsDetails = {
            FirstName: firstName,
            lastName: lastName,
            Email: email,
            ContactNumber: contactNumber,
            Message: message,
        }
        // send email to EduSphere support
        await mailSender(process.env.SUPPORT_EMAIL,`Contact Us Request from ${firstName} ${lastName}`,JSON.stringify(contactUsDetails));

        // send confirmation email to user
        await mailSender(email,`Contact Us Request Confirmation`,`Dear ${firstName},\n\nWe have received your request. Our team will contact you soon.\n\nThanks & Regards,\nEduSphere Support`);
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:"Error while contacting EduSphere",
            error:error.message,
        });
    }
}