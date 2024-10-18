import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login, Register, Header, JobPosting, OTPVerification, Sidebar, AccountSettings, Contact} from "./components";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Global state for login

  // Check if the user is logged in by checking the token in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token"); // Check if JWT token is stored
    if (token) {
      setIsLoggedIn(true); // If token exists, set logged in
    } else {
      setIsLoggedIn(false); // Otherwise, set logged out
    }
  }, []);

  // Handle login (you can call this in the Login component)
  const handleLogin = (token) => {
    localStorage.setItem("token", token); // Save token to localStorage
    setIsLoggedIn(true); // Update login state
  };

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className="flex">
        {isLoggedIn && <Sidebar />} {/* Sidebar appears only when logged in */}
        <div className="flex-1 ">
          {" "}
          {/* Main content area */}
          <Routes>
            <Route
              path="/login"
              element={<Login handleLogin={() => setIsLoggedIn(true)} />}
            />
            <Route path="/" element={<Register />} />
            <Route path="/verify" element={<OTPVerification />} />
            <Route path="/job-posting" element={<JobPosting />} />
            <Route path="/account-settings" element={<AccountSettings />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
