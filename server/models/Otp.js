const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    otp: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 300 
    }
});

async function sendVerificationEmail(email, otp) {
    // Send email logic here
    try{
        const mailResponse = await mailSender(email,"Verification email from EduSphere", otp);
        console.log("EMail sent successfully", mailResponse);

    }
    catch(error){
        console.log("Error while sending otp verification email", error);
    }
}

otpSchema.pre('save', async function(next) {
     
        await sendVerificationEmail(this.email, this.otp);
        next();

})

module.exports = mongoose.model('OTP', otpSchema);