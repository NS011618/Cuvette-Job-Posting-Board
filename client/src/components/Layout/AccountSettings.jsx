import React, { useState, useEffect } from 'react';
import axios from 'axios'; // For making API requests

function AccountSettings() {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phone: '',
    });

    const [loading, setLoading] = useState(true); // Show loader while fetching data
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [editField, setEditField] = useState(null); // To handle individual field edits

    // Fetch user data from localStorage or backend on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                
                // Fetch user data from backend using token
                const res = await axios.get('http://localhost:5000/api/auth/user', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                

                setUserData({
                    name: res.data.name,
                    email: res.data.email,
                    phone: res.data.phone,
                });
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Error fetching user details');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const { name, email, phone } = userData;

    const handleEdit = (field) => {
        setEditField(field);
    };

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSave = async (field) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put('http://localhost:5000/api/auth/update', { [field]: userData[field] }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSuccess('Profile updated successfully');
            setEditField(null);
        } catch (err) {
            console.error(err);
            setError('Error updating profile');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="w-full max-w-md bg-white shadow-lg p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-center mb-6">Account Settings</h2>

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        {/* Success or Error Message */}
                        {success && <p className="text-green-500">{success}</p>}
                        {error && <p className="text-red-500">{error}</p>}

                        {/* Name */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2">Name</label>
                            {editField === 'name' ? (
                                <div>
                                    <input
                                        type="text"
                                        name="name"
                                        value={name}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button onClick={() => handleSave('name')} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
                                        Save
                                    </button>
                                </div>
                            ) : (
                                <div className="flex justify-between items-center">
                                    <p>{name}</p>
                                    <button onClick={() => handleEdit('name')} className="text-blue-500 hover:underline">Edit</button>
                                </div>
                            )}
                        </div>

                        {/* Email */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2">Email</label>
                            {editField === 'email' ? (
                                <div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button onClick={() => handleSave('email')} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
                                        Save
                                    </button>
                                </div>
                            ) : (
                                <div className="flex justify-between items-center">
                                    <p>{email}</p>
                                    <button onClick={() => handleEdit('email')} className="text-blue-500 hover:underline">Edit</button>
                                </div>
                            )}
                        </div>

                        {/* Phone */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2">Phone</label>
                            {editField === 'phone' ? (
                                <div>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={phone}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button onClick={() => handleSave('phone')} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
                                        Save
                                    </button>
                                </div>
                            ) : (
                                <div className="flex justify-between items-center">
                                    <p>{phone}</p>
                                    <button onClick={() => handleEdit('phone')} className="text-blue-500 hover:underline">Edit</button>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default AccountSettings;
