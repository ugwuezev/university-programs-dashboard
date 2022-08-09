const asyncHandler = require('express-async-handler')
const University = require('../models/universityModel')

// perform query here
const getUniversities = asyncHandler(async (req, res) => {
    const universities = await University.find()

    res.status(200).json(universities)
})

module.exports = { 
    getUniversities
  }