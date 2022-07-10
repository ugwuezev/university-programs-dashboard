import React from 'react';
import './twitterfeed.css';
import { Navbar } from '../../components';

const TwitterFeed = () => {

  return (
    <div>
        <div className="gradient__bg">
          <Navbar />
        </div>
        <div>
          <h2>Twitter feed with tweets containing keywords</h2>
        </div>
    </div>
  
  );
}

export default TwitterFeed;
