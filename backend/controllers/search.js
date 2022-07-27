
const Keyword = require("../keywordList.js");
const University = require('../UniversityList.js');

const searchKeyword = async(req, res) => {
    const { q } = req.query;
  
    const keys = ["index", "title"];
  
    const search = (data) => {
      return data.filter((item) =>
        keys.some((key) => item[key].toLowerCase().includes(q))
      );
    };
  
    q ? res.json(search(Keyword).slice(0, 20)) : res.json(Keyword.slice(0, 20));
  };

const searchUniversity = async(req, res) => {
    const { q } = req.query;

    const keys = ["index", "title"];

    const search = (data) => {
        return data.filter((item) =>
        keys.some((key) => item[key].toLowerCase().includes(q))
        );
    };

    q ? res.json(search(University).slice(0, 20)) : res.json(University.slice(0, 20));
  };


module.exports.searchKeyword = searchKeyword;
module.exports.searchUniversity = searchUniversity;