import React, { useEffect } from 'react';
import './home.css';
//import { Container } from "@mui/material";
import { Navbar } from '../../components';

const Home = () => {
  useEffect(() => {
    document.title = "University Programs Dashboard";
  }, []);

  return (
    <div className="Home">
       <div className="gradient__bg">
          <Navbar />
        </div>

        <div>
          <h1>Homepage</h1>
        </div>

    </div>
    
  );
}

export default Home;