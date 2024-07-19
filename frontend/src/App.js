import React from 'react';
import { CssBaseline, createTheme, ThemeProvider } from '@mui/material';
import Home from './pages/Home';
import About from './pages/About';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProductBidPage from './pages/ProductBidPage';
import Products from './pages/Products';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import Logout from './pages/Logout';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/account" element={<SignIn />} />
            <Route path="/account/signup" element={<SignUp />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/products" element={<Products/>} />
            <Route path="/products/:id" element={<ProductBidPage />} />
            <Route path="/dashboard" element={<Dashboard/>} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>

  );
}

export default App;
