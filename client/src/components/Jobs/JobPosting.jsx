import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ApiRoutes } from '../../Utils/ApiRoutes';

function JobPosting() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        experienceLevel: '',
        endDate: ''
    });
    

    const { title, description, experienceLevel, endDate } = formData;

    // Get the company name from local storage
       
    
    const [companyName, setCompanyName] = useState('');

    useEffect(() => {
        // Get the company name from the logged-in user's details stored in localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setCompanyName(parsedUser.companyName); // Assuming 'companyName' is a field in user data
        }
    }, []);

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token'); // Ensure the JWT token is stored in local storage
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };

            // Combine form data with company name
            const jobData = {
                ...formData,
                companyName // Include the company name in the request body
            };

            const res =  await axios.post(ApiRoutes.postJob, jobData, config);

            console.log(res.data);
            // Redirect or further actions
        } catch (err) {
            console.error(err.response?.data || 'Error posting job');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="w-full max-w-md bg-white shadow-lg p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-center mb-6">Post a Job</h2>
                <form onSubmit={onSubmit} className="space-y-4">

                    {/* Job Title */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="title">Job Title</label>
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={onChange}
                            placeholder="Enter Job Title"
                            required
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Job Description */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="description">Job Description</label>
                        <textarea
                            name="description"
                            value={description}
                            onChange={onChange}
                            placeholder="Enter Job Description"
                            required
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Experience Level */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="experienceLevel">Experience Level</label>
                        <input
                            type="text"
                            name="experienceLevel"
                            value={experienceLevel}
                            onChange={onChange}
                            placeholder="Select Experience Level"
                            required
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* End Date */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="endDate">End Date</label>
                        <input
                            type="date"
                            name="endDate"
                            value={endDate}
                            onChange={onChange}
                            required
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
}

export default JobPosting;
