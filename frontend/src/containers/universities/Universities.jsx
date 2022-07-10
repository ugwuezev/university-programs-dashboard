import React from 'react';
import './universities.css';
import { Navbar } from '../../components';

const Universities = () => {
return (
  <div className="Universities">

    <div className="gradient__bg">
      <Navbar />
    </div>

    <div>
      <h2>List of Universities.</h2>
    </div>
  </div>
      
  );
}

export default Universities;
