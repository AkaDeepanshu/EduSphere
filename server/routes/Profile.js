const express = require("express");
const router = express.Router();

const {auth} = require('../middlewares/auth');

const {
    updateProfile,
    deleteAccount,
    getUserDetails,
    getEnrolledCourses,
    uploadProfileImage

} = require('../controllers/Profile');


// ************Profile Routes************

// Route for profile
router.delete('/deleteProfile',deleteAccount);
router.put('/updateProfile',auth,updateProfile);
router.put('/updateProfileImage',auth,uploadProfileImage);
router.get('/getUserDetails',auth,getUserDetails);

// Routes for enrolled courses
router.get('/getEnrolledCourses',auth,getEnrolledCourses);

module.exports = router;