import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import logo from './../assets/logopizza.png';

export default function Header() {
  return (
    <Navbar expand="md">
      <Navbar.Brand>
        <Link to="/dashboard">
          <img
            src={logo}
            alt="Logo"
            className="pa-logo"
          />
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className="ml-auto">
          <Nav.Link className="text-white">
            <FontAwesomeIcon icon={['far', 'comment-alt']} />
          </Nav.Link>
          <Nav.Link className="text-white">
            <FontAwesomeIcon icon={['far', 'bell']} />
          </Nav.Link>
          <Nav.Link className="text-white">
            <FontAwesomeIcon icon={['far', 'question-circle']} />{' Help'}
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}