
const asyncHandler = require('express-async-handler');
const University = require('../models/universityModel')

const ReadData = asyncHandler(async (req, res) => {
    const response = await University.find().exec();
    res.json(response)
});

module.exports = { 
    ReadData
  }