const mongoose = require('mongoose');

const universitySchema = mongoose.Schema(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
    },
    {
        full_name: {
            type: String,
            required: true,
        }
    },
    {
        twitter_name: {
            type: String,
            required: true,
        }
    },
    {
        twitter_handle: {
            type: String,
        }
    },
    {
        twitter_avi_link: {
            type: String,
        }
    },
)

module.exports = mongoose.model('University', universitySchema)