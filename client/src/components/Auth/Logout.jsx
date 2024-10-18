import React from 'react';
import { useHistory } from 'react-router-dom';

function Logout() {
    const history = useHistory();

    const handleLogout = () => {
        // Clear JWT token or session
        localStorage.removeItem('token');
        history.push('/login');
    };

    return (
        <button onClick={handleLogout} className="text-blue-500 hover:text-blue-700">
            Logout
        </button>
    );
}

export default Logout;
