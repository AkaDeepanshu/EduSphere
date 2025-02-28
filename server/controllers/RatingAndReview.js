const Rating = require('../models/RatingAndReview');
const Course = require('../models/Course');
const { Mongoose } = require('mongoose');

// create Rating
exports.createRating = async(req,res) =>{
    try{
        // fetch data from request body
        const {courseId,rating,review} = req.body;
        // get user id
        const userId = req.user.id;
        // validate data
        if(!courseId || !rating || !review){
            return res.status(400).json({
                success:false,
                message:"Please fill all the feilds",
            });
        }
        // check if user is enrolled or not
        const courseDetail = await Course.findOne({_id:courseId,studentEnrolled:{$elemMatch:{$eq:userId}}});
        if(!courseDetail){
            return res.status(400).json({
                success:false,
                message:"You are not enrolled in this course",
            });
        }
        // check if user already filled rating or not
        const ratingExist = await Rating.findOne({
            user:userId,
            course:courseId,
        });

        if(ratingExist){
            return res.status(400).json({
                success:false,
                message:"You have already filled the rating",
            });
        }
        // create rating and review
        const newRating = await Rating.create({
            user:userId,
            course:courseId,
            rating,
            review,
        });
        // update course rating
        await Course.findByIdAndUpdate(courseId,{
            $push:{
                ratingAndReview:newRating._id,
            }
        });
        // return response
        return res.status(200).json({
            success:true,
            message:"Rating created successfully",
            newRating,
        })
    }
    catch(error){
        console.log(error.message);
        return res.status(400).json({
            success:false,
            message:"Error while creating Rating",
            error:error.message,
        })
    }
}

// get average Rating
exports.getAverageRating = async (req,res) =>{
    try{
        const {courseId} = req.body;
        
        // calculate average Rating
        const result = await Rating.aggregate([
            {
                $match:{
                    course: new Mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg:"$rating"},
                }
            }
        ])

        // return rating
        if(result.length>0){
            return res.status(200).json({
                success:true,
                message:"Average Rating Fetched Successfully",
                averageRating:result[0].averageRating, 
            });

        }
        // if no rating found return response
        return res.status(200).json({
            success:true,
            message:"Average Rating is 0, No rating is given till now",
            averageRating:0,
        });
        
    }
    catch(error){
        console.log(error.message);

        return res.status(500).json({
            success:false,
            message:"Error while getting average Rating",
            error:error.message,
        })
    }
}

// get Rating by Course
exports.getRatingByCourse = async(req,res) =>{
    try{
        // get course id
        const {courseId} = req.body;

        // get ratings
        const ratings = await Rating.find({course:courseId}).sort({rating:"desc"})
                                                            .populate({
                                                                path:'user',
                                                                select:'firstName lastName image',
                                                            })
                                                            .populate({
                                                                path:'course',
                                                                select:'courseName',
                                                            })
                                                            .exec();

        // if no ratings founds return response
        if(!ratings){
            return res.status(200).json({
                success:true,
                message:`No ratings found for ${courseId}`,
            });
        }

        // return ratings
        return res.status(200).json({
            success:true,
            message:"Ratings fetched successfully",
            data:ratings,
        })

    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:"Error while getting all Ratings by course",
            error:error.message,
        })
    }
}

// get All ratings
exports.getAllRating = async(req,res)=>{
    try{
        const allRatings = await Rating.find({}).sort({rating:"desc"})
                                                .populate({
                                                    path:'user',
                                                    select:'firstName lastName image'
                                                })
                                                .populate({
                                                    path:'course',
                                                    select:'courseName'
                                                })
                                                .exec();

        // return allRatings
        return res.status(200).json({
            success:true,
            message:"All Rating are fetched successfully",
            data:allRatings,
        });
    }
    catch(error){
        console.log(error.message);

        return res.status(500).json({
            success:false,
            message:"Error while getting all Ratings",
            error:error.message,
        })
    }
}
