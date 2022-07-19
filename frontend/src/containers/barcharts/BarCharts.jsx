import React from 'react';
import './barcharts.css';
import { Navbar, Footer} from '../../components';

const BarCharts = () => {
  return (
    <div className="BarCharts">
      <div className="gradient__bg">
        <Navbar />
      </div>
      <div  className="header">
        <h1>Bar Charts Showing Keywords</h1>
      </div>
      
        <Footer />

    </div>
  )
}

export default BarCharts;
