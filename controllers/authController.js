const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const sendEmailOTP = require('../utils/sendEmail');
const sendSMSOTP = require('../utils/sendSMS');

// Simulate OTP Generation
const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000).toString(); // Generates a 4-digit OTP
};

// Register User with OTP generation and send OTP via Email/SMS
exports.register = async (req, res) => {
    const { name, email, phone, password, companyName, employeeSize } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Generate OTPs for email and phone
        const emailOTP = generateOTP();
        const phoneOTP = generateOTP();

        // Encrypt password using bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user with the encrypted password and OTPs
        user = new User({
            name,
            email,
            phone,
            password: hashedPassword,
            companyName,
            employeeSize,
            emailOTP,  // Store the generated email OTP
            phoneOTP,  // Store the generated phone OTP
            isVerified: false
        });

        await user.save();

        // Send OTPs via Email and SMS
        await sendEmailOTP(email, emailOTP);  // Send Email OTP
        await sendSMSOTP(phone, phoneOTP);    // Send SMS OTP

        // Generate JWT token
        const payload = { user: { id: user.id } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;

            res.json({
                token,
                msg: 'Registration successful. OTP sent to email and phone.',
                emailOTP,  // For testing only. In production, you shouldn't send the OTP in the response.
                phoneOTP   // For testing only.
            });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};



// Login User
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Compare password with bcrypt
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Generate JWT token
        const payload = {
            user: {
                id: user.id,
                name: user.name,  // Add the user's name to the token payload
                email: user.email, // Add email if needed
                companyName: user.companyName,
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 3600 },
            (err, token) => {
                if (err) throw err;

                // Return both token and user details
                res.json({
                    token,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        companyName: user.companyName,
                    }
                });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};





// OTP Verification for email and phone
exports.verifyOTP = async (req, res) => {
    const { email, emailOTP, phone, phoneOTP } = req.body;

    try {
        // Find the user by email
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }

        // Check if the OTP matches (use the stored OTPs)
        if (user.emailOTP !== emailOTP || user.phoneOTP !== phoneOTP) {
            return res.status(400).json({ msg: 'Invalid OTPs' });
        }

        // Mark the user as verified
        user.isVerified = true;
        user.emailOTP = undefined;  // Clear OTP after successful verification
        user.phoneOTP = undefined;  // Clear OTP after successful verification
        await user.save();

        // Generate JWT token after successful verification
        const payload = { user: { id: user.id } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.json({ token, msg: 'OTP verified successfully!' });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};



// Get all registered users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclude passwords for security
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getUser = async (req, res) => {
    try {
        // Fetch user details from the database using the ID from the token
        const user = await User.findById(req.user.id).select('-password'); // Exclude the password
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user); // Send the user data back to the client
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


// Update User Details
exports.updateUser = async (req, res) => {
    const { name, email, phone } = req.body;

    try {
        let user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Update user fields
        user.name = name || user.name;
        user.email = email || user.email;
        user.phone = phone || user.phone;

        await user.save();

        res.json(user); // Return updated user data
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
