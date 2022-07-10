import React from 'react';
import './error.css';
import { Navbar } from '../../components';
    

const Error = () => {
  return (
    <div>
      <div className="gradient__bg">
        <Navbar />
      </div>
      <div className="ibm__error">
        <h2>Error 404! This page is not found.</h2>
      </div>
    </div>
    
  )
}

export default Error