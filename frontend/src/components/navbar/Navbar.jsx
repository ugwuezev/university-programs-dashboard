import React, { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import logo from '../../assets/logo.png';
import './navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className="ibm__navbar">
      <div className="ibm__navbar-links">
        <div className="ibm__navbar-links_logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="ibm__navbar-links_container">
            <p><a href="/">Home</a></p>
            <p><a href="/wordcloud">Word Cloud</a></p>
            <p><a href="/heatmap">Heat Map</a></p>
            <p><a href="/barcharts">Bar Charts</a></p>
            <p><a href="/keywords">Keywords</a></p>
            <p><a href="/universities">Universities</a></p>
        </div>
      </div>
      <div className="ibm__navbar-sign">
        <Link to={'/signin'}>
          <button type="button">Logout</button>
        </Link>
      </div>
      <div className="ibm__navbar-menu">
        {toggleMenu
          ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
        <div className="ibm__navbar-menu_container scale-up-center">
          <div className="ibm__navbar-menu_container-links">
            <p><a href="/">Home</a></p>
            <p><a href="/wordcloud">Word Cloud</a></p>
            <p><a href="/heatmap">Heat Map</a></p>
            <p><a href="/barcharts">Bar Charts</a></p>
            <p><a href="/keywords">Keywords</a></p>
            <p><a href="/universities">Universities</a></p>
          </div>
          <div className="ibm__navbar-menu_container-links-sign">
            <Link to={'/signin'}>
              <button type="button">Logout</button>
            </Link>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;