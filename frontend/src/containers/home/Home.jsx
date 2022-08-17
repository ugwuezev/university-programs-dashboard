import React, { useState, useEffect } from 'react';
import './home.css';
import { Navbar, Footer, MyButton, SearchInput } from '../../components';
import { Avatar } from '@mui/material';

const Home = () => {
  const [tweets, setTweets] = useState([])

  const apiUrl = "http://localhost:5000/tweets";
  const fetchTweets = async () => {
    const response = await fetch(apiUrl)
    const data = await response.json()
    setTweets(data)
  }
 
  useEffect(() => {
    document.title = "Twitter Feed";
    fetchTweets()
  }, [] );

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
                <SearchInput  placeholder="Search by Keyword/University" />
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
            
            {tweets.map(tweet =>
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