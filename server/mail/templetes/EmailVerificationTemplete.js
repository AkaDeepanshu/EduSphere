exports.EmailVerificationTemplete = (otp)=>{
    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verification Email from EduSphere</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        h2 {
            color: #333;
        }
        p {
            color: #555;
            font-size: 16px;
        }
        .otp-code {
            font-size: 22px;
            font-weight: bold;
            background: #f3f3f3;
            display: inline-block;
            padding: 10px 20px;
            border-radius: 5px;
            margin: 15px 0;
            letter-spacing: 5px;
        }
        .footer {
            margin-top: 20px;
            font-size: 14px;
            color: #888;
        }
    </style>
</head>
<body>

    <div class="container">
        <h2>Email Verification</h2>
        <p>Hello,</p>
        <p>Use the OTP below to verify your email address:</p>
        <div class="otp-code">{${otp}}</div>
        <p>This OTP is valid for 10 minutes. Do not share it with anyone.</p>
        <p>If you did not request this, please ignore this email.</p>
        <div class="footer">
            <p>© 2025 EduSphere. All rights reserved.</p>
        </div>
    </div>

</body>
</html>
`
}