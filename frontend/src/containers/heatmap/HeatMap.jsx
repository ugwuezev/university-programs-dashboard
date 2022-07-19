import React from 'react';
import './heatmap.css';
import { Navbar, Footer} from '../../components';
    
const HeatMap = () => {
  return (
    <div className="HeatMap">

      <div className="gradient__bg">
        <Navbar />
      </div>

      <div  className="header">
        <h1>Heatmap of IBM Universities in the UK</h1>
      </div>

      <Footer />
  </div>
  )
}

export default HeatMap;
