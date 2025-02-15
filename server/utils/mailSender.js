const nodemailer = require('nodemailer');
require('dotenv').config();
const mailSender = async (eamil,title,body) => {
    try{
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            }
        })

        let info = await transporter.sendMail({
            from:"EduSphere",
            to:`${email}`,
            subject:`${title}`,
            html:  `${body}`,
        })
    }
    catch(error){
        console.log(error.message);

    }
}