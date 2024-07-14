// src/components/Layout.js

import React from 'react';
import { AppBar, Box, Container } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';
import Appbar from './Appbar';


const Layout = ({ children }) => {
  return (
    <>
      <Container>
        <Box mb={2}>
          {/* <Navbar /> */}
          <Appbar/>
        </Box>
        <Box mb={3} mt={1}>
        {children}
        </Box>
        <Box mt={2}>
        <Footer />
      </Box>
      </Container>
    </>
  );
};

export default Layout;
