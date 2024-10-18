const nodemailer = require('nodemailer');

const sendEmailOTP = async (email, otp) => {
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail', // or your preferred email service
            auth: {
                user: process.env.EMAIL_USER, // Your email address
                pass: process.env.EMAIL_PASS  // Your email password
            }
        });

        // Email content
        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Cuvette App Email Verification',
            text: `Your OTP for email verification is ${otp}. It will expire in 10 minutes.`
        };

        // Send email
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendEmailOTP;
