const Course = require('../models/Course');
const Category = require('../models/Category');
const User = require('../models/User');
const {uploadImageToCloudinary} = require('../utils/imageUploader');

// createCourse handler function
exports.createCourse = async (req,res)=>{
    try{
        // fetch data from request body
        const {courseName,courseDescription,whatYouWillLearn,price,category,tags} = req.body;
        const thumbnail = req.file.thumbnailImage;
        // validate data
        if(!courseName ||!courseDescription || !whatYouWillLearn || !price || !category || !tags || !thumbnail){
            return res.status(400).json({
                success:false,
                message:"Please provide all details",
            }); 
        }

        // check for instructor
        const userId = req.user.id;
        const instructor = await User.findById(userId);
        console.log("Instructor Details:",instructor);
        // TODO: user id and instructor id are same or different??

        if(!instructor){
            return res.status(404).json({
                success:false,
                message:"Instructor Details not found",
            });
        }

        // check given Category is valid or not
        const categoryDetails = await Category.findById(category);
        if(!categoryDetails){
            return res.status(404).json({
                success:false,
                message:"Category Details not found",
            });
        }

        // upload image to Cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);

        // create course entry in db
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor:instructor._id,
            whatYouWillLearn,
            price,
            thumbnail:thumbnailImage.secure_url,
            category:categoryDetails._id,
            tags
        })

        // add the new course to the user schema of instructor
        await User.findByIdAndUpdate(
            {_id:instructor._id},
            {
                $push:{
                    courses:newCourse._id,
                }
            },
            {new:true},
        );

        // add the new Course to the Category schema
        await Category.findByIdAndUpdate(
            {_id:categoryDetails._id},
            {
                $push:{
                    courses:newCourse._id,
                }
            },
            {new:true},
        );

        // return response
        return res.status(200).json({
            success:true,
            message:"Course created successfully",
            data:newCourse,
        })

    }
    catch(error){
        console.log(error.message);
        return res.status(400).json({
            success:false,
            message:"Error while creating course",
            error:error.message,
        })
    }
}


// getAllCourses handler function

exports.showAllCourses = async (req,res)=>{
    try{
        const allCourses = await Course.find({},{courseName:true,
                                                price:true,
                                                thumbnail:true,
                                                instructor:true,
                                                ratingAndReview:true,
                                                studentsEnrolled:true,
                                            }).populate("instructor")
                                            .exec();

        return res.status(200).json({
            success:true,
            message:"Fetched all courses successfully",
            data:allCourses,
        });

    }
    catch(error){
        console.log(error.message);
        return res.status(400).json({
            success:false,
            message:"Error while fetching courses",
            error:error.message,
        })
    }
};


