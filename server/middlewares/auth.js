const jwt = require('jsonwebtoken');
require('dotenv').config;

// auth
exports.auth = async(req,res,next)=>{
    try{    
        // extract token from request
        const token = req.cookies.token
                        || req.body.token
                        || req.header("Authorization")?.replace("Bearer ","");
        
        // if token is missing return response
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token missing",
            });
        }

        // verify the token 
        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET_KEY);
            console.log("Decoded",decode);
            req.user = decode;
        }
        catch(error){
            // verification issue
            return res.status(401).json({
                success:false,
                message:"Invalid token",
            });
        }
        next();
 
    }
    catch(error){
        return res.status(400).json({
            success:false,
            message:"Error while validating the token, please try again later",
        });

    }
}

// isStudent
exports.isStudent = async (req,res,next)=>{
    try{
        if(req.user.accountType!=="Student"){
            return res.status(403).json({
                success:false,
                message:"You are not authorized to access this route,Student only",
            });
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error while validating the student, please try again later"
        });
    }
}

// isInstructor
exports.isInstructor = async (req,res,next)=>{
    try{
        if(req.user.accountType!=="Instructor"){
            return res.status(403).json({
                success:false,
                message:"You are not authorized to access this route, Instructor only",
            });
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error while validating the instructor, please try again later"
        });
    }
}

// isAdmin
exports.isAdmin = async (req,res,next)=>{
    try{
        if(req.user.accountType!=="Admin"){
            return res.status(403).json({
                success:false,
                message:"You are not authorized to access this route, Admin only",
            });
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error while validating the Admin, please try again later"
        });
    }
}