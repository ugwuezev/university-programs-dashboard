const asyncHandler = require('express-async-handler')
const Keyword = require('../models/keywordModel')

const getKeywords = asyncHandler(async (req, res) => {
    const keywords = await Keyword.find()

    res.status(200).json(keywords)
})

module.exports = { 
    getKeywords
  }