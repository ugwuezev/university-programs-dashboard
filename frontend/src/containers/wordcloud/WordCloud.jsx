import React from 'react';
import './wordcloud.css';
import { Navbar, Footer, MyButton, SearchInput } from '../../components';

const WordCloud = () => {
  return (
    <div className="WordCloud">

      <div className="gradient__bg">
        <Navbar />
      </div>

      <div className="header">
        <h1>Word Cloud for Keywords</h1>
      </div>

      <div>
        <SearchInput className="search" placeholder="Search Keyword & University" />
        <MyButton className="input" path="/wordcloud" name="Clear Filter" />
      </div>

      <Footer />
  </div>
  )
}

export default WordCloud;
