const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');
const {EmailVerificationTemplete } = require('../mail/templetes/EmailVerificationTemplete')

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
        expires: Date.now() + 30*60*1000, 
    }
});

async function sendVerificationEmail(email, otp) {
    // Send email logic here
    try{
        const mailResponse = await mailSender(email,"Verification email from EduSphere", EmailVerificationTemplete(otp));
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