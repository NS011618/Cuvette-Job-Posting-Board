import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate to handle redirection
import { ApiRoutes } from '../../Utils/ApiRoutes';

function Login({ handleLogin }) {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(''); // Handle login errors
    const navigate = useNavigate(); // Navigate after successful login
    const { email, password } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post(ApiRoutes.login, { email, password });

            // Save the JWT token to localStorage
            const { token } = res.data; // Assuming the response includes a token
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(res.data.user));

            console.log('Login successful:', res.data);

            // Call the handleLogin function and pass the token
            handleLogin(token);
            // Redirect to a protected page after successful login
            navigate('/job-posting'); // Replace with your route

        } catch (err) {
            console.error('Login failed:', err.response.data);
            setError(err.response.data.msg || 'Login failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="w-full max-w-md bg-white shadow-lg p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

                {/* Display error message if any */}
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form onSubmit={onSubmit} className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        placeholder="Email Address"
                        required
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        placeholder="Password"
                        required
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
