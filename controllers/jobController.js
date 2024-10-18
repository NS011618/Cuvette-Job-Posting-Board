const Job = require('../models/Job');
const Candidate = require('../models/Candidate'); // Assuming you have a Candidate model
const nodemailer = require('nodemailer');
const User = require('../models/User'); // Assuming you have a User model

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'gmail', // Or any email service provider you prefer
    auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your email password or app-specific password
    },
});

// Create Job and Send Emails
exports.createJob = async (req, res) => {
    const { title, description, experienceLevel, endDate } = req.body;

    try {
        // Fetch the user's details, including the company name
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Create a new job with companyId and companyName
        const job = new Job({
            title,
            description,
            experienceLevel,
            endDate,
            companyId: req.user.id, // Use authenticated user's ID as the company ID
            companyName: user.companyName // Store company name in the Job model
        });

        await job.save();

        // Get all candidates from the database
        const candidates = await Candidate.find();
        
        // Send email to each candidate
        candidates.forEach(candidate => {
            const mailOptions = {
                from: process.env.EMAIL_USER, // Sender address
                to: candidate.email, // List of recipients
                subject: 'Job Updates: ' + user.companyName + ' is hiring for ' + title , // Subject line
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #dddddd; border-radius: 8px; background-color: #f9f9f9;">
                        <div style="text-align: center; background-color: #007bff; padding: 10px; border-radius: 8px 8px 0 0;">
                            <h2 style="color: #ffffff; margin: 0;">New Job Opportunity at ${user.companyName}</h2>
                        </div>
                        <div style="padding: 20px; background-color: #ffffff; border-radius: 0 0 8px 8px;">
                            <p style="font-size: 16px; color: #333333;"><strong>Job Title:</strong> ${title}</p>
                            <p style="font-size: 16px; color: #333333;"><strong>Description:</strong> ${description}</p>
                            <p style="font-size: 16px; color: #333333;"><strong>Experience Level:</strong> ${experienceLevel}</p>
                            <p style="font-size: 16px; color: #333333;"><strong>End Date:</strong> ${endDate}</p>                                    
                            <p style="font-size: 14px; color: #666666; text-align: center;">If you are interested in this job opportunity, please checkout our website.</p>
                        </div>
                        <div style="text-align: center; padding: 10px 0; font-size: 12px; color: #aaaaaa;">
                            <p>©2024 Cuvette Tech. All rights reserved.</p>
                        </div>
                    </div>
                `,
            };
            

            // Send the email
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(`Error while sending email to ${candidate.email}:`, error);
                }
                console.log('Email sent to:', candidate.email, info.response);
            });
        });

        res.status(201).json({ msg: 'Job posted and emails sent to candidates!' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
