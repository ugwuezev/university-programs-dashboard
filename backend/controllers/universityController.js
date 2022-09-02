const asyncHandler = require('express-async-handler');
const University = require('../models/universityModel');

// query to retireve all universities
const getUniversities = asyncHandler(async (req, res) => {
    
    const universities = await University.find();

    res.status(200).json(universities);
})


// query to get university by id
const getUniversity= asyncHandler(async (req, res) => {
    const university = await University.findById(req.params._id)

    if (!university) {
        res.status(400)
        throw new Error("University not found")
    }

    res.status(200).json(university);
})


// query to add a new university
const addUniversity = asyncHandler(async(req, res) => {
    if (!req.body.full_name) {
        res.status(400)
        throw new Error("Please add the name of the university")
    }

    if (!req.body.twitter_name) {
        res.status(400)
        throw new Error("Please add the name of the university as seen on their twitter page")
    }

    if (!req.body.twitter_handle) {
        res.status(400)
        throw new Error("Please add the university twitter handle together with the @ sign")
    }

    if (!req.body.twitter_avi_link) {
        res.status(400)
        throw new Error("Please add the link to the university profile picture")
    }
    
    // parameters
    const full_name = req.body.full_name;
    const twitter_name = req.body.twitter_name;
    const twitter_handle = req.body.twitter_handle;
    const twitter_avi_link = req.body.twitter_avi_link;

    dataObject = {full_name, twitter_name, twitter_handle, twitter_avi_link};

    /* dataObject = {"full_name": full_name, "twitter_name":twitter_name, "twitter_handle":twitter_handle, "twitter_avi_link":twitter_avi_link};
    console.log(dataObject) */

    const university = await University.create(dataObject);

    
    res.status(200).json(university)
})


// query to update university details
const updateUniversity= asyncHandler(async (req, res) => {
    const university = await University.findById(req.params._id)

    if (!university) {
        res.status(400)
        throw new Error("University not found")
    }

    const updatedUniversity = await University.findByIdAndUpdate(req.params._id, req.body, {
        new: true,
    })

    res.status(200).json(updatedUniversity);
})


// query to remove university
const deleteUniversity = asyncHandler(async (req, res) => {
    const university = await University.findById(req.params._id)

    if (!university) {
        res.status(400)
        throw new Error("University not found")
    }

    await university.remove()

    res.status(200).json({ id: req.params._id })
})


module.exports = { 
    getUniversities,
    getUniversity,
    addUniversity,
    updateUniversity,
    deleteUniversity,
  }