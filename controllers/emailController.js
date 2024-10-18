const nodemailer = require('nodemailer');

// Send Job Alert
exports.sendJobAlert = async (req, res) => {
    const { candidateEmails, jobDetails } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: 'your-email@example.com',
        to: candidateEmails.join(','),
        subject: `Job Alert: ${jobDetails.title}`,
        text: `A new job is available: ${jobDetails.description}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ msg: 'Emails sent successfully' });
    } catch (err) {
        res.status(500).send('Error sending emails');
    }
};
