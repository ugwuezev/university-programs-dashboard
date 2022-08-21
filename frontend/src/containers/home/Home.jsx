import React, { useState, useEffect } from 'react';
import './home.css';
import { Navbar, Footer } from '../../components';
import { Avatar } from '@mui/material';
import axios from "axios";
import Pagination from '@mui/material/Pagination';
import usePagination from "./Pagination";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
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
    const tweet_apiUrl = `http://localhost:5000/tweets`;
    const university_apiUrl = `http://localhost:5000/universities`;
    const keyword_apiUrl = `http://localhost:5000/keywords`;

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

  const filterFunction = (button_name) => {

    if (button_name === "" || button_name === "All") {
      setFilterItems(tweets);
      return;
    } 
    else {
      const filteredData = tweets.filter((filterItem) => filterItem.university_name === button_name || filterItem.tweet_content.toLowerCase().includes(button_name.toLowerCase()));
      setFilterItems(filteredData);
      return;
    }

  };

  // sort function
  const sortByTime = () => {
    sortItems.sort((sortItemA, sortItemB) => {
      if (sorted.reversed) {
        return sortItemB.full_name.localeCompare(sortItemA.time_posted);
      }
      return sortItemA.full_name.localeCompare(sortItemB.time_posted);
    });
    setTweets(sortItems);
    setSorted({ sorted: "name", reversed: !sorted.reversed });
  };

  const renderArrow = () => {
    if (sorted.reversed) {
      return <FaArrowUp />;
    }
    return <FaArrowDown />;
  };

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
              onClick={sortByTime}
            >
              <SortIcon />
              {sorted.sorted === "name"
              ? renderArrow()
              : null}
            </IconButton>
          </Paper>
        </div>
  

    {/* 
          <div>
          <TextField 
            id="outlined-basic" 
            label="University/Keyword"
            variant="outlined"
            onChange={(e) => setQ(e.target.value)}
            value={q}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                    <SearchIcon />
                </InputAdornment>
              )
            }}
          />
         </div> */}


{/* 
            <input
              id="input-with-icon-adornment"
              className="h_search_input"
              placeholder="Search by University/Keyword"
              onChange={(e) => setQ(e.target.value)}
              value={q}
              endAdornment = {
                <InputAdornment position="end">
                    <SearchIcon />
                </InputAdornment>
              }
            /> */}

          
{/* 
          <div>
            <Button 
              variant="contained" 
              onClick={sortByTime}
            >
              Sort
              {sorted.sorted === "name"
              ? renderArrow()
              : null}
            </Button>
            
          </div> */}


         {/*  <div>
            <MyButton path="/" name="Sort" />
          </div> */}


        </div>
      </div>
      
      <div className="h_content">

        <div className="h_content_filter">
          {Object.keys((filterParam)).map((category) => 
            <div key={category}>
              <div className="h_content_filter_category">
              <h2 >{category}</h2>
              <span><KeyboardArrowDownIcon /></span>
            </div>
              {filterParam[category].map((item) => (
                <div className="h_content_filter_span">
                  <input className="h_content-filter_input" name={category} value={item} type="radio" onClick={()=> filterFunction(item)} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          {search(_DATA.currentData()).map((tweet) => (
            <div className="h_content_tweet" key={tweet._id} >
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
                        @{tweet.tweeter_handle} {tweet.time_posted}
                      </span>
                    </h3>
                  </div>
                  <div className="h_content_tweet_headerDescription">
                    <p>
                      {tweet.tweet_content}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
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