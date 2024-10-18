import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router v6

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '', // Added password field
        companyName: '',
        employeeSize: ''
    });
    const [error, setError] = useState('');  // For displaying error messages
    const navigate = useNavigate();  // useNavigate hook for navigation

    const { name, email, phone, password, companyName, employeeSize } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            const body = JSON.stringify({ name, email, phone, password, companyName, employeeSize });
            const res = await axios.post('http://localhost:5000/api/auth/register', body, config);

            // Check if registration was successful
            if (res.status === 200) {
                const { emailOTP, phoneOTP } = res.data;
                //console.log('Email OTP:', emailOTP);
                //console.log('Phone OTP:', phoneOTP);

                // Redirect to OTP Verification page and pass OTP values
                navigate('/verify', { state: { emailOTP, phoneOTP, email, phone } });
            } else {
                setError('Registration failed. Please try again.');
            }

        } catch (err) {
            // Check if err.response.data is an object and extract its message
            if (err.response && typeof err.response.data === 'object' && err.response.data.msg) {
                setError(err.response.data.msg);
            } else {
                setError('An error occurred during registration');
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-end bg-white">
            <div className="w-full max-w-md bg-white shadow-lg p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-center mb-2">Sign Up</h2>

                {/* Display error if there's any */}
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form onSubmit={onSubmit} className="space-y-4">
                    <div className="relative">
                        <label className="absolute left-3 top-3 text-gray-500">
                            <i className="fas fa-user"></i>
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={onChange}
                            placeholder="Name"
                            required
                            className="w-full pl-10 pr-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="relative">
                        <label className="absolute left-3 top-3 text-gray-500">
                            <i className="fas fa-phone-alt"></i>
                        </label>
                        <input
                            type="text"
                            name="phone"
                            value={phone}
                            onChange={onChange}
                            placeholder="Phone no."
                            required
                            className="w-full pl-10 pr-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="relative">
                        <label className="absolute left-3 top-3 text-gray-500">
                            <i className="fas fa-building"></i>
                        </label>
                        <input
                            type="text"
                            name="companyName"
                            value={companyName}
                            onChange={onChange}
                            placeholder="Company Name"
                            required
                            className="w-full pl-10 pr-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="relative">
                        <label className="absolute left-3 top-3 text-gray-500">
                            <i className="fas fa-envelope"></i>
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={onChange}
                            placeholder="Company Email"
                            required
                            className="w-full pl-10 pr-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="relative">
                        <label className="absolute left-3 top-3 text-gray-500">
                            <i className="fas fa-users"></i>
                        </label>
                        <input
                            type="text"
                            name="employeeSize"
                            value={employeeSize}
                            onChange={onChange}
                            placeholder="Employee Size"
                            required
                            className="w-full pl-10 pr-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Password Field */}
                    <div className="relative">
                        <label className="absolute left-3 top-3 text-gray-500">
                            <i className="fas fa-lock"></i>
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            placeholder="Password"
                            required
                            className="w-full pl-10 pr-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <p className="text-sm text-gray-500 text-center">
                        By clicking on proceed you will accept our 
                        <button
                            type="button"
                            onClick={() => alert('Terms and Conditions not available yet.')}
                            className="text-blue-500 underline"
                        >
                            Terms & Conditions
                        </button>
                    </p>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Proceed
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register;
