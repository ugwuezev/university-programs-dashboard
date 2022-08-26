import React, { useEffect } from 'react';
import './test.css';
import { Navbar, Footer } from '../../components';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';

const Test2 = () => {
  useEffect(() => {
    document.title = "Matching Tweets";
  }, []);

  return (
    <Container
        fullWidth
    >
        <Box 
        className="gradient__bg"
        display="flex"
        flexDirection="row"
        justifyContent="center"
        margin
        >
            <Navbar />
        </Box>

        <Box p={1} m={1}>
           <h1> Matching Tweets</h1>
        </Box>

        <Footer />
    </Container>
    
    
  );
}

export default Test2;