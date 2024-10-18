import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa'; // Importing an example home icon

function Sidebar() {
  return (
    <aside className="w-16 bg-white h-screen flex flex-col items-center pt-4 shadow-lg  border-r-2">
      {/* Home Icon */}
      <Link to="/job-posting" className="mb-4 text-gray-500 hover:text-blue-500 transition duration-300">
        <FaHome size={24} />
      </Link>
      {/* Add more icons here */}
    </aside>
  );
}

export default Sidebar;
