import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import './navbar.css';
import * as CONSTANTS from './Constants.js'

const Navbar = () => {

  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);

  const open1 = Boolean(anchorEl1);
  const open2 = Boolean(anchorEl2);

  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose1 = () => {
    setAnchorEl1(null);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const [toggleMenu, setToggleMenu] = React.useState(false);


  const theme = createTheme({
    palette: {
      primary:  {
        main: CONSTANTS.white,
      },
      background: {
        default: CONSTANTS.grey
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
        <div className="ibm__navbar">
            <div className="ibm__navbar-links">
                <div className="ibm__navbar-links_logo">
                    <img src={logo} alt="logo" />
                </div>
                <div className="ibm__navbar-links_container">

                    <Button>
                        <Link to={'/'}>
                            Home
                        </Link>
                    </Button>

                    <Button
                        id="statistics"
                        onClick={handleClick1}
                    >
                        Statistics
                        <KeyboardArrowDownIcon />
                    
                    </Button>
                    <Menu
                        id="statistics"
                        anchorEl={anchorEl1}
                        open={open1}
                        onClose={handleClose1}
                    >
                        <Link to={'/wordcloud'}>
                            <MenuItem onClick={handleClose1} disableRipple>
                                Word Cloud
                            </MenuItem>
                        </Link>
                        
                        <Divider sx={{ my: 0.5 }} />
                        <Link to={'/heatmap'}>
                            <MenuItem onClick={handleClose1} disableRipple>
                                Heat Map
                            </MenuItem>
                        </Link>
                        <Divider sx={{ my: 0.5 }} />
                        <Link to={'/barcharts'}>
                            <MenuItem onClick={handleClose1} disableRipple>
                                Bar Charts
                            </MenuItem>
                        </Link>
                    </Menu>

                    <Button
                        id="management"
                        onClick={handleClick2}
                    >
                        Management
                        <KeyboardArrowDownIcon />
                        
                    </Button>
                    
                    <Menu
                        id="management"
                        anchorEl={anchorEl2}
                        open={open2}
                        onClose={handleClose2}
                    >
                        <Link to={'/keywords'}>
                            <MenuItem onClick={handleClose2} disableRipple>
                                Keywords
                            </MenuItem>
                        </Link>
                        
                        <Divider sx={{ my: 0.5 }} />
                        <Link to={'/universities'}>
                            <MenuItem onClick={handleClose2} disableRipple>
                                Universities
                            </MenuItem>
                        </Link>
                        
                    </Menu>

                </div>

                <div className="ibm__navbar-sign">
                    <Link to={'/signin'}>
                    <button type="button">Logout</button>
                    </Link>
                </div>
                
            </div>

            <div className="ibm__navbar-menu">
                {toggleMenu
                ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
                : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}

                {toggleMenu && (
                    <div className="ibm__navbar-menu_container scale-up-center">
                        <div className="ibm__navbar-menu_container-links">
                            
                            <p><a href="/">Home</a></p>

                            <p
                                id="statistics"
                                onClick={handleClick1}
                            >
                                Statistics
                                <KeyboardArrowDownIcon />
                            </p>
                            <Menu
                                id="statistics"
                                anchorEl={anchorEl1}
                                open={open1}
                                onClose={handleClose1}
                            >
                                <Link to={'/wordcloud'}>
                                    <MenuItem onClick={handleClose1} disableRipple>
                                        Word Cloud
                                    </MenuItem>
                                </Link>
                                
                                <Divider sx={{ my: 0.5 }} />
                                <Link to={'/heatmap'}>
                                    <MenuItem onClick={handleClose1} disableRipple>
                                        Heat Map
                                    </MenuItem>
                                </Link>
                                
                                <Divider sx={{ my: 0.5 }} />
                                <Link to={'/barcharts'}>
                                    <MenuItem onClick={handleClose1} disableRipple>
                                        Bar Charts
                                    </MenuItem>
                                </Link>
                                
                            </Menu>

                            <p
                                id="management"
                                onClick={handleClick2}
                            >
                                Management
                                <KeyboardArrowDownIcon />
                            </p>
                            <Menu
                                id="management"
                                anchorEl={anchorEl2}
                                open={open2}
                                onClose={handleClose2}
                            >
                                <Link to={'/keywords'}>
                                    <MenuItem onClick={handleClose2} disableRipple>
                                        Keywords
                                    </MenuItem>
                                </Link>
                                
                                <Divider sx={{ my: 0.5 }} />
                                <Link to={'/universities'}>
                                    <MenuItem onClick={handleClose2} disableRipple>
                                        Universities
                                    </MenuItem>
                                </Link>
                                
                            </Menu>

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
  
    </ThemeProvider>
  );

}

export default Navbar;
