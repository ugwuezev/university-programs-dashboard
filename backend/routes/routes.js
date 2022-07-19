const express = require('express');

const Keyword = require("../keywordList.js");
const University = require('../UniversityList.js');
//const fs = require("fs");

/* const search = require('../controllers/search.js');
let keyword = search.searchKeyword;
let university = search.searchUniversity;
 */

const router = express.Router();

/* router.post('/keywords', keyword)
router.post('/universities', university) */

router.get('/', (req, res) => {
    res.status(200).json({ message: "Testing the routes" });
    });

    
router.get("/keywords", (req, res) => {
    const { q } = req.query;
  
    const keys = ["index", "title"];
  
    const search = (data) => {
      return data.filter((item) =>
        keys.some((key) => item[key].toLowerCase().includes(q))
      );
    };
  
    q ? res.json(search(Keyword).slice(0, 25)) : res.json(Keyword.slice(0, 25));
  });


router.get("/universities", (req, res) => {
    const { q } = req.query;
  
    const keys = ["index", "title"];
  
    const search = (data) => {
      return data.filter((item) =>
        keys.some((key) => item[key].toLowerCase().includes(q))
      );
    };
  
    q ? res.json(search(University).slice(0, 25)) : res.json(University.slice(0, 25));
  });


// will match any other path
router.use('/', (req, res) => {
    res.status(404).json({ error: "page not found" });
});


module.exports = router;