
const asyncHandler = require('express-async-handler')
// const Tweet = require('../models/tweetModel')
// const Keyword = require('../models/keywordModel')
// const University = require('../models/universityModel')
const Test = require('../models/testModel')

// perform query here
const getTests = asyncHandler(async (req, res) => {
    const tests = await Test.find();
    // const tweets = await Tweet.find();
    // const keywords = await Keyword.find();
    // const universities = await University.find();
    
    res.status(200).json(tests)
    // res.status(200).json(tweets)
    // res.status(200).json(keywords)
    // res.status(200).json(universities)
})

module.exports = { 
    getTests
  }