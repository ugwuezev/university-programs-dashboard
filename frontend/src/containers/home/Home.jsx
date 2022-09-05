import React, { useState, useEffect } from 'react';
import './home.css';
import { Navbar, Footer } from '../../components';
import { Avatar } from '@mui/material';
import axios from "axios";
import Pagination from '@mui/material/Pagination';
import usePagination from "./Pagination";
//import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
//import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from '@mui/icons-material/Search';
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import Button from '@mui/material/Button';
//import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SortIcon from '@mui/icons-material/Sort';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
//import Typography from '@mui/material/Typography';

import { CommonButton } from '../../components';
//import { Link } from 'react-router-dom';

// for tweet details
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PublishIcon from "@mui/icons-material/Publish";

import moment from 'moment';

const Home = () => {

  // fetching data from api and making it to be readily available
  const [tweets, setTweets] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [filterItems, setFilterItems] = useState(tweets);
  const [sortItems, setSortItems] = useState(tweets);
  const [sorted, setSorted] = useState({ sorted: "id", reversed: false });

  useEffect(() => {
    document.title = "Twitter Feed";
    const tweet_apiUrl = process.env.REACT_APP_ALL_TWEETS;
    const university_apiUrl = process.env.REACT_APP_ALL_UNIVERSITIES;
    const keyword_apiUrl = process.env.REACT_APP_ALL_KEYWORDS;

    const fetchTweets = async () => {
      const res = await axios.get(tweet_apiUrl);
      setTweets(res.data);
      setFilterItems(res.data);
      setSortItems(res.data);
    }

    const fetchUniversities = async () => {
      const res = await axios.get(university_apiUrl);
      setUniversities(res.data);
      }

    const fetchKeywords = async () => {
      const res = await axios.get(keyword_apiUrl);
      setKeywords(res.data);
      }
    
    fetchTweets();
    fetchUniversities();
    fetchKeywords();
  }, [] );
  
  // handling pagination
  let [page, setPage] = useState(1);
  const PER_PAGE = 20;

  const count = Math.ceil(tweets.length / PER_PAGE);
  const _DATA = usePagination(filterItems, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
  
  // search function
  const [q, setQ] = useState("");
  const [searchParam] = useState(["university_name", "tweet_content"]);
  
  const search = (data) => {
    
    return data.filter((item) => {
      return searchParam.some((newItem) => {
        return (
          item[newItem]
          .toString()
          .toLowerCase()
          .indexOf(q.toLowerCase()) > -1
        );
      });
    });
  }

  // filter categories
  const filterParam = {
    University: ["All", ...new Set(universities.map(university => university.twitter_name))],
    Keyword: ["All", ...new Set(keywords.map(keyword => keyword.name))],
    Time: ["All", "Past 24 Hours", "Past Week", "Past Month", "Past Year"]
  };
  
  // filtering date
  const dateItems = (filterItem) => {
    const currentDate = moment();
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
  
  // filter function
  const filterFunction = (button_name) => {

    if (button_name === "" || button_name === "All") {
      setFilterItems(tweets);
      return;
    } 
    else {
      const filteredData = tweets.filter((filterItem) => 
        filterItem.university_name === button_name || 
        filterItem.tweet_content.toLowerCase().includes(button_name.toLowerCase()) ||
        dateItems(filterItem) === button_name 
        );
      setFilterItems(filteredData);
      return;
    }

  };

  // sort function
  const sortByDate = () => {
    sortItems.sort((sortItemA, sortItemB) => {
      if (sorted.reversed) {
        return sortItemB.time_posted.localeCompare(sortItemA.time_posted);
      }
      return sortItemA.time_posted.localeCompare(sortItemB.time_posted);
    });
    setTweets(sortItems);
    setSorted({ sorted: "date", reversed: !sorted.reversed });
  };

  const renderArrow = () => {
    if (sorted.reversed) {
      return <FaArrowUp />;
    }
    return <FaArrowDown />;
  };


  // toggle button
  /* const [expand, setExpand] = useState(false);
  const toggleAcordion = () => {
    setExpand((prev) => !prev);
  }; */

  return (
    <div className="h_grid">
       
      <div className="h_navbar gradient__bg">
        <Navbar />
      </div>

      <div className="h_header">
        <h1>Twitter Feed</h1>
      </div>
      
      <div className="h_search">

        <div className="h_search_filter">
          <div>
            <Button 
              variant="contained"
            >
              Clear Filter
            </Button>
          </div>
        </div>
            
        <div className="h_search_searchbar_sort">

        <div>
          <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search university or keyword"
              inputProps={{ 'aria-label': 'search google maps' }}
              onChange={(e) => setQ(e.target.value)}
              value={q}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton 
              color="primary" 
              sx={{ p: '10px' }} 
              aria-label="directions"
              onClick={sortByDate}
            >
              <SortIcon />
              {sorted.sorted === "date"
              ? renderArrow()
              : null}
            </IconButton>
          </Paper>
        </div>

        </div>
        <div className="h_search_bookmark">
          <h2>Saved Tweets</h2>
        </div>

        
      </div>
      
      <div className="h_content">

          <div className="h_content_filter">
           
            {Object.keys((filterParam)).map(category => 
              <div key={category}>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                    <div className="h_content_filter_category">
                      <h3>{category}</h3>
                    </div>
                  </AccordionSummary>

                {filterParam[category].map(item => (
                  <AccordionDetails>
                    <div className="h_content_filter_span">
                      <input className="h_content-filter_input" name={category} value={item} type="radio" onClick={()=> filterFunction(item)} />  
                      <span>{item}</span>
                    </div>
                  </AccordionDetails>
                ))}

                </Accordion>
              </div>
            )}

          </div>

        <div className="h_content_tweet">
          {search(_DATA.currentData()).map((tweet) => (
            <div className="h_content_tweet_main" key={tweet._id} >
              <div className="h_content_tweet_avatar">
                <Avatar
                  src = {tweet.university_avi_link}
                  alt = "university avi"
                  sx={{ width: 50, height: 50}}
                />
              </div>
              <div className="h_content_tweet_body">
                <div className="h_content_tweet_header">
                  <div className="h_content_tweet_headerText">
                    <h3>
                      {tweet.university_name} 
                      <span className="h_content_tweet_headerSpecial">
                        @{tweet.tweeter_handle} {tweet.time_posted.split("T")[0]}
                      </span>
                    </h3>
                  </div>
                  <div className="h_content_tweet_headerDescription">
                    <p text-align="left">
                      {tweet.tweet_content}
                    </p>
                  </div>
                </div>

                <img 
                  src="https://www.simplilearn.com/ice9/free_resources_article_thumb/IBM_Leading_in_AI_Innovations_What_the_Company_is_Working_on_Now.jpg" 
                  alt="" 
                  width="150" 
                  height="100"
                />
                
                <div className="h_content_tweet_footer">
                  <span>
                    <ChatBubbleOutlineIcon fontSize="small" />
                    200
                  </span>
                  <span>
                    <RepeatIcon fontSize="small" />
                    500
                  </span>
                  <span>
                    <FavoriteBorderIcon fontSize="small" />
                    2450
                  </span>
                  <span>
                    <a href="https://twitter.com" target="_blank" rel="noreferrer">
                      <PublishIcon fontSize="small" />
                    </a>
                  </span>
                  <span>
                    <CommonButton onClick={''}>Save</CommonButton>
                  </span>
                </div>
                 
              </div>
            </div>
          ))}
        </div>

        <div className="h_content_bookmark">
          <h4>
            List of of saved tweets
          </h4>
        </div>

      </div>

      <div className="h_pagination">
        <Pagination
          count={count}
          size="large"
          page={page}
          variant="outlined"
          color="primary"
          shape="rounded"
          onChange={handleChange}
        />
      </div>

      <div className="h_footer">
        <Footer />
      </div>
    
    </div>
    
  );
}

export default Home;