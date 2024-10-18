const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    companyName: { type: String, required: true },
    employeeSize: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    emailOTP: { type: String },  // Field for storing email OTP
    phoneOTP: { type: String }   // Field for storing phone OTP
});

module.exports = mongoose.model('User', UserSchema);
