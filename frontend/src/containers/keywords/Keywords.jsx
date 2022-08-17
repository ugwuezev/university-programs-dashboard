import React, { useState, useEffect } from 'react';
import './keywords.css';
import { Navbar, MyButton, Footer, SearchFunction, KeywordTable, SearchInput } from '../../components';

const Keywords = () => {

  useEffect(() => {
    document.title = "Manage Keywords";
  }, []);

  const [data, setData] = useState([]);

  const UpdateData = (item) => {
    setData(item)
  }

  return (
    <div className="k_grid">

      <div className="k_navbar gradient__bg">
        <Navbar />
      </div>

      <div  className="k_header">
        <h1>Manage Keywords</h1>
      </div>
      
      <div className="k_search">
        
          <SearchFunction setData={UpdateData} path="/keywords" placeholder="Search Keywords" />
      
      
          <SearchInput placeholder="New Keyword" />
        
        
          <MyButton className="input" path="/keywords" name="Add" />
        
      </div>
      
      <div className="k_content">
        <KeywordTable data={data} title="KEYWORD" />
      </div>
      
      <div className="k_footer">
        <Footer />
      </div>
  </div>
  )
}

export default Keywords;
