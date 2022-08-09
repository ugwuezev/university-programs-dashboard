import React, { useState, useEffect } from 'react';
import './home.css';
import { Navbar, Footer, MyButton, SearchInput } from '../../components';
import { Avatar, Stack } from '@mui/material';

const Home = () => {
  const [tweets, setTweets] = useState([])

  const apiUrl = "http://localhost:5000/tweets";
  const fetchTweets = async () => {
    const response = await fetch(apiUrl)
    const data = await response.json()
    setTweets(data)
  }

  useEffect(() => {
    document.title = "Tweets";
    fetchTweets()
  }, [] );

    const filters = {
      University: ["University College London", "Imperial", "Durham Universiy", "University of Glasgow"],
      Keyword: ["Artificial intelligence", "Quantum", "Lecture", "Watson", "Analysis"],
      Time: ["All Time", "Past  24 Hours", "Past Week", "Past Month", "Past Year"]
    };


  return (
    <div className="h_grid">
       
        <div className="h_navbar gradient__bg">
          <Navbar />
        </div>

        <div className="h_header">
          <h1>Matching Tweets</h1>
        </div>
        
        <div className="h_search">
            <div className="h_search_item">
              <SearchInput  placeholder="Search Keyword & University" />
            </div>
            <div className="h_search_item">
              <MyButton path="/" name="Clear Filter" />
            </div>
            <div className="h_search_item">
              <MyButton path="/" name="Sort" />
            </div>
        </div>
      
        <div className="h_content">

          <div className="h_grid_item">
            <div className="h_grid_item_filter">
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
          </div>

          <div className="h_grid_item">
              {tweets.map(tweet => 
                  <div key={tweet._id}>
                    <Stack>
                      <Avatar
                        src = {tweet.university_avi_link}
                        alt = "twitter avi"
                        sx={{ width: 70, height: 70}}
                      />
                        {tweet.university_name} 
                        {tweet.tweeter_handle}
                        {tweet.time_posted} 
                      </Stack>
                    <p>
                      {tweet.tweet_content} 
                    </p>
              
                  </div>
                )}
          </div>
            
        </div>

        <div className="h_footer">
          <Footer />
        </div>
      

    </div>
    
  );
}

export default Home;