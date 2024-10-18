const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('Candidate', CandidateSchema);
