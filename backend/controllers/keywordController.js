const asyncHandler = require('express-async-handler')
const Keyword = require('../models/keywordModel')

// query to retireve all keywords
const getKeywords = asyncHandler(async (req, res) => {

    const keywords = await Keyword.find();
    
    res.status(200).json(keywords)
})


// query to get keyword by id
const getKeyword= asyncHandler(async (req, res) => {
    const keyword = await Keyword.findById(req.params._id)

    if (!keyword) {
        res.status(400)
        throw new Error("Keyword not found")
    }

    res.status(200).json(keyword);
})


// query to add a new keyword
const addKeyword = asyncHandler(async (req, res) => {
    if (!req.body.name) {
        res.status(400)
        throw new Error("Please add the keyword name")
    }

    const keyword = await Keyword.create({
        name: req.body.name,
    })
    
    res.status(200).json(keyword)
})


// query to update keyword details
const updateKeyword= asyncHandler(async (req, res) => {
    const keyword = await Keyword.findById(req.params._id)

    if (!keyword) {
        res.status(400)
        throw new Error("Keyword not found")
    }

    const updatedKeyword = await Keyword.findByIdAndUpdate(req.params._id, req.body, {
        new: true,
    })

    res.status(200).json(updatedKeyword);
})


// query to remove keyword
const deleteKeyword = asyncHandler(async (req, res) => {
    const keyword = await Keyword.findById(req.params._id)

    if (!keyword) {
        res.status(400)
        throw new Error("Keyword not found")
    }

    await keyword.remove()

    res.status(200).json({ id: req.params._id })
})

module.exports = { 
    getKeywords,
    getKeyword,
    addKeyword,
    updateKeyword,
    deleteKeyword,
  }