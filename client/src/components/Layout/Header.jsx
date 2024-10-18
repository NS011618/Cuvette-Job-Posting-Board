import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaCog, FaFileAlt, FaQuestionCircle } from 'react-icons/fa'; // Icons for dropdown

function Header({ isLoggedIn, setIsLoggedIn }) {
    const [showDropdown, setShowDropdown] = useState(false); // Dropdown visibility state
    const [userName, setUserName] = useState(''); // State to hold user name
    const navigate = useNavigate(); // For navigation
    const dropdownRef = useRef(null); // To reference the dropdown element

    // Handle Logout
    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token from localStorage
        localStorage.removeItem('user'); // Remove user data
        setIsLoggedIn(false); // Update login state
        navigate('/login'); // Redirect to the login page
    };

    // Retrieve the user name from localStorage on component mount
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUserName(parsedUser.name); // Assuming 'name' field exists in the user object
        }
    }, [isLoggedIn]);

    // Toggle the dropdown
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Close the dropdown if the clicked element is not inside the dropdown
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        // Add event listener for clicks outside
        document.addEventListener('mousedown', handleClickOutside);

        // Clean up the event listener on unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="flex justify-between items-center px-6 py-4 bg-white border-b-2 w-full">
            <div className="flex items-center space-x-2">
                {/* Logo with consistent spacing */}
                <Link to={isLoggedIn ? '/job-posting' : '/'} className="no-underline text-xl font-bold">
                    <span className="text-blue-500">C</span>
                    <span className="text-black">uvette</span>
                </Link>
            </div>

            <div className="flex items-center space-x-6">
                {/* Contact Link (Always Visible) */}
                <Link to="/contact" className="text-md text-black hover:underline transition duration-300 ease-in-out">
                    Contact
                </Link>

                {/* User section */}
                {isLoggedIn ? (
                    <div className="relative">
                        <div onClick={toggleDropdown} className="flex items-center cursor-pointer">
                            <img
                                src="https://via.placeholder.com/150"
                                alt="Profile"
                                className="w-10 h-10 rounded-full"
                            />
                            <span className="ml-2 font-semibold">{userName}</span>
                            <span className="ml-2">
                                {/* Dropdown arrow */}
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </span>
                        </div>

                        {/* Dropdown Menu */}
                        {showDropdown && (
                            <div
                                ref={dropdownRef} // Assign reference to the dropdown
                                className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-10"
                            >
                                <Link to="/account-settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                    <FaCog className="inline mr-2" />
                                    Account Settings
                                </Link>
                                
                                <hr />
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                >
                                    <FaSignOutAlt className="inline mr-2" />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <nav>
                        <Link
                            to="/login"
                            className="text-sm text-black font-bold px-4 py-2 hover:underline transition duration-300 ease-in-out"
                        >
                            Login
                        </Link>
                    </nav>
                )}
            </div>
        </header>
    );
}

export default Header;
