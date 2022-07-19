import React, { useEffect } from 'react';
import './home.css';
import { Navbar, Footer, MyButton, SearchInput } from '../../components';

const Home = () => {
  useEffect(() => {
    document.title = "Tweets";
  }, []);

  return (
    <div>
       
        <div className="gradient__bg">
          <Navbar />
        </div>

        <div className="header">
          <h1>Matching Tweets</h1>
        </div>
        
        <div class="search_bar">
            <div class="search_bar_item">
              <SearchInput  placeholder="Search Keyword & University" />
            </div>
            <div class="search_bar_item">
              <MyButton path="/" name="Clear Filter" />
            </div>
            <div class="search_bar_item">
              <MyButton path="/" name="Sort" />
            </div>
        </div>
      
        <div className="grid">
            <div className="grid_item">
                <div className="grid_item_filter">
                    First Column 1
                </div>
                <div className="grid_item_filter">
                    First Column 2
                </div>
                <div className="grid_item_filter">
                    First Column 3
                </div>
              
            </div>
            <div className="grid_item">
            <div className="grid_item_tweet">
                    <div className="grid_item_tweet_image">
                      Image
                    </div>
                    <div className="grid_item_tweet_content">
                      <div className="grid_item_tweet_header">
                      <span>Name</span>
                      <span>Username</span>
                      <span>Time</span>
                      </div>
                      <div className="grid_item_tweet_body">
                        Tweet Content
                      </div>
                    </div>
                </div>
                <div className="grid_item_tweet">
                    <div className="grid_item_tweet_image">
                      Image
                    </div>
                    <div className="grid_item_tweet_content">
                      <div className="grid_item_tweet_header">
                      <span>Name</span>
                      <span>Username</span>
                      <span>Time</span>
                      </div>
                      <div className="grid_item_tweet_body">
                        Tweet Content
                      </div>
                    </div>
                </div>
                <div className="grid_item_tweet">
                    <div className="grid_item_tweet_image">
                      Image
                    </div>
                    <div className="grid_item_tweet_content">
                      <div className="grid_item_tweet_header">
                      <span>Name</span>
                      <span>Username</span>
                      <span>Time</span>
                      </div>
                      <div className="grid_item_tweet_body">
                        Tweet Content
                      </div>
                    </div>
                </div>
            </div>
           
        </div>
      <Footer />

    </div>
    
  );
}

export default Home;