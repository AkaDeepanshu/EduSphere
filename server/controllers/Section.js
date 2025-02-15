const Section = require('../models/Section');
const Course = require('../models/Course');

exports.createSection = async (req,res) =>{
    try{
        // data fetch from request body
        const {sectionName,courseId} = req.body;
        // validate data
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"Please fill all the fields",
            });
        }
        // create section entry in db
        const newSection = await Section.create({
            sectionName
        });
        // add new section in course schema
        const updatedCourseDetails = await Course.findByIdAndUpdate({_id:courseId},
            {
                $push:{
                    _id:newSection._id
                }
            },
            {new:true},
        ).populate('courseContent')
        .populate('courseContent.subsection')
        .exec();
        // return response
        return res.status(200).json({
            success:true,
            message:"Section created successfully",
            data:updatedCourseDetails,
        })

    }
    catch(error){
        console.log(error.message);
        return res.status(400).json({
            success:false,
            message:"Error while creating Section",
        });
    }
}

exports.updateSection = async (req,res)=>{
    try{
        // fetch data
        const {sectionName , sectionId} = req.body;

        // validate data
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success:false,
                message: "All fields are required"
            });
        }

        //update section in db
        const updatedSection = await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true});
        
        // return response
        return res.status(200),json({
            success:true,
            message:"Section updated successfully",
            data:updatedSection
        });
    }
    catch(error){
        console.log(error.message);
        return res.status(400).json({
            success:false,
            message:"Error while updating Section"
        });
    }
}

exports.deleteSection = async (req,res)=>{
    try{
        // fetch sectionID from request body
        const sectionId = req.body.sectionId;
        // delete the entry from section schema
        await Section.findByIdAndDelete({sectionId});
        // TODO- do we need to delete the entry from Course schema
        // retrun response
        return res.status(200).json({
            success:true,
            message:"Section Deleted successfully",
        });
    }
    catch(error){
        console.log(error.message);
        return res.status(400).json({
            success:false,
            message:"Error while deleting Section"
        });
    }
}