const express = require('express');
const connectDB = require('./config/db');
const path = require("path");
const cors = require('cors'); // CORS Middleware
require('dotenv').config();


const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON requests
app.use(express.json());

// Enable CORS to allow requests from frontend (localhost:3000)
app.use(cors({ origin: '*' }));



// Define Routes
app.use('/api/auth', require('./routes/authRoutes')); // Authentication routes
app.use('/api/jobs', require('./routes/jobRoutes'));  // Job routes

if(process.env.NODE_ENV=="production"){
    app.use(express.static(path.join(__dirname,"client/build")));
    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"client/build","index.html"));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
