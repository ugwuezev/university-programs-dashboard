import React, { useState, useEffect } from 'react';
import './home.css';
import { Navbar, Footer, MyButton } from '../../components';
import { Avatar } from '@mui/material';
import axios from "axios";
import Pagination from '@mui/material/Pagination';
import usePagination from "./Pagination";

const Home = () => {

  // fetching data from api
  const [tweets, setTweets] = useState([])

  useEffect(() => {
    document.title = "Twitter Feed";
    const apiUrl = `http://localhost:5000/tweets`;

    const fetchTweets = async () => {
    const res = await axios.get(apiUrl);
    setTweets(res.data);
  }
 
    fetchTweets()
  }, [] );
  
  // handling pagination
  let [page, setPage] = useState(1);
  const PER_PAGE = 5;

  const count = Math.ceil(tweets.length / PER_PAGE);
  const _DATA = usePagination(tweets, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
  
  // search function
  const [q, setQ] = useState("");

  const [searchParam] = useState(["university_name", "tweet_content" ]);
  
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

  const filters = {
    University: ["All", "University College London", "Imperial", "Durham Universiy", "University of Glasgow"],
    Keyword: ["All", "Artificial intelligence", "Quantum", "Lecture", "Watson", "Analysis"],
    Time: ["All Time", "Past  24 Hours", "Past Week", "Past Month", "Past Year"]
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
                <MyButton path="/" name="Clear Filter" />
              </div>
            </div>
            
            <div className="h_search_searchbar_sort">
              <div>
                <input
                  className="h_search_input"
                  placeholder="Search by University/Keyword"
                  onChange={(e) => setQ(e.target.value)}
                  value={q}
                />
              </div>
              <div>
                <MyButton path="/" name="Sort" />
              </div>
              
            </div>
        </div>
      
        <div className="h_content">

          <div className="h_content_filter">
            
            {Object.keys((filters)).map(category => 
              <div key={category}>
                <h2>{category}</h2>
                {filters[category].map(item => (
                  <div>
                    <input value={item} type="radio" />
                      <span>{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

         <div>
            
            {search(_DATA.currentData()).map(tweet => (
              <div key={tweet._id} className="h_content_tweet">
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