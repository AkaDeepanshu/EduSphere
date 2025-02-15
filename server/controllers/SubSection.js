const Section = require('../models/Section');
const SubSection = require('../models/SubSection');
const {uploadImageToCloudinary } = require('../utils/imageUploader');


// create SubSection handler function
exports.createSubSection = async (req,res)=>{
    try{
        // fetch data 
        const {sectionId,title,timeDuration,description} = req.body;
        // extract video file
        const video = req.files.videoFile;
        // validate data
        if(!sectionId || !title || !timeDuration || !description || !video){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            });
        }
        // upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
        // create entry in db
        const newsubSection = await SubSection.create({
            title,
            description,
            timeDuration,
            videoUrl:uploadDetails.secure_url,
        });
        // update section with this subsection
        const updatedSection =  await Section.findByIdAndUpdate(sectionId,{
                                                            $push:{
                                                                _id:newsubSection._id
                                                            }
                                                        },
                                                        {new:true}).populate('subSection').exec();
        // return response
        return res.status(200).json({
            success:true,
            message:"SubSection created successfully",
            updatedSection,
        });

    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:"Error while creating SubSection",
        });
    }
}

// update SubSection handler function
exports.updateSubSection = async (req,res)=>{
    try{
        // fetch data and extract video file
        const {title,timeDuration,description,subSectionId} = req.body;
        const video = req.files.videoFile;

        // validate data
        if(!title || !timeDuration || !description || !video || !subSectionId){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            });
        }
        // upload video to cloudinary
        const uploadFile = await uploadImageToCloudinary(video , process.env.FOLDER_NAME);
        // update entry in db
        const subSectionDetails = await SubSection.findByIdAndUpdate(subSectionId,{
                                                                           title,
                                                                           timeDuration,
                                                                           description,
                                                                           videoUrl: uploadFile.secure_url,
                                                                        },{new:true});

        // return response
        return res.status(200).json({
            success:true,
            message:"SubSection updated successfully",
            subSectionDetails,
        });
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:"Error while updating SubSection",
        });
    }
}

// delete SubSection handler function
exports.deleteSubSection = async (req,res)=>{
    try{
        const {subSectionId} = req.body;

        await SubSection.findByIdAndDelete(subSectionId);

        return res.status(200).json({
            success:true,
            message:"SubSection deleted successfully",
        });
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:"Error while deleting SubSection",
        });
    }
}