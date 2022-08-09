
const mongoose = require('mongoose');

const testModel = mongoose.Schema(
    {
        tweet_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
    },
    {
        tweeter_handle: {
            type: String,
        }
    },
    {
        university_name: {
            type: String,
        }
    },
    {
        university_avi_link: {
            type: String,
        }
    },
    {
        tweet_content: {
            type: String,
        }
    },
    {
        time_posted: {
            type: Date,
        }
    }
)

module.exports = mongoose.model('Test', testModel)