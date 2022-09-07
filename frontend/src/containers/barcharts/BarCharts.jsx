import React, { useState, useEffect } from 'react';
import axios from "axios";
import moment from 'moment';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './barcharts.css';
import { Navbar, Footer, KeywordHits, KeywordByUniversity } from '../../components';

const BarCharts = () => {

  const [tweets, setTweets] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [filterItems, setFilterItems] = useState(tweets);

  useEffect(() => {
    document.title = "Bar Charts";
  
  // fetching tweets
  const tweet_apiUrl = process.env.REACT_APP_ALL_TWEETS;
  const fetchTweets = async () => {
    const res = await axios.get(tweet_apiUrl);
    setTweets(res.data);
    setFilterItems(res.data);
  }

  //fetching universities
  const university_apiUrl = process.env.REACT_APP_ALL_UNIVERSITIES;
  const fetchUniversities = async () => {
    const res = await axios.get(university_apiUrl);
    setUniversities(res.data);
    };

  //fetching keywords
  const keyword_apiUrl = process.env.REACT_APP_ALL_KEYWORDS;
  const fetchKeywords = async () => {
    const res = await axios.get(keyword_apiUrl);
    setKeywords(res.data);
    }

  fetchTweets();
  fetchUniversities();
  fetchKeywords()
 
}, [] );

// filter categories
const filterParam = {
  Time: ["All", "Past 24 Hours", "Past Week", "Past Month", "Past Year"]
};

// filtering date
const dateItems = (filterItem) => {
  const currentDate = moment();
  //console.log(filterItem);
  const item =  filterItem.time_posted.split("T")[0];

  if (moment(item).isSame(currentDate, 'day')) {
      return "Past 24 Hours"
  } else if (moment(item).isSame(currentDate, 'week')) {
      return "Past Week"
  } else if (moment(item).isSame(currentDate, 'month')) {
      return "Past Month"
  } else if (moment(item).isSame(currentDate, 'year')) {
      return "Past Year"
  } else {
      return "All Time"
  }
};

//filter function
const filterFunction = (button_name) => {

  if (button_name === "" || button_name === "All") {
    setFilterItems(tweets);
    return;
  } 
  else {
    const filteredData = tweets.filter((filterItem) => 
      dateItems(filterItem) === button_name 
      );
    setFilterItems(filteredData);
    return;
  }

};

  return (
    <div className="b_grid">

      <div className="b_navbar gradient__bg">
        <Navbar />
      </div>

      <div  className="b_header">
        <h1>Bar Charts Showing Keywords</h1>
      </div>

      <div className="b_content">
      
        <div className="b_content_filter">
          <div className="b_content_filter_clear">
            <Button variant="contained">
              Clear Filter
            </Button>
          </div>

          <div className="b_content_filter_filter">
          {Object.keys((filterParam)).map(category => 
            <div key={category}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                  <div className="b_content_filter_category">
                    <h3>{category}</h3>
                  </div>
                </AccordionSummary>

              {filterParam[category].map(item => (
                <AccordionDetails>
                  <div className="b_content_filter_span">
                    <input className="b_content-filter_input" name={category} value={item} type="radio" onClick={()=> filterFunction(item)} />  
                    <span>{item}</span>
                  </div>
                </AccordionDetails>
              ))}

              </Accordion>
            </div>
          )}
          </div>
        </div>

        <div className="b_content_countby_university">
          <h2>Number of keywords per university</h2>
          <KeywordByUniversity keywords={keywords} universities={universities} tweets={filterItems} />
        </div>

        <div className="b_content_keyword_hits">
          <h2>Number of hits per keyword</h2>
          <KeywordHits keywords={keywords} universities={universities} tweets={filterItems} />
        </div>
        
      </div>

      <div className="b_footer">
        <Footer />
      </div>
        
    </div>
  )
}

export default BarCharts;
