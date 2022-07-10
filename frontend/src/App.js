import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Signin, Home, TwitterFeed, HeatMap, WordCloud, BarCharts, Keywords, Universities, Error, Test, AccountMenu } from "./containers";
import { Footer } from './components';
import './App.css';


const App = () => {
  useEffect(() => {
    document.title = "University Programs Dashboard";
  }, []);
  
  return (
    <Router>
      <div className="App">

        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/twitterfeed" element={<TwitterFeed />} />
            <Route path="/heatmap" element={<HeatMap />} />
            <Route path="/wordcloud" element={<WordCloud />} />
            <Route path="/barcharts" element={<BarCharts />} />
            <Route path="/keywords" element={<Keywords />} />
            <Route path="/universities" element={<Universities />} />
            <Route path="/test" element={<Test />} />
            <Route path="accountmenu" element={<AccountMenu />} />
            <Route path="*" element={<Error />} />
           

            {/* To Do: conditional statements for displaying signin without Navbar */}
            <Route path="/signin" element={<Signin/>} />
        </Routes>
      <Footer />
      </div>
    </Router>
  );
}

export default App;
