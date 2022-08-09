
const asyncHandler = require('express-async-handler')
const Tweet = require('../models/tweetModel')

// perform query here
const getTweets = asyncHandler(async (req, res) => {
    const tweets = await Tweet.find()

    res.status(200).json(tweets)
})

module.exports = { 
    getTweets
  }
