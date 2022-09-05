import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Signin, Register, Home, HeatMap, WordCloud, BarCharts, Keywords, Universities, Error, Test2 } from "./containers";
import './App.css';
//import dotenv from 'dotenv';

const App = () => {

  //dotenv.config();
  
  return (
    <>
    <Router>
      <div className="App">
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/heatmap" element={<HeatMap />} />
            <Route path="/wordcloud" element={<WordCloud />} />
            <Route path="/barcharts" element={<BarCharts />} />
            <Route path="/keywords" element={<Keywords />} />
            <Route path="/universities" element={<Universities />} />
            <Route path="/test" element={<Test2 />} />
            <Route path="*" element={<Error />} />
           

            {/* To Do: conditional statements for displaying signin without Navbar */}
            <Route path="/signin" element={<Signin/>} />
            <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
    <ToastContainer />
    </>
  );
}

export default App;
