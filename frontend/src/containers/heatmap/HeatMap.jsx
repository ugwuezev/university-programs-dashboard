import React from 'react';
import './heatmap.css';
import { Navbar } from '../../components';
    
const HeatMap = () => {
  return (
    <div className="HeatMap">

      <div className="gradient__bg">
        <Navbar />
      </div>

      <div>
        <h2>This is the heatmap page.</h2>
      </div>
  </div>
  )
}

export default HeatMap;
