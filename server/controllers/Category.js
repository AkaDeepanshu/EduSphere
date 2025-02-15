const Category = require('../models/Category');

// create Category handler function
exports.createCategory = async (res,res)=>{
    try{
        // fetch data from request body
        const {name , description} = req.body;
        // validate data
        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:"Please provide all details",
            });

        }
        // create Category entry in db
        const category = await Category.create({
            name:name,
            description:description
        });
        console.log("Category created",category);
        return res.status(200).json({
            success:true,
            message:"Category created successfully",
            data:category,
        })
    }
    catch(error){
        console.log(error.message);
        return res.status(400).json({
            success:false,
            message:"Error while creating Category",
        })
    }
}

// get all Categorys handler function
exports.getAllCategorys = async (req,res)=>{
    try{
        const allCategorys = await Category.find({},{name:1,description:1});
        return res.status(200).json({
            success:true,
            message:"All Categorys fetched successfully",
            data:allCategorys,
        })

    }
    catch(error){
        console.log(error.message);
        return res.status(400).json({
            success:false,
            message:"Error while fetching Category",
        })
    }
}