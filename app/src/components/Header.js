import React, {useEffect} from 'react';
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { Navbar, Container} from 'react-bootstrap';
import Toggle from './Toggle.js';
import { keepTheme } from '../utils/themes';

const Header = () => {
  useEffect(() => {
    keepTheme();
  })
  return (
    <div className="header">
      <Navbar>
        <Container>
        <Navbar.Brand href="/">Audio Cleaning</Navbar.Brand>
        <NavLink activeClassName="active" to="/upload">
          Upload
        </NavLink>
        <NavLink activeClassName="active" to="/list">
          Files List
        </NavLink>
		<NavLink activeClassName="active" to="/devtools">
          Dev
        </NavLink>
        <Navbar.Collapse className='justify-content-end'>
        <Toggle/>
        </Navbar.Collapse>
        </Container>

      </Navbar>
    </div>
  );
};

export default Header;