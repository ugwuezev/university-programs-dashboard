import React from 'react';
import './wordcloud.css';
import { Navbar } from '../../components';

const WordCloud = () => {
  return (
    <div className="WordCloud">

      <div className="gradient__bg">
        <Navbar />
      </div>

      <div>
        <h2>Word cloud for keywords.</h2>
      </div>
  </div>
    
  )
}

export default WordCloud;
