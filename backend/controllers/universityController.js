const asyncHandler = require('express-async-handler');
const University = require('../models/universityModel');
const UniList = require('./UniList');
//const ReadData = require('./ReadData')

// perform query here
const getUniversities = asyncHandler(async (req, res) => {
    
    const universities = await University.find();

    //console.log(universities);

    const { q } = req.query;

    //const universities = University.find({$regex: q})
    
    const keys = ["_id", "full_name", "twitter_name", "twitter_handle", "twitter_avi_link"];

    const search = (data) => {
        return data.filter((item) =>
        keys.some((key) => item[key].toLowerCase().includes(q))
        );
    };

    //q ? res.json(search(universities).slice(0, 35)) : res.json(universities.slice(0, 35));
    //q ? res.json(search(universities)) : res.json(universities);
    q ? res.json(search(UniList)) : res.json(UniList);
    //q ? res.json(search(ReadData)) : res.json(ReadData);
    //res.json(universities);
    //res.json(ReadData);
    //res.json(UniList);
})

module.exports = { 
    getUniversities
  }
