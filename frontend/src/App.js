import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Signin, Login, Home, HeatMap, WordCloud, BarCharts, Keywords, Universities, Error, Test } from "./containers";
import './App.css';


const App = () => {
  
  return (
    <Router>
      <div className="App">
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/heatmap" element={<HeatMap />} />
            <Route path="/wordcloud" element={<WordCloud />} />
            <Route path="/barcharts" element={<BarCharts />} />
            <Route path="/keywords" element={<Keywords />} />
            <Route path="/universities" element={<Universities />} />
            <Route path="/test" element={<Test />} />
            <Route path="*" element={<Error />} />
           

            {/* To Do: conditional statements for displaying signin without Navbar */}
            <Route path="/signin" element={<Signin/>} />
            <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
