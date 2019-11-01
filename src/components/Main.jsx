import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom';

import Header from './Header';
import Sidebar from './Sidebar';
import Routes from './Routes';

export default function Main() {
  return (
    <Container>
      <Router>
        <Header />
        <Row>
          <Col>
            <Sidebar />
          </Col>
          <Col>
            <Routes />
          </Col>
        </Row>
      </Router>
    </Container>
  );
}
