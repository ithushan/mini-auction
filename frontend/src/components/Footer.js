import React from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';


export default function Footer(){
    return (
      <AppBar  position="relative" color="transparent" sx={{ top: 'auto', bottom: 0 }}>
        <Container maxWidth="md">
          <Toolbar>
            <Typography variant="body1" color="inherit">
              © 2024 Bid & Giddy
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    );
  };

