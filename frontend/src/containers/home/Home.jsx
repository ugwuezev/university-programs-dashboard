import React, { useEffect } from 'react';
import './home.css';
import { Navbar, Footer, MyButton, SearchInput } from '../../components';

const Home = () => {
  
  useEffect(() => {
    document.title = "Tweets";
  }, []);
 
  const filters = {
    University: ["University College London", "Imperial", "Durham Universiy", "University of Glasgow"],
    Keyword: ["Artificial intelligence", "Quantum", "Lecture", "Watson", "Analysis"],
    Time: ["All Time", "Past  24 Hours", "Past Week", "Past Month", "Past Year"]
  };

  const tweets = {
    Image: ["ucl_image", "imperial_image", "durham_image", "glasgow_image", "leeds_image"],
    SchoolName: ["UCL", "Imperial", "Durham Universiy", "University of Glasgow", "Leeds University"],
    Username: ["@ucl", "@icl", "@durham", "@glasgow", "@leeds"],
    Time: ["30s", "2m", "5h", "1M", "18/06/2022"],
    Content: [
      "Hey1! This is me just testing things out",
      "Hey2! This is me just testing things out",
      "Hey3! This is me just testing things out",
      "Hey4! This is me just testing things out",
      "Hey5! This is me just testing things out"
      ]  
  };

  return (
    <div>
       
        <div className="gradient__bg">
          <Navbar />
        </div>

        <div className="h_header">
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

          <div className="grid_item">
            <div className="grid_item_tweet">
            {Object.keys((tweets)).map(category => 
              <div key={category}>
                {tweets[category].map(item => (
                  <div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            )}

            </div>
          </div>
            
        </div>
      <Footer />

    </div>
    
  );
}

export default Home;