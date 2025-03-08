const express = require("express");
const router = express.Router();


const {
    login,
    signUp,
    sendOtp,
    changePassword
} = require('../controllers/Auth');
const {
    resetPasswordToken,
    resetPassword
} = require('../controllers/ResetPassword');

const {auth} = require('../middlewares/auth');

// ***********Authentication Routes***********

// Route for user login
router.post('/login',login);
// Route for user signup
router.post('/signup',signUp);
// Route for sending Otp
router.post('/sendotp',sendOtp);
// Route for changing password
router.patch('/update-password',auth,changePassword);

// ***********Reset Password Routes***********

// Route for generating reset password token 
router.post('/reset-password-token',resetPasswordToken);
// Route for reseting user password after verification
router.post('/reset-password',resetPassword);

module.exports = router;