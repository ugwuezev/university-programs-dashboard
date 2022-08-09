const Keyword = require("../keywordList.js");
const University = require('../UniversityList.js');

const searchKeyword = (req, res) => {
    const { q } = req.query;
    const keys = ["index", "title"];
  
    const search = (data) => {
      return data.filter((item) =>
        keys.some((key) => item[key].toLowerCase().includes(q))
      );
    };
  
    q ? res.json(search(Keyword).slice(0, 35)) : res.json(Keyword.slice(0, 35));
  };

const searchUniversity = (req, res) => {
    const { q } = req.query;
    const keys = ["index", "title"];

    const search = (data) => {
        return data.filter((item) =>
        keys.some((key) => item[key].toLowerCase().includes(q))
        );
    };

    q ? res.json(search(University).slice(0, 35)) : res.json(University.slice(0, 35));
  };


/* module.exports.searchKeyword = searchKeyword;
module.exports.searchUniversity = searchUniversity; */

module.exports = { 
  searchKeyword,
  searchUniversity
}