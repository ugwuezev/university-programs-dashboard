const mongoose = require('mongoose');

const universitySchema = mongoose.Schema(
    
    {
        full_name: {
            type: String,
            required: true
        },
    
        twitter_name: {
            type: String,
            required: true
        },

        twitter_handle: {
            type: String,
            required: true
        },
        
        twitter_avi_link: {
            type: String,
            required: true
        }
    }
)

module.exports = mongoose.model('University', universitySchema)