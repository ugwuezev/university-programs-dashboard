import React, { useState, useEffect } from 'react';
import './universities.css';
import { Navbar, MyButton, Footer, SearchFunction, UniversityTable, SearchInput } from '../../components';

const Universities = () => {

  useEffect(() => {
    document.title = "Manage Universities";
  }, []);

  const [data, setData] = useState([]);
  //console.log(data);

  const UpdateData = (item) => {
    setData(item)
  }

  return (
    <div className="u_grid">

      <div className="u_navbar gradient__bg">
        <Navbar />
      </div>
      
      <div  className="u_header">
        <h1>Manage Universities</h1>
      </div>

      <div className="u_search">
        <div className="u_search_filter">
          <SearchFunction setData={UpdateData} path="/universities" placeholder="Search Universities"/>
        </div>
        <div className="u_search_addnew">
          <div>
            <SearchInput placeholder="New University" />
          </div>
          <div>
            <MyButton path="/universities" name="Add" />
          </div>
        </div>
      </div>

      <div className="u_content">
        <UniversityTable data={data} />
      </div>
      
      <div className="u_footer">
      <Footer />
      </div>
     
  </div>
  )
}

export default Universities;
