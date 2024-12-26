import React, { useContext } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Outlet } from 'react-router-dom';
import { ThemeContext } from './ThemeContext';

const MyNavbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <>
    <Navbar bg={theme === 'light' ? 'light' : 'dark'} expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">BrandName</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/categories">Categories</Nav.Link>
            <Nav.Link as={Link} to="/products">Products</Nav.Link>
          </Nav>
          <button onClick={toggleTheme}> Switch to {theme === 'light' ? 'dark' : 'light'} mode </button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Outlet />
    </>
  );
};

export default MyNavbar;
