import React, { useState } from 'react';
import axios from 'axios'; // For making API requests
import { useLocation, useNavigate } from 'react-router-dom';
import { ApiRoutes } from '../../Utils/ApiRoutes';

function OTPVerification() {
    const [emailOTP, setEmailOTP] = useState('');
    const [phoneOTP, setPhoneOTP] = useState('');
    const [error, setError] = useState(''); // Error handling
    const navigate = useNavigate();
    const location = useLocation();

    // Extract email and phone from location state
    const { email, phone } = location.state || {};

    const verifyOTP = async () => {
        try {
            // Make a request to the server to verify the OTPs
            const res = await axios.post(ApiRoutes.verify, {
                email,  // Pass the user's email
                phone,  // Pass the user's phone number
                emailOTP,
                phoneOTP,
            });

            const { token } = res.data; // Get the JWT token from response
            localStorage.setItem('token', token); // Store token in localStorage

            // Redirect to Job Posting page after successful verification
            navigate('/job-posting');

        } catch (err) {
            console.error(err.response?.data);
            setError(err.response?.data?.msg || 'OTP verification failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="w-full max-w-md bg-white shadow-lg p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-center mb-6">OTP Verification</h2>
                <p className="text-sm text-center mb-4 text-gray-500">Please enter the OTPs sent to your email and phone</p>

                {/* Display error if there's any */}
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                {/* Email OTP Verification */}
                <div className="relative mb-4">
                    <input
                        type="text"
                        placeholder="Email OTP"
                        value={emailOTP}
                        onChange={e => setEmailOTP(e.target.value)}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Phone OTP Verification */}
                <div className="relative mb-4">
                    <input
                        type="text"
                        placeholder="Mobile OTP"
                        value={phoneOTP}
                        onChange={e => setPhoneOTP(e.target.value)}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button onClick={verifyOTP} className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                    Verify
                </button>
            </div>
        </div>
    );
}

export default OTPVerification;
