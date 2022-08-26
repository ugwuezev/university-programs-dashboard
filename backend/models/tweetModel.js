
const mongoose = require('mongoose');

const tweetModel = mongoose.Schema(
    {
        tweet_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
    },
    {
        university_avi_link: {
            type: String,
        }
    },
    {
        university_name: {
            type: String,
        }
    },
    {
        tweeter_handle: {
            type: String,
        }
    },
    {
        time_posted: {
            type: Date,
        }
    },
    {
        tweet_content: {
            type: String,
        }
    },
    {
        retweet_count: {
            type: String,
        }
    },
    {
        likes_count: {
            type: String,
        }
    },
    {
        tweet_url: {
            type: String,
        }
    }
    
)

module.exports = mongoose.model('Tweet', tweetModel)