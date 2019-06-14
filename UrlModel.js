const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
    original_url: {
        type: String,
        lowercase: true,
        required: true,
        trim: true
    },
    short_code: {
        type: String,
        required: true,
        trim: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Url', UrlSchema);