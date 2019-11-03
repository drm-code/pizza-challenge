import React from 'react';
import { Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <Nav className="flex-column" id="Sidebar">
      <NavLink
        to="/dashboard"
        className="nav-link text-white"
        role="button"
      >
        <FontAwesomeIcon icon="th-large" />{' Dashboard'}
      </NavLink>
      <NavLink
        to="/new-order"
        className="nav-link text-white"
        role="button"
      >
        <FontAwesomeIcon icon={['far', 'window-maximize']} />{' New Order'}
      </NavLink>
      <NavLink
        to="/status"
        className="nav-link text-white"
        role="button"
      >
        <FontAwesomeIcon icon="cube" />{' Status'}
      </NavLink>
    </Nav>
  );
}
