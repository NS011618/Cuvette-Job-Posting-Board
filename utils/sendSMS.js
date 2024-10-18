const twilio = require('twilio');

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendSMSOTP = async (phoneNumber, otp) => {
    try {
        // Ensure the phone number is in E.164 format
        // Add '+' if it's missing and ensure the number starts with a country code
        const formattedPhoneNumber = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;

        const message = await client.messages.create({
            body: `Your OTP for verification is ${otp}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: formattedPhoneNumber
        });
        console.log('SMS sent successfully:', message.sid);
    } catch (error) {
        console.error('Error sending SMS:', error);
    }
};

module.exports = sendSMSOTP;
