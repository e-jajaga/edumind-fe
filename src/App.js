import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import MyNavbar from './Components/MyNavBar';
import Products from './Components/Products';
import Categories from './Components/Categories';
import { ThemeProvider } from './Components/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <MyNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

const Home = () => (
  <div>
    <h1>Welcome to the Home Page</h1>
  </div>
);

export default App;
