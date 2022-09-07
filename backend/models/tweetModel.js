
const mongoose = require('mongoose');

const tweetModel = mongoose.Schema(
    
    {
        university_avi_link: {
            type: String,
        },

        university_name: {
            type: String,
        },

        tweeter_handle: {
            type: String,
        },
    
        time_posted: {
            type: Date,
        },
    
        tweet_content: {
            type: String,
        },
   
        tweet_image: {
            type: String,
        },
    
        tweet_url: {
            type: String,
        },
    },
    
)

module.exports = mongoose.model('Tweet', tweetModel)