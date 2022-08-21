import React, { useEffect } from 'react';
import './wordcloud.css';
import { Navbar, Footer, BigButton, SearchInput } from '../../components';

const filters = {
  University: ["University College London", "Imperial", "Durham Universiy", "University of Glasgow", "Durham University"],
  Time: ["All Time", "Past  24 Hours", "Past Week", "Past Month", "Past Year"]
};

const WordCloud = () => {

  useEffect(() => {
    document.title = "Word Cloud";
  }, []);

  return (
    <div className="w-grid">

      <div className="w_navbar gradient__bg">
        <Navbar />
      </div>

      <div className="w_header">
        <h1>Word Cloud for Keywords</h1>
      </div>

      <div className="w_search">
        <SearchInput className="w_search" placeholder="Search Keyword by University" />
        <BigButton className="w_input" path="/wordcloud" name="Clear Filter" />
      </div>

      <div className="w_filter">
        {Object.keys((filters)).map(category => 
          <div key={category}>
            <h2>{category}</h2>
            {filters[category].map(item => (
              <div>
                <input value={item} type="checkbox" />
                <span>{item}</span>
              </div>
            ))}
          </div>
            )}
      </div>

      <div className="w_content">
        <h2>This section displays the keywords in a word cloud format</h2>
      </div>

      <div className="w_footer">
        <Footer />
      </div>

      
  </div>
  )
}

export default WordCloud;
