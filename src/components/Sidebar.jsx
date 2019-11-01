import React from 'react';
import { Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <Nav className="flex-column">
      <Link
        to="/dashboard"
        className="nav-link"
        role="button"
      >
        <FontAwesomeIcon icon="th-large" />{' Dashboard'}
      </Link>
      <Link
        to="/new-order"
        className="nav-link"
        role="button"
      >
        <FontAwesomeIcon icon={['far', 'window-maximize']} />{' New Order'}
      </Link>
      <Link
        to="/status"
        className="nav-link"
        role="button"
      >
        <FontAwesomeIcon icon="cube" />{' Status'}
      </Link>
    </Nav>
  );
}
