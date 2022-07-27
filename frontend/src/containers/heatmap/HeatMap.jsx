import React, { useEffect } from 'react';
import './heatmap.css';
import { Navbar, Footer} from '../../components';
    
const HeatMap = () => {

  useEffect(() => {
    document.title = "Heat Map";
  }, []);

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
