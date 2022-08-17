const asyncHandler = require('express-async-handler')
const Keyword = require('../models/keywordModel')

// perform query here
const getKeywords = asyncHandler(async (req, res) => {

    const keywords = await Keyword.find()
    //res.status(200).json(keywords)
    //console.log(keywords)

    // search functionality
    const keys = ["_id", "name"];
    const { q } = req.query;
    
    const search = (data) => {
        return data.filter((item) =>
        keys.some((key) => item[key].toLowerCase().includes(q))
        );
    };

    //q ? res.json(search(keywords).slice(0, 35)) : res.json(keywords.slice(0, 35));
    q ? res.json(search(keywords)) : res.json(keywords);

})

module.exports = { 
    getKeywords
  }