import React, { useState, useEffect } from 'react';
import './universities.css';
import { Navbar, Footer, UniversityTable } from '../../components';

const Universities = () => {

  useEffect(() => {
    document.title = "Manage Universities";
  }, []);

  const [data, setData] = useState([]);

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
      
      <div className="u_content">
          <UniversityTable setData={UpdateData} data={data} />
      </div>
      
      
      <div className="u_footer">
      <Footer />
      </div>
     
  </div>
  )
}

export default Universities;
