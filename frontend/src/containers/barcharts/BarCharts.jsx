import React, { useEffect } from 'react';
import './barcharts.css';
import { Navbar, Footer} from '../../components';

const BarCharts = () => {

  useEffect(() => {
    document.title = "Bar Charts";
  }, []);

  return (
    <div className="b_grid">

      <div className="b_navbar gradient__bg">
        <Navbar />
      </div>

      <div  className="b_header">
        <h1>Bar Charts Showing Keywords</h1>
      </div>
      
      <div className="b_filter">
        <h2>Time Filter</h2>
      </div>

      <div className="b_content">
        <div>
          <h2>Number of keywords per university</h2>
        </div>
        <div>
          <h2>Number of hits per keyword</h2>
        </div>
        
      </div>

      <div className="b_footer">
        <Footer />
      </div>
        
    </div>
  )
}

export default BarCharts;
