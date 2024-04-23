import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import circularav from './img/circuaravt.jpg';
import './Navbar.css';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Navb({ toggleDarkMode, isDark }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout actions here, e.g., clear username and redirect
    navigate('/');
  };

  return (
    <>
      <Navbar className="nav">
        <Container>
          <Navbar.Brand>
            {/* <img src={circularav} alt="Logo" className="logo" /> */}
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Button onClick={handleLogout}>
              <h6>
                logout
              </h6>
            </Button>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Navb;
